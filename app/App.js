import { createTodoItemFromText } from "../lib/createTodoItem.js";

class App extends HTMLElement {
    connectedCallback() {
        const store = window.stuff.todoStore;

        this.innerHTML = `
            <x-banner></x-banner>
            <x-todo-input></x-todo-input>
            <x-bucket-list 
                name="bucket-today" 
                title="Today"></x-bucket-list>
            <x-bucket-list 
                name="bucket-tomorrow" 
                title="Tomorrow"></x-bucket-list>
            <x-bucket-list 
                name="bucket-nextweek" 
                title="Next week"></x-bucket-list>
            <x-bucket-list 
                name="bucket-someday" 
                title="Someday/Maybe"></x-bucket-list>
        `;

        const todoInput = this.querySelector('x-todo-input');
        const buckets = {
            today: this.querySelector('x-bucket-list[name="bucket-today"]'),
            tomorrow: this.querySelector('x-bucket-list[name="bucket-tomorrow"]'),
            nextweek: this.querySelector('x-bucket-list[name="bucket-nextweek"]'),
            someday: this.querySelector('x-bucket-list[name="bucket-someday"]'),
        };

        todoInput.addEventListener('add', async (e) => {
            const newItem = createTodoItemFromText(e.detail.value);
            await store.putItem(newItem);
            buckets[newItem.bucket].list = store.getBucket(newItem.bucket);
        });

        Object.keys(buckets).forEach(bucket =>{
            buckets[bucket].list = store.getBucket(bucket);
        });
    }
}

export function registerApp() {
    customElements.define('x-app', App);
}