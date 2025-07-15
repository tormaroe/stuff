export class StuffBannerComponent extends HTMLElement {
    connectedCallback() {
        this.textContent = 'S.T.U.F.F.'
    }
}
export const registerBannerComponent = () => customElements.define('x-banner', StuffBannerComponent);
