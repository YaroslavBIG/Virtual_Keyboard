/* eslint-disable linebreak-style */
/* eslint-disable no-return-assign */
/* eslint-disable no-console */
function addInput() {
  const caption = document.createElement('h1');
  caption.classList.add('caption');
  const captionText = 'Virtual Keybord';

  const inputBoard = document.createElement('textarea');
  inputBoard.classList.add('input_board');
  document.body.append(caption);
  document.body.querySelector('.caption').append(captionText);
  document.body.append(inputBoard);
}

addInput();
let capsLockStatus = false;

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

// Key is active?
const isActive = (el) => Boolean(el.classList.contains('keyboard__key--active'));

// Add text on input area
const textArea = document.querySelector('.input_board');

function addText(text) {
  textArea.value += isActive(capsLock) ? `${text.toUpperCase()}` : `${text}`;
}
// Backspace
const backspace = () => textArea.value = textArea.value.substring(0, textArea.value.length - 1);

// Clear text Area
// const clearTextArea = () => textArea.value = '';


function createKeyIcons(iconName) {
  return `<i class="material-icons">${iconName}</i>`;
}

function createKeys() { // ---------------------- ADD CAPS STATUS????
  const fragment = document.createDocumentFragment();
  const keyLayout = [
    'esc', 'F1', 'F2', 'F3', 'F4', 'F5', 'F6', 'F7', 'F8', 'F9', 'F10', 'F11', 'F12',
    '~', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '+', 'backspace',
    'tab', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '{', '}', '\\', 'del',
    'caps', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ':', '"', 'enter',
    'shift', 'done', 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', 'up', 'Rshift',
    'ctrl', 'win', 'alt', 'space', 'alt', 'left', 'down', 'right', 'ctrl',
  ];

  keyLayout.forEach((key) => {
    const keyEl = document.createElement('button');
    const insertLineBreak = ['F12', 'backspace', 'del', 'enter', 'Rshift'].indexOf(key) !== -1;
    const addSlimClass = ['esc', 'F1', 'F2', 'F3', 'F4', 'F5', 'F6', 'F7', 'F8', 'F9', 'F10', 'F11', 'F12'];
    keyEl.setAttribute('type', 'button');
    keyEl.classList.add('keyboard__key');

    switch (key) {
      case 'backspace':
        keyEl.classList.add('keyboard__key--wide');
        keyEl.innerHTML = createKeyIcons('backspace');
        keyEl.addEventListener('click', () => {
          backspace();
        });
        break;

      case 'tab':
        keyEl.innerHTML = createKeyIcons('keyboard_tab');
        // keyEl.addEventListener("click", () => {
        //     addText(" ")
        // });
        break;

      case 'caps':
        keyEl.classList.add('keyboard__key--wide', 'keyboard__key--inactive');
        keyEl.id = 'caps_lock';
        keyEl.innerHTML = createKeyIcons('keyboard_capslock');
        keyEl.addEventListener('click', () => {
          keyEl.classList.toggle('keyboard__key--inactive');
          keyEl.classList.toggle('keyboard__key--active');
          toggleCapsLock();
        });
        break;

      case 'enter':
        keyEl.classList.add('keyboard__key--wide');
        keyEl.innerHTML = createKeyIcons('keyboard_return');
        keyEl.addEventListener('click', () => {
          addText('\n');
        });
        break;

      case 'space':
        keyEl.classList.add('keyboard__key--extra-wide');
        keyEl.innerHTML = createKeyIcons('space_bar');
        keyEl.addEventListener('click', () => {
          addText(' ');
        });
        break;

      case 'up':
        keyEl.innerHTML = createKeyIcons('keyboard_arrow_up');
        // keyEl.addEventListener("click", () => {
        //     addText(" ")
        // });
        break;

      case 'down':
        keyEl.innerHTML = createKeyIcons('keyboard_arrow_down');
        // keyEl.addEventListener("click", () => {
        //     addText(" ")
        // });
        break;

      case 'left':
        keyEl.innerHTML = createKeyIcons('keyboard_arrow_left');
        // keyEl.addEventListener("click", () => {
        //     addText(" ")
        // });
        break;

      case 'right':
        keyEl.innerHTML = createKeyIcons('keyboard_arrow_right');
        // keyEl.addEventListener("click", () => {
        //     addText(" ")
        // });
        break;


      case 'done':
        // keyEl.classList.add("keyboard__key--wide");
        keyEl.innerHTML = createKeyIcons('check_circle');
        keyEl.addEventListener('click', () => {
          // ----------NEED TO ADD FOO!!!!
        });
        break;

      default:
        keyEl.classList.add('keyboard__key');
        keyEl.textContent = key.toLowerCase();
        keyEl.addEventListener('click', () => {
          addText(key);
        });

        if (addSlimClass.includes(key)) {
          keyEl.classList.add('keyboard__key--slim');
        }
        break;
    }


    fragment.appendChild(keyEl);
    if (insertLineBreak) {
      fragment.appendChild(document.createElement('br'));
    }
  });
  document.querySelector('.keyboard__keys').appendChild(fragment); // add object

  return capsLock = document.querySelector('#caps_lock'); // -------------------- Fix IT!
}
createKeys();

const keyboard = document.querySelector('.keyboard');
const keys = keyboard.querySelectorAll('.keyboard__key')

const toggleCapsLock = () => {
  const specialKeys = ['esc', 'F1', 'F2', 'F3', 'F4', 'F5', 'F6', 'F7', 'F8', 'F9', 'F10', 'F11', 'F12',
    'backspace', 'tab', 'del', 'caps','enter', 'shift', 'done', 'up', 'rshift', 'ctrl', 'win', 'alt', 'space',
    'alt', 'left', 'down', 'right']
  capsLockStatus = capsLockStatus ? false : true  
  keys.forEach( key => {
      if (key.childElementCount === 0 && !specialKeys.includes(key.textContent)) {
          key.textContent = capsLockStatus ? key.textContent.toUpperCase() : key.textContent.toLowerCase();
      }
  });
};

document.addEventListener('keydown', (event) => {
  const currentKeyDown = event.key.toLocaleLowerCase();
  keys.forEach(el => {
    if(el.innerText === currentKeyDown) {
      el.classList.add('keyboard__key--pressed')
      console.log("match Down")
    }
  });
});

document.addEventListener('keyup', (event) => {
  const currentKeyUp = event.key.toLocaleLowerCase();
  keys.forEach(el => {
    if(el.innerText === currentKeyUp) {
      el.classList.remove('keyboard__key--pressed')
      console.log("match UP")
    }
  });
});