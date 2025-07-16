
// uuisv4 borrowed from https://stackoverflow.com/a/2117523/22621
function uuidv4() {
  return "10000000-1000-4000-8000-100000000000".replace(/[018]/g, c =>
    (+c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> +c / 4).toString(16)
  );
}

function parseTextInput(text) {
    return {
        bucket: 'today',
        text: text
    };
}

export function createTodoItemFromText(text) {
    const parseResult = parseTextInput(text);
    return {
        key: uuidv4(),
        created: new Date(),
        ...parseResult
    };
}
