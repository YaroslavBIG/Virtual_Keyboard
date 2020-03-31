
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

//<textarea class="use-keyboard-input" style="position: absolute; top: 130px; right: 30px; width: 300px;"></textarea>