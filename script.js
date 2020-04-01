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
let capsLock;

//Key is active?
const isActive = (el) => Boolean(el.classList.contains("keyboard__key--active"));

//Add text on input area
const textArea = document.querySelector(".input_board");

function addText(text) {
    textArea.value += isActive(capsLock) && text[0] !== '\\' ? `${text.toUpperCase()}` : `${text}`;
}
//Backspace
const backspace = () => textArea.value = textArea.value.substring(0, textArea.value.length - 1);

//Clear text Area
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
        const insertLineBreak = ["backspace", "p", "enter", "?"].indexOf(key) !== -1;
        console.log(insertLineBreak)
        keyEl.setAttribute("type", "button");
        keyEl.classList.add("keyboard__key");

        switch (key) {
            case "backspace":
                keyEl.classList.add("keyboard__key--wide");
                keyEl.innerHTML = createKeyIcons("backspace");
                keyEl.addEventListener("click", () => {
                    backspace();
                });
                keyEl.addEventListener("keydown", () => {
                    while(true) {backspace()};
                });
                break;
               
            case "caps":
                keyEl.classList.add("keyboard__key--wide", "keyboard__key--inactive");
                keyEl.id = "caps_lock"
                keyEl.innerHTML = createKeyIcons("keybord_capslock");
                keyEl.addEventListener("click", () => {
                    keyEl.classList.toggle("keyboard__key--inactive");
                    keyEl.classList.toggle("keyboard__key--active");
                });
                break;

            case "caps":
                keyEl.classList.add("keyboard__key--wide");
                keyEl.innerHTML = createKeyIcons("keybord_return");
                keyEl.addEventListener("click", () => {
                    addText("/n")
                });
                break;

            case "space":
                keyEl.classList.add("keyboard__key--extra-wide");
                keyEl.innerHTML = createKeyIcons("space_bar");
                keyEl.addEventListener("click", () => {
                    addText(" ")
                });
                break;

            case "done":
                keyEl.classList.add("keyboard__key--wide");
                keyEl.innerHTML = createKeyIcons("check_circle");
                keyEl.addEventListener("click", () => {
//----------NEED TO ADD FOO!!!!
                });
                break;
            
            default:
                keyEl.classList.add("keyboard__key");
                keyEl.textContent = key.toLowerCase();
                keyEl.addEventListener("click", () => {
                    addText(key);
                });
                break;  
        }
        
        fragment.appendChild(keyEl);
        if(insertLineBreak) {
            fragment.appendChild(document.createElement('br'));
        }
    })
    document.querySelector('.keyboard__keys').appendChild(fragment);
    
    return capsLock = document.querySelector('#caps_lock'); // -------------------- Fix IT!
}