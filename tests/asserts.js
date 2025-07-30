
/**
 * @typedef assertResult
 * @property {boolean} success
 * @property {string|undefined} message
 */

/**
 * @typedef shouldResult
 * @property {boolean} success
 * @property {string|undefined} message
 * @property {number} assertOkCount
 * @property {number} assertTotalCount
 */

/**
 * @returns {assertResult}
 */
function success() {
    return { success: true };
}

/**
 * @returns {assertResult}
 */
function failure(message) {
    return { success: false, message };
}

/**
 * @param {assertResult[]} results 
 * @returns {shouldResult}
 */
function reduceResults(results) {
    const failures = results.filter(x => !x.success);
    return {
        success: failures.length === 0,
        message: failures.length > 0 ? failures.map(x => x.message).join('<br>') : undefined,
        assertOkCount: results.length - failures.length,
        assertTotalCount: results.length
    };
}

/**
 * @typedef assertContext
 * @property {Function} equal - THIS CAN BE IMPROVED
 */

/**
 * @callback shouldCallback
 * @param {assertContext} context
 */

/**
 * 
 * @param {shouldCallback} callback 
 * @returns {shouldResult}
 */
export function should(callback) {
    const results = [];

    results.performAssert = function(isSuccess, failureMessage) {
        if (isSuccess) {
            this.push(success());
        } else {
            this.push(failure(failureMessage));
        }
    };

    callback({
        equal: (actual, expected, message) => results.performAssert(
            actual === expected,
            `${message} (expected ${expected}, got ${actual})`),

        isDate: (value, message) => results.performAssert(
            value instanceof Date && !isNaN(value),
            `${message} ([${value}] is not a Date)`),
            
        isTruthy: (value, message) => results.performAssert(
            value,
            `${message} ([${value}] is not truthy)`),
    });
    return reduceResults(results);
}

export function test(testFunction) {
    window.stuff ||= {};
    window.stuff.tests ||= [];
    window.stuff.tests.push(testFunction);
}