import { registerApp } from "./app/App.js";
import { registerBannerComponent } from "./components/banner/banner.js";

const app = () => {
    registerBannerComponent();
    registerApp();

    const template = document.querySelector('template#root');
    if (template) {
        document.body.appendChild(template.content, true);
    }
}

document.addEventListener('DOMContentLoaded', app);
