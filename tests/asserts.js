
function success() {
    return { success: true };
}

function failure(message) {
    return { success: false, message };
}

function reduceResults(results) {
    const failures = results.filter(x => !x.success);
    return {
        success: failures.length === 0,
        message: failures.length > 0 ? failures.map(x => x.message).join('<br>') : undefined,
        assertOkCount: results.length - failures.length,
        assertTotalCount: results.length
    };
}

export function should(callback) {
    const results = [];
    const context = {
        equal: (actual, expected, message) => {
            if (actual === expected) {
                results.push(success());
            } else {
                results.push(failure(`${message} (expected ${expected}, got ${actual})`));
            }
        }
    };
    callback(context);
    return reduceResults(results);
}