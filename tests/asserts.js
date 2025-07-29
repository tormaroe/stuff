
function success() {
    return { success: true };
}

function failure(message) {
    return { success: false, message };
}

export const assert = {
    all: (...asserts) => {
        const failure = asserts.find(x => !x.success);
        return failure || success();
    },
    equal: (actual, expected, message) => {
        if (actual === expected) {
            return success();
        } else {
            return failure(`${message} (expected ${expected}, got ${actual})`);
        }
    }
};