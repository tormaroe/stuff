export class TodoInputComponent extends HTMLElement {
    connectedCallback() {
        if (!this.querySelector('input')) {
            this.innerHTML = `
            <input 
                type=text
                id=todoInput 
                value="" />
            `;

            const input = this.querySelector('input');
            
            input.onkeydown = (e) => {
                if (e.key === 'Enter' && input.value.trim()) {
                    this.dispatchEvent(new CustomEvent('add', {
                        detail: {
                            value: input.value.trim()
                        }
                    }));
                    input.value = '';
                }
            };
        }
    }
}

export const registerTodoInputComponent = () => customElements.define('x-todo-input', TodoInputComponent);
