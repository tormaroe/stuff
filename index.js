import { registerApp } from "./app/App.js";
import { registerBannerComponent } from "./components/banner/banner.js";
import { registerTodoInputComponent } from "./components/todo-input/todo-input.js";
import { registerBucketListComponent } from "./components/bucket-list/bucket-list.js";
import { useTodoStore } from "./lib/todoStore.js";

const app = async () => {

    window.stuff ||= {}; 
    const store = useTodoStore(window.stuff);
    await store.init();

    // Debugging state
    console.dir(window.stuff);

    registerBannerComponent();
    registerTodoInputComponent();
    registerBucketListComponent();
    
    registerApp();

    const template = document.querySelector('template#root');
    if (template) {
        document.body.appendChild(template.content, true);
    }
}

document.addEventListener('DOMContentLoaded', app);
