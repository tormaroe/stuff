
function addItem(item) {
    console.log('add item ' + item);

    const openRequest = window.indexedDB.open("todostuff", 1);

    openRequest.onupgradeneeded = (event) => {
        const db = event.target.result;

        const todoStore = db.createObjectStore("item", { keyPath: 'key' });
    };

    openRequest.onerror = (event) => {
        console.error('Failed opening IndexedDB', event);
    }

    openRequest.onsuccess = (event) => {
        const db = event.target.result;
        const transaction = db.transaction(["item"], "readwrite");
        const objectStore = transaction.objectStore("item");
        const addRequest = objectStore.add(item);
        addRequest.onsuccess = (event) => {
            console.log('Item added');
        }
    };
}

export function useTodoStore(state) {
    state.todoStore = {
        addItem
    };
}