import { createTodoItemFromText } from "../lib/createTodoItem.js";

class App extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `

        <x-banner></x-banner>

        <x-todo-input></x-todo-input>
        `;

        const todoInput = this.querySelector('x-todo-input');

        todoInput.addEventListener('add', async (e) => {
            await window.stuff.todoStore.putItem(createTodoItemFromText(e.detail.value));
        });
    }
}

export function registerApp() {
    customElements.define('x-app', App);
}