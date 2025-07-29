
function canary_test() {
    return {
        success: true
    };
}

const allTests = [
    canary_test,
    canary_test
];

function runTest(testIndex, tableElm) {
    if (testIndex < allTests.length) {
        const test = allTests[testIndex];
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

        window.setTimeout(runTest, 0, testIndex + 1, tableElm);
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
                    <th>Details</th>
                </tr>
            </table>
        `;
        
        const tableElm = this.querySelector('table');

        allTests.forEach(t => {
            const row = tableElm.insertRow(-1);
            const nameCell = row.insertCell(0);
            const statusCell = row.insertCell(1);
            const detailsCell = row.insertCell(2);

            nameCell.innerHTML = t.name.replaceAll('_', ' ');
            statusCell.innerHTML = '..';
            detailsCell.innerHTML = '..';
        });

        tableElm.setResult = (index, result) => {
            console.log(index);
            console.dir(tableElm.rows);
            const row = tableElm.rows[index + 1]; // Add one for header
            console.log(row);
            row.cells[1].innerHTML = result.success 
                ? 'passed'
                : 'FAILED';
            
            if (result.message) {
                row.cells[2].innerHTML = result.message;
            }
        };

        setTimeout(runTest, 0, 0, tableElm);
    }

}

customElements.define('x-test-table', TestTable);