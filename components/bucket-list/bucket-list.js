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
            return `<li>${pri}${item.text}</li>`;
        }
    }
}

export const registerBucketListComponent = () => customElements.define('x-bucket-list', BucketListComponent);