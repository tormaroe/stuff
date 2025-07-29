import { comparePriority } from "../lib/todoItemHelpers.js";
import { should } from "./asserts.js";

function todo_items_should_sort_by_priority() {
    const given_items = [
        { id: 1, priority: 1 },
        { id: 2, priority: 2 },
        { id: 3, priority: 3 },
        { id: 4, priority: 2 },
        { id: 5, priority: 1 },
    ];

    given_items.sort(comparePriority);

    return should(assert => {
        assert.equal(given_items[0].id, 1, "ID of 1st item");
        assert.equal(given_items[1].id, 5, "ID of 2nd item");
        assert.equal(given_items[2].id, 2, "ID of 3rd item");
        assert.equal(given_items[3].id, 4, "ID of 4th item");
        assert.equal(given_items[4].id, 3, "ID of 5th item");
    });    
}

export function addTodoItemTests(collection) {
    collection.push(todo_items_should_sort_by_priority);
}