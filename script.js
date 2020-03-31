
function addInput() {
    const caption = document.createElement('h1');
    caption.classList.add('caption');
    const captionText = 'Virtual Keybord';

    const inputBoard = document.createElement('textarea');
    inputBoard.classList.add('input_board');
    document.body.append(caption);
    document.body.querySelector('.caption').append(captionText)
    document.body.append(inputBoard);
}

addInput();

function addKeybord() {
    const keyboard = document.createElement('div');
    keyboard.classList.add('keyboard');
    document.body.append(keyboard);
    
    const keyboardKeys = document.createElement('div');
    keyboardKeys.classList.add('keyboard__keys');
    document.body.querySelector('.keyboard').append(keyboardKeys);


}
addKeybord();
//Add text on input area
const textArea = document.querySelector(".input_board");

function addText(text) {
    textArea.value += `${text}`;
}
//Backspace
const backspace = () => textArea.value = textArea.value.substring(0, textArea.value.length - 1);

//Clear
const clearTextArea = () => textArea.value = "";

function createKeyIcons(icon_name) {
    return `<i class="material-icons">${icon_name}</i>`
}

function createKeys() {
    const fragment = document.createDocumentFragment();
    const keyLayout = [
        "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "backspace",
        "q", "w", "e", "r", "t", "y", "u", "i", "o", "p",
        "caps", "a", "s", "d", "f", "g", "h", "j", "k", "l", "enter",
        "done", "z", "x", "c", "v", "b", "n", "m", ",", ".", "?",
        "space"
    ];

    keyLayout.forEach(key =>{
        const keyEl = document.createElement("button");
        const insertLineBreak = ["backspase", "p", "enter", "?"].indexOf(key) === 1;

        keyEl.setAttribute("type", "button");
        keyEl.classList.add("keyboard__key");

        switch (key) {
            case "backspace":
                keyEl.classList.add("keyboard__key--wide");
                keyEl.innerHTML = createKeyIcons("backspace");
                keyEl.addEventListener("click", () => {

                });
                break;
        }
    })
}

