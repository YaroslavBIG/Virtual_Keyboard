/* eslint-disable linebreak-style */
/* eslint-disable no-return-assign */
/* eslint-disable no-console */
function addInput() {
  const caption = document.createElement('h1');
  caption.classList.add('caption');
  const captionText = 'Virtual Keybord';

  const inputBoard = document.createElement('textarea');
  inputBoard.classList.add('input_board');
  inputBoard.setAttribute('autofocus', 'autofocus');
  document.body.append(caption);
  document.body.querySelector('.caption').append(captionText);
  document.body.append(inputBoard);
}

addInput();
let capsLockStatus = false;
let shiftStatus = false;
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

let keyLang = 'en';
let shiftPress = false;

function createKeys() {
  const fragment = document.createDocumentFragment();
  const keyLayoutEn = [
    'esc', 'F1', 'F2', 'F3', 'F4', 'F5', 'F6', 'F7', 'F8', 'F9', 'F10', 'F11', 'F12',
    '`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'backspace',
    'tab', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']', '\\', 'del',
    'caps', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', '\'', 'enter',
    'lshift', 'done', 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', 'up', 'rshift',
    'ctrl', 'win', 'alt', 'space', 'altgr', 'left', 'down', 'right', 'ctrl',
  ];

  const keyLayoutRu = [
    'esc', 'F1', 'F2', 'F3', 'F4', 'F5', 'F6', 'F7', 'F8', 'F9', 'F10', 'F11', 'F12',
    'ё', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'backspace',
    'tab', 'й', 'ц', 'у', 'к', 'е', 'н', 'г', 'ш', 'щ', 'з', 'х', 'ъ', '\\', 'del',
    'caps', 'ф', 'ы', 'в', 'а', 'п', 'р', 'о', 'л', 'д', 'ж', 'э', 'enter',
    'lshift', 'done', 'я', 'ч', 'с', 'м', 'и', 'т', 'ь', 'б', 'ю', 'up', 'rshift',
    'ctrl', 'win', 'alt', 'space', 'altgr', 'left', 'down', 'right', 'ctrl',
  ];

  const keyLayoutSymRu = [
    'esc', 'F1', 'F2', 'F3', 'F4', 'F5', 'F6', 'F7', 'F8', 'F9', 'F10', 'F11', 'F12',
    'ё', '!', '"', '№', ';', '%', ':', '?', '*', '(', ')', '_', '+', 'backspace',
    'tab', 'й', 'ц', 'у', 'к', 'е', 'н', 'г', 'ш', 'щ', 'з', 'х', 'ъ', '|', 'del',
    'caps', 'ф', 'ы', 'в', 'а', 'п', 'р', 'о', 'л', 'д', 'ж', 'э', 'enter',
    'lshift', 'done', 'я', 'ч', 'с', 'м', 'и', 'т', 'ь', 'б', 'ю', 'up', 'rshift',
    'ctrl', 'win', 'alt', 'space', 'altgr', 'left', 'down', 'right', 'ctrl',
  ];

  const keyLayoutSymEn = [
    'esc', 'F1', 'F2', 'F3', 'F4', 'F5', 'F6', 'F7', 'F8', 'F9', 'F10', 'F11', 'F12',
    '~', '!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '_', '+', 'backspace',
    'tab', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '{', '}', '|', 'del',
    'caps', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ':', '"', 'enter',
    'lshift', 'done', 'z', 'x', 'c', 'v', 'b', 'n', 'm', '<', '>', 'up', 'rshift',
    'ctrl', 'win', 'alt', 'space', 'altgr', 'left', 'down', 'right', 'ctrl',
  ];


  const editCarretPos = (direction) => {
    const currentPosCarret = textArea.selectionEnd;
    const posMinus = () => {
      console.log(currentPosCarret);
      textArea.focus();
      textArea.setSelectionRange(currentPosCarret - 1, currentPosCarret - 1);
      textArea.focus();
    };
    const posPlus = () => {
      console.log(currentPosCarret);
      textArea.focus();
      textArea.setSelectionRange(currentPosCarret + 1, currentPosCarret + 1);
      textArea.focus();
    };
    switch (direction) {
      case 'left':
        posMinus();
        break;
      case 'right':
        posPlus();
        break;
    }
  };
  
  let keyLayout;

  if(keyLang === 'en' && shiftPress === false) {
    keyLayout = keyLayoutEn;
  }

  if(keyLang === 'ru' && shiftPress === false){
    keyLayout = keyLayoutRu;
  }

  if(keyLang === 'en' && shiftPress === true) {
    keyLayout = keyLayoutSymEn;
  }

  if(keyLang === 'ru' && shiftPress === true){
    keyLayout = keyLayoutSymRu;
  }

  keyLayout.forEach((key) => {
    const keyEl = document.createElement('button');
    const insertLineBreak = ['F12', 'backspace', 'del', 'enter', 'rshift'].indexOf(key) !== -1;
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
        keyEl.addEventListener('click', () => {
          addText('    ');
        });
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
        keyEl.addEventListener('click', () => {
          textArea.focus();
          editCarretPos('left');
        });
        break;

      case 'right':
        keyEl.innerHTML = createKeyIcons('keyboard_arrow_right');
        keyEl.addEventListener('click', () => {
          textArea.focus();
          editCarretPos('right');
        });
        break;
      
      case 'lshift':
        keyEl.classList.add('keyboard__key');
        keyEl.textContent = key.toLowerCase();
        keyEl.addEventListener('keydown', () => {
          toggleShift()
        });
        keyEl.addEventListener('keyup', () => {
          toggleShift()
        });
      
      case 'rshift':
        keyEl.classList.add('keyboard__key');
        keyEl.textContent = key.toLowerCase();
        keyEl.addEventListener('keydown', () => {
          toggleShift()
        });
        keyEl.addEventListener('keyup', () => {
          toggleShift()
        });
      
      case 'done':
        // keyEl.classList.add("keyboard__key--wide");
        keyEl.innerHTML = createKeyIcons('check_circle');
        keyEl.addEventListener('click', () => {
         keyLang = keyLang === 'en' ? 'ru' : 'en';
         createKeys()
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
  const keyboard = document.querySelector('.keyboard__keys');
  keyboard.innerHTML = ''
  keyboard.appendChild(fragment); // add object
  addEventListenerKeyLight()
  return capsLock = document.querySelector('#caps_lock'); // -------------------- Fix IT!
}
createKeys();

const keyboard = document.querySelector('.keyboard__keys');



const toggleCapsLock = () => {
  const specialKeys = ['esc', 'F1', 'F2', 'F3', 'F4', 'F5', 'F6', 'F7', 'F8', 'F9', 'F10', 'F11', 'F12',
    'backspace', 'tab', 'del', 'caps', 'enter', 'lshift', 'done', 'up', 'rshift', 'ctrl', 'win', 'alt', 'space',
    'altgr', 'left', 'down', 'right'];
  capsLockStatus = !capsLockStatus;
  const keys = keyboard.querySelectorAll('.keyboard__key');
  keys.forEach((key) => {
    if (key.childElementCount === 0 && !specialKeys.includes(key.textContent)) {
      key.textContent = capsLockStatus ? key.textContent.toUpperCase() : key.textContent.toLowerCase();
    }
  });
};

const toggleShift = () => {
  shiftStatus = !shiftStatus;
  createKeys()
};

function addEventListenerKeyLight() {
  //const keyboard = document.querySelector('.keyboard');
  const keys = document.querySelectorAll('.keyboard__key');
textArea.addEventListener('keydown', (event) => {
  const currentKeyDown = event.key.toLocaleLowerCase();
  const currentKeyDownCode = event.code.toLocaleLowerCase();

  keys.forEach((el) => {
    const key = el.innerText;
    if (key === 'esc' && currentKeyDown === 'escape') {
      el.classList.add('keyboard__key--pressed');
    }
    if (key === 'lshift' && currentKeyDownCode === 'shiftleft') {
      el.classList.add('keyboard__key--pressed');
    }
    if (key === 'rshift' && currentKeyDownCode === 'shiftright') {
      el.classList.add('keyboard__key--pressed');
    }
    if (key === currentKeyDown) {
      el.classList.add('keyboard__key--pressed');
      // console.log("match Down")
    }
  });
});

textArea.addEventListener('keyup', (event) => {
  const currentKeyUp = event.key.toLocaleLowerCase();
  const currentKeyUpCode = event.code.toLocaleLowerCase();
  keys.forEach((el) => {
    const key = el.innerText;
    if (key === 'esc' && currentKeyUp === 'escape') {
      el.classList.remove('keyboard__key--pressed');
    }
    if (key === 'lshift' && currentKeyUpCode === 'shiftleft') {
      el.classList.remove('keyboard__key--pressed');
    }
    if (key === 'rshift' && currentKeyUpCode === 'shiftright') {
      el.classList.remove('keyboard__key--pressed');
    }
    if (el.innerText === currentKeyUp) {
      el.classList.remove('keyboard__key--pressed');
      // console.log("match UP")
    }
  });
});

};
// textArea.selectionStart = 5
// 5
// textArea.selectionEnd = 5
// 5
