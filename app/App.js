class App extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `

        <x-banner></x-banner>

        `;
    }
}

export function registerApp() {
    customElements.define('x-app', App);
}