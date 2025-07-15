export class StuffBannerComponent extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <div>
                S.T.U.F.F.
            </div>
        `;
    }
}

export const registerBannerComponent = () => customElements.define('x-banner', StuffBannerComponent);
