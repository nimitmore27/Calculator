let screen = document.getElementById('screen');
let buttons = document.querySelectorAll('button');
let body = document.getElementById("bd");
let screenValue = '';
body.addEventListener('keydown',(e)=>{
    if (e.key == 'Enter') {
        screenValue = screen.value;
        screen.value = eval(screenValue);
        screenValue = ''
    }
    else if (e.key >= '0' && e.key <= '9') {
        screenValue += e.key;
        screen.value = screenValue;
    }
    else if (e.key == '+' || e.key == '-' || e.key == '*' || e.key == '/') {
        buttonText = e.key;
        screenValue += buttonText;
        screen.value = screenValue;
    }
    else if (e.key == 'Backspace') {
        const last = screenValue.length;
        screenValue = screenValue.slice(0, last - 1);
        screen.value = screenValue;
    }
    else {
        console.log(e.key);
    }
});
for (item of buttons) {
    item.addEventListener('click', (e) => {
        buttonText = e.target.innerText;
        if (buttonText == 'x') {
            buttonText = '*';
            screenValue += buttonText;
            screen.value = screenValue;
        }
        else if (buttonText == 'C') {
            screenValue = "";
            screen.value = screenValue;
        }
        else if (buttonText == '=') {
            screen.value = eval(screenValue);
            screenValue = ''
        }
        else {
            screenValue += buttonText;
            screen.value = screenValue;
        }
    })
}
