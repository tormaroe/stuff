import { createTodoItemFromText } from "../lib/createTodoItem.js";
import { comparePriority } from "../lib/todoItemHelpers.js";
import { test, should } from "./asserts.js";

test(function should_sort_todo_items_by_priority() {
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
});

test(function should_create_todo_item_from_text() {
    const item = createTodoItemFromText(' hello, world ');
    return should(assert => {
        assert.equal(item.bucket, 'today', 'Default bucket');
        assert.equal(item.text, 'hello, world', 'Text is trimmed');
        assert.equal(item.priority, 2, 'Default priority');
        assert.equal(item.done, false, 'New item is not done');
        assert.isDate(item.created, 'Created date');
        assert.isTruthy(item.key, 'Item key');
    });
});

test(function should_create_todo_item_with_HIGH_importance() {
    const item = createTodoItemFromText('h: hello, world');
    return should(assert => {
        assert.equal(item.bucket, 'today', 'Default bucket');
        assert.equal(item.text, 'hello, world', 'Text');
        assert.equal(item.priority, 1, 'High priority');
    });
});

test(function should_create_todo_item_with_LOW_importance() {
    const item = createTodoItemFromText(' l : hello, world');
    return should(assert => {
        assert.equal(item.bucket, 'today', 'Default bucket');
        assert.equal(item.text, 'hello, world', 'Text');
        assert.equal(item.priority, 3, 'Low priority');
    });
});

test(function should_create_todo_item_for_next_week() {
    const item = createTodoItemFromText(' n : hello, world');
    return should(assert => {
        assert.equal(item.bucket, 'nextweek', 'Bucket');
        assert.equal(item.text, 'hello, world', 'Text');
    });
});

test(function should_create_todo_item_for_someday() {
    const item = createTodoItemFromText('sl : hello, world');
    return should(assert => {
        assert.equal(item.bucket, 'someday', 'Bucket');
        assert.equal(item.text, 'hello, world', 'Text');
        assert.equal(item.priority, 3, 'Low priority');
    });
});
