const display = document.querySelector('.display');
const btn = Array.from(document.querySelector('.keypad').children);
const equal = document.querySelector('.equal');
const allops = ['+', '-', '*', '/', '%'];
const bk = '<i class="fa-solid fa-delete-left"></i>';
let value = ''
let brackets = 0;

document.addEventListener('keydown', (e) => {
    input(e.key);
    e.preventDefault();
})
btn.forEach(element => {
    element.addEventListener('click', (element) => {
        input(element.target.innerHTML);
    })
});

equal.onclick = solve;

function input(text) {
    if (text >= '0' && text <= '9' || text == '.') {
        if(value.toString().endsWith(')'))
            value += '*';
        updatedisplay(text);
    }
    else if (allops.includes(text))
        operators(text);
    else if (text == '(' || text == ')' || text == '( )')
        checkbracket();
    else if (text == 'Backspace' || text == bk)
        backspace();
    else if (text == 'Enter')
        solve();
    else if (text == 'AC' || text == 'Delete') {
        display.value = '';
        value = ''
        brackets = 0;
    }
}
function operators(op) {
    if ((value == '' || value.toString().endsWith('/') || value.toString().endsWith('*') || value.toString().endsWith('(')) && (op == '/' || op == '*' || op == '%')) return;
    if ((op == '*' || op == '/') && (value.toString().endsWith('+') || value.toString().endsWith('-'))) return;
    if ((op == '+' || op == '-') && (allops.includes(value[value.toString().length - 1])))
        brackets++, value += '(';
    updatedisplay(op);
}

function backspace() {
    value.toString().endsWith(')') ? brackets++ : value.toString().endsWith('(') ? brackets-- : 0;
    value = value.toString().slice(0, value.toString().length - 1);
    display.value = value;
}
function solve() {
    if (value == '') return;
    closebracket();
    value = eval(value);
    display.value = value;
}

function checkbracket() {
    if ((brackets > 0) && (!isNaN(value[value.toString().length - 1]) || (value.toString().endsWith(')')))) {
        updatedisplay(')');
        brackets--;
        return ;
    } else if (!isNaN(value[value.toString().length - 1]) || (value.toString().endsWith(')')))
        updatedisplay('*(');
    else
        updatedisplay('(');
    brackets++;
    return 
}

function updatedisplay(text) {
    value += text;
    display.value = value;
}

function closebracket() {
    while (brackets > 0) {
        updatedisplay(')');
        brackets--;
    }
}
