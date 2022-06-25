let screen = document.getElementById('screen');
buttons = document.querySelectorAll('button');
let screenValue = '';
screen.addEventListener('keydown', function (e) {
    if (e.key == 'Enter') {
        screenValue = screen.value;
        screen.value = eval(screenValue);
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
        }
        else {
            screenValue += buttonText;
            screen.value = screenValue;
        }
    })
}
