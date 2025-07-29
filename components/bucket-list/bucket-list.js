export class BucketListComponent extends HTMLElement {
    #currentList = [];

    set list(newList) {
        this.#currentList = newList;
        this.update();
    }

    get title() {
        return this.getAttribute("title");
    }
    
    update() {
        this.innerHTML = `
            <div class="title">
                ${this.title}
            </div>
            <div class="body">
                ${this.renderItems()}
            </div>
        `;

        this.#currentList.forEach(item => {
            this.querySelector(`button[name="doneButton${item.key}"]`).onclick = async () => {
                item.done = true;
                await window.stuff.todoStore.putItem(item);

// TODO: Apply filter on done somewhere. Probably need more finegrained actions in store (to not make putItem too complicated)

                this.update();
            }
        });

    }

    renderItems() {
        if (this.#currentList.length > 0) {
            return `
                <ol>
                ${this.#currentList.map(renderItem).join('\n')}
                </ol>`;
        } else {
            return '<i>List empty</i> 👍'
        }

        function renderItem(item) {
            const pri = item.priority === 1 ? '‼️ ' : '';
            return `
                <li>${pri}${item.text}
                    <button name="doneButton${item.key}" class="button green" role="button">DONE</button>
                </li>`;
        }
    }
}

export const registerBucketListComponent = () => customElements.define('x-bucket-list', BucketListComponent);