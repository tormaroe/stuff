// uuisv4 borrowed from https://stackoverflow.com/a/2117523/22621
function uuidv4() {
  return "10000000-1000-4000-8000-100000000000".replace(/[018]/g, c =>
    (+c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> +c / 4).toString(16)
  );
}

class App extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `

        <x-banner></x-banner>

        <x-todo-input></x-todo-input>
        `;

        const todoInput = this.querySelector('x-todo-input');

        todoInput.addEventListener('add', (e) => {
            const newItem = {
                key: uuidv4(),
                text: e.detail.value,
                created: new Date()
            };
            window.stuff.todoStore.addItem(newItem);
        });
    }
}

export function registerApp() {
    customElements.define('x-app', App);
}