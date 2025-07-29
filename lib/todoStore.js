import { comparePriority } from "./todoItemHelpers.js";

const DB_NAME = 'todostuff';
const ITEM_STORE_NAME = 'item';

function setupDatabaseSchema(db) {
    const todoStore = db.createObjectStore(ITEM_STORE_NAME, { keyPath: 'key' });
    todoStore.createIndex('item-bucket', 'bucket');
}

function connect() {
    return new Promise((resolve, reject) => {
        const openRequest = window.indexedDB.open(DB_NAME, 1);
        openRequest.onupgradeneeded = (event) => setupDatabaseSchema(event.target.result);
        openRequest.onerror = () => reject(openRequest.error);
        openRequest.onsuccess = () => resolve(openRequest.result);
        openRequest.onblocked = () => console.warn('Open database pending until unblocked');
    });
}

export function useTodoStore(container) {
    const state = {
        buckets: {
            today: [],
            tomorrow: [],
            nextweek: [],
            someday: [],
        }
    };

    function init() {
        console.log('todoStore.init()');
        return new Promise(async (resolve, reject) => {
            const db = await connect();
            const tr = db.transaction([ITEM_STORE_NAME], 'readonly');
            const st = tr.objectStore(ITEM_STORE_NAME);
            const re = st.getAll();
            re.onerror = () => reject(re.error);
            re.onsuccess = () => {
                const bucketNames = Object.keys(state.buckets);
                bucketNames.forEach(bucket => {
                    state.buckets[bucket] = re.result.filter(x => x.bucket === bucket);
                    state.buckets[bucket].sort(comparePriority);
                })
                resolve();
            };
        });
    }

    function putItem(item) {
        console.log(`todoStore.putItem(${item.key})`);
        return new Promise(async (resolve, reject) => {
            const db = await connect();
            const tr = db.transaction([ITEM_STORE_NAME], 'readwrite');
            const st = tr.objectStore(ITEM_STORE_NAME);
            const re = st.put(item);
            re.onerror = () => reject(re.error);
            re.onsuccess = () => {
                const bucket = state.buckets[item.bucket];
                if (!bucket.some(x => x.key === item.key)) {
                    state.buckets[item.bucket].push(item);   
                    state.buckets[item.bucket].sort(comparePriority);
                }
                resolve(re.result);
            }
        });
    }

    container.todoStore = {
        init,
        putItem,
        getBucket: (name) => state.buckets[name]
    };

    return container.todoStore;
}