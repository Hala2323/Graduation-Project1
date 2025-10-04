
const toolbox = {
    kind: 'categoryToolbox',
    contents: [
        {
            kind: 'category', name: 'Logic', categorystyle: 'logic_category',
            contents: [
                {kind: 'block', type: 'controls_if'},
                {kind: 'block', type: 'logic_compare'},
                {kind: 'block', type: 'logic_operation'},
                {kind: 'block', type: 'logic_negate'},
                {kind: 'block', type: 'logic_boolean'},
            ],
        },
        {
            kind: 'category', name: 'Loops', categorystyle: 'loop_category',
            contents: [
                {kind: 'block', type: 'controls_repeat_ext',
                    inputs: {TIMES: {block: {type: 'math_number', fields: {NUM: 5}}}}},
                {kind: 'block', type: 'controls_whileUntil'},
            ],
        },
        {
            kind: 'category', name: 'Math', categorystyle: 'math_category',
            contents: [
                {kind: 'block', type: 'math_number'},
                {kind: 'block', type: 'math_arithmetic'},
            ],
        },
        {
            kind: 'category', name: 'Text', categorystyle: 'text_category',
            contents: [
                {kind: 'block', type: 'text'},
                {kind: 'block', type: 'text_print'},
            ],
        },
        {kind: 'category', name: 'Variables', custom: 'VARIABLE'},
        {kind: 'category', name: 'Functions', custom: 'PROCEDURE'},
    ],
};


const workspace = Blockly.inject('blocklyDiv', {
    toolbox,
    renderer: 'geras',
    trashcan: true,
    zoom: {controls: true, wheel: true},
});
workspace.createVariable('item');


Blockly.common.defineBlocksWithJsonArray([
    {
        type: 'list_range',
        message0: 'range %1 to %2',
        args0: [
            {type: 'field_number', name: 'FIRST', value: 1, min: 0, precision: 1},
            {type: 'field_number', name: 'LAST',  value: 3, min: 0, precision: 1},
        ],
        output: 'Array',
        style: 'list_blocks',
        tooltip: 'Array of integers inclusive',
    },
]);

Blockly.JavaScript.forBlock['list_range'] = function (block) {
    const first = Number(block.getFieldValue('FIRST'));
    const last  = Number(block.getFieldValue('LAST'));
    const arr = [];
    for (let i = first; i <= last; i++) arr.push(i);
    const code = '[' + arr.join(', ') + ']';
    return [code, Blockly.JavaScript.ORDER_ATOMIC];
};


const codeBox = document.getElementById('codeBox');
function updateCode() {
    const code = Blockly.JavaScript.workspaceToCode(workspace);
    codeBox.value = code;
}
updateCode();
workspace.addChangeListener((e) => {
    if (e.isUiEvent || e.type === Blockly.Events.FINISHED_LOADING || workspace.isDragging()) return;
    updateCode();
});


const output = document.getElementById('output');
const testResults = document.getElementById('testResults');
const runner = document.getElementById('runner');


window.addEventListener('message', (e) => {
    const data = e.data || {};
    if (data.type === 'log') {
        output.textContent = (data.payload || []).join('\n');
    } else if (data.type === 'testResult') {
        renderTestResults(data.results || []);
    }
});


function renderTestResults(results) {
    if (!results.length) {
        testResults.textContent = 'No tests run';
        return;
    }
    const lines = results.map((r, idx) => {
        if (r.error) {
            return `#${idx + 1} FAIL  expr: ${r.expr}\n  error: ${r.error}`;
        }
        const exp = formatVal(r.expected);
        const act = formatVal(r.actual);
        return (r.pass ? `#${idx + 1} PASS` : `#${idx + 1} FAIL`) +
            `  expr: ${r.expr}\n  expected: ${exp}\n  actual:   ${act}`;
    });
    testResults.textContent = lines.join('\n');
}
function formatVal(v) {
    try { return typeof v === 'string' ? JSON.stringify(v) : JSON.stringify(v, null, 0); }
    catch { return String(v); }
}


document.getElementById('runBtn').addEventListener('click', () => {
    output.textContent = '';
    runner.contentWindow.postMessage({ type: 'run', code: codeBox.value }, '*');
});

document.getElementById('runTestsBtn').addEventListener('click', () => {
    testResults.textContent = '';
    let cases;
    try {
        cases = JSON.parse(document.getElementById('testsBox').value);
        if (!Array.isArray(cases)) throw new Error('Tests must be a JSON array');
    } catch (err) {
        testResults.textContent = 'Test parse error: ' + err.message;
        return;
    }
    runner.contentWindow.postMessage({ type: 'test', code: codeBox.value, cases }, '*');
});