
// uuisv4 borrowed from https://stackoverflow.com/a/2117523/22621
function uuidv4() {
  return "10000000-1000-4000-8000-100000000000".replace(/[018]/g, c =>
    (+c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> +c / 4).toString(16)
  );
}

function parseTextInput(text) {

    const parserRegex = /^(([nshl\s]*)\s*:){0,1}\s*(.*)/;
    const [_1, _2, optionsString, textWithoutOptions] = parserRegex.exec(text);
    const options = optionsString?.split('').filter(c => c === 'n' || c === 's' || c === 'h' || c === 'l') ?? [];

    return {
        bucket: getBucket(),
        text: textWithoutOptions.trim(),
        priority: getPriority(),
        done: false
    };

    function getPriority() {
        return options.includes('h') 
            ? 1 // HIGH
            : (options.includes('l') 
                ? 3 // LOW
                : 2); // NORMAL
    }

    function getBucket() {
        if (options.includes('n')) {
            return 'nextweek';
        } else if (options.includes('s')) {
            return 'someday';
        } else {
            return 'today';
        }
    }
}

export function createTodoItemFromText(text) {
    const parseResult = parseTextInput(text);
    return {
        key: uuidv4(),
        created: new Date(),
        ...parseResult
    };
}
