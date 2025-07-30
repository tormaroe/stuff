
const DELAY_BETWEEN_TESTS = 100;

function runTest(testIndex, tableElm) {
    if (testIndex < window.stuff.tests.length) {
        const test = window.stuff.tests[testIndex];
        console.log(`running test ${testIndex}: ${test.name}`);

        try {
            const result = test();
            console.log(result);
            tableElm.setResult(testIndex, result);
        } catch (e) {
            console.log(`Error: ${e}`);
            tableElm.setResult(testIndex, {
                success: false,
                message: e
            });
        }

        window.setTimeout(runTest, DELAY_BETWEEN_TESTS, testIndex + 1, tableElm);
    } else {
        console.log('no more tests to run');
    }
}

class TestTable extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <table>
                <tr>
                    <th>Test name</th>
                    <th>Status</th>
                    <th>Asserts</th>
                    <th>Details</th>
                </tr>
            </table>
        `;
        
        const tableElm = this.querySelector('table');

        window.stuff.tests.forEach(t => {
            const row = tableElm.insertRow(-1);
            row.insertCell(0).innerHTML = t.name.replaceAll('_', ' ');
            row.insertCell(1).innerHTML = '..';
            row.insertCell(2).innerHTML = '&nbsp;';
            row.insertCell(3).innerHTML = '&nbsp;';
            row.cells[1].classList.add('status');
        });

        tableElm.setResult = (index, result) => {
            const row = tableElm.rows[index + 1]; // Add one for header
            row.cells[1].innerHTML = result.success 
                ? '<span class="success">🗹</span>' 
                : '<span class="failure">☒</span>';
            
            row.cells[2].innerHTML = `${result.assertOkCount} / ${result.assertTotalCount}`;
            
            if (result.message) {
                row.cells[3].innerHTML = result.message;
            }
        };

        setTimeout(runTest, DELAY_BETWEEN_TESTS, 0, tableElm);
    }

}

customElements.define('x-test-table', TestTable);