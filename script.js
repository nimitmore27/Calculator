let body = document.querySelector('body');

let display = document.getElementById('inpdisplay');

let numop = Array.from(document.querySelectorAll('.print'));
let bkspc = document.getElementById('bkspc');
let clearbtn = document.getElementById("clear");
let equals = document.getElementById('equals');

let value = '';
let len = 0;
let brac = 0;
window.onload = () => {
    display.focus();
    cleardisplay();
}
numop.forEach(element => {
    element.onclick = () => {
        append(element.innerText)
    };
});

body.addEventListener('click', () => {
    display.focus();
})

display.addEventListener('keydown', (e) => {
    if ((e.key >= 0 && e.key <= 9) || (e.key == '+' || e.key == '-' || e.key == '*' || e.key == '/' || e.key == '.'))
        append(e.key);
    if (e.key == 'Backspace')
        pop();
    if (e.key == 'Enter')
        calculate();
});

bkspc.onclick = pop;
clearbtn.onclick = cleardisplay;
equals.onclick = calculate;

function append(element) {
    errorsolver();
    if (len == 0 && (element == 0 || element == ' ' || element == '/' || element == '*')) return;
    if ((element == '*' || element == '/') && (value[len - 1] == '+' || value[len - 1] == '-')) return;
    if ((element == '+' || element == '-') && (value[len - 1] == '+' || value[len - 1] == '-' || value[len - 1] == '*' || value[len - 1] == '/'))
        len++, brac++, value += '(';
    if (element == '( )') {
        bracket();
        return;
    }
    if (value[len - 1] == ')' && element >= 0 && element <= 9)
        len++, value += '*'
    len++, value += element, display.value = value;
}

function pop() {
    value[len - 1] == ')' ? brac++ : value[len - 1] == '(' ? brac-- : 0;
    len--;
    value = value.slice(0, len);
    display.value = value;
}

function cleardisplay() {
    value = '', display.value = '', len = 0, brac = 0;
}

function calculate() {
    errorsolver();
    let ans = eval(value);
    display.value = ans;
    value = display.value;
    len = value.length;
}

function errorsolver() {
    if (value.includes("undefined"))
        value = value.replace('undefined', '');
    len = value.length;
}

function checkbracket() {
    let count = 0;
    for (let iterator of value) {
        if (iterator == '(')
            count++;
        if (iterator == ')')
            count--;
    }
    if (count == 0)
        return calculate();
    else
        return false

}
function bracket() {
    if ((brac > 0) && (value[len - 1] >= 0 && value[len - 1] <= 9 || (value[len - 1] == ')'))) {
        value += ')', len++, display.value = value;
        brac--;
    } else if (value[len - 1] >= 0 && value[len - 1] <= 9 || value[len - 1] == ')') {
        value = value + '*(', len++, display.value = value;
        brac++;
    }
    else {
        value = value + '(', len++, display.value = value;
        brac++;
    }
}