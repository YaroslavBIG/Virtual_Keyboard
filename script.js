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
  textArea.focus();
  const caretPosition = textArea.selectionEnd;
  const textLength = textArea.value.length;
  if(caretPosition === textLength) {
    textArea.value += isActive(capsLock) ? `${text.toUpperCase()}` : `${text}`;
  }
  else {
    const textAfterCaret = textArea.value.slice(caretPosition,textArea.value.length);
    const textBeforeCaret = textArea.value.slice(0, caretPosition);
    textArea.value = isActive(capsLock) ? `${textBeforeCaret}${text.toUpperCase()}${textAfterCaret.toUpperCase()}` : `${textBeforeCaret}${text}${textAfterCaret}`;
  }
  textArea.focus();
}
// Backspace
const backspace = () => {
  const caretPosition = textArea.selectionEnd
  const selectStart = textArea.selectionStart
  const textLength = textArea.value.length;
  
  if(textArea.value.length !== selectStart) {
    const textBeforeCaret = textArea.value.slice(0, selectStart);
    const textAfterCaret = textArea.value.slice(caretPosition, textLength);
    textArea.value = `${textBeforeCaret}${textAfterCaret}`
  }
  else{
    textArea.value = textArea.value.substring(0, textArea.value.length - 1);
  }
  textArea.focus();
}
// Clear text Area
const clearTextArea = () => textArea.value = '';

function createKeyIcons(iconName) {
  return `<i class="material-icons">${iconName}</i>`;
}

let keyLang = 'en';
let shiftPress = false;
let keyLayout;
const keyCode = [
    27, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 123,
    192, 49, 50, 51, 52, 53, 54, 55, 56, 57, 48, 189, 187, 8, 
    9, 81, 87, 69, 82, 84, 89, 85, 73, 79, 80, 219, 221, 220, 46, 
    20, 65, 83, 68, 70, 71, 72, 74, 75, 76, 186, 222, 13, 
    16, 90, 88, 67, 86, 66, 78, 77, 188, 190, 38, 16, 
    17, 91, 18, 32, 18, 37, 40, 39, 17
];

const keyLayoutEn = [
  'esc', 'F1', 'F2', 'F3', 'F4', 'F5', 'F6', 'F7', 'F8', 'F9', 'F10', 'F11', 'F12',
  '`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'backspace',
  'tab', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']', '\\', 'del',
  'caps', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', '\'', 'enter',
  'lshift', 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', 'up', 'rshift',
  'ctrl', 'win', 'alt', 'space', 'altgr', 'left', 'down', 'right', 'ctrl', 'done',  
];

const keyLayoutRu = [
  'esc', 'F1', 'F2', 'F3', 'F4', 'F5', 'F6', 'F7', 'F8', 'F9', 'F10', 'F11', 'F12',
  'ё', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'backspace',
  'tab', 'й', 'ц', 'у', 'к', 'е', 'н', 'г', 'ш', 'щ', 'з', 'х', 'ъ', '\\', 'del',
  'caps', 'ф', 'ы', 'в', 'а', 'п', 'р', 'о', 'л', 'д', 'ж', 'э', 'enter',
  'lshift', 'я', 'ч', 'с', 'м', 'и', 'т', 'ь', 'б', 'ю', 'up', 'rshift',
  'ctrl', 'win', 'alt', 'space', 'altgr', 'left', 'down', 'right', 'ctrl', 'done', 
];

const keyLayoutSymRu = [
  'esc', 'F1', 'F2', 'F3', 'F4', 'F5', 'F6', 'F7', 'F8', 'F9', 'F10', 'F11', 'F12',
  'ё', '!', '"', '№', ';', '%', ':', '?', '*', '(', ')', '_', '+', 'backspace',
  'tab', 'й', 'ц', 'у', 'к', 'е', 'н', 'г', 'ш', 'щ', 'з', 'х', 'ъ', '|', 'del',
  'caps', 'ф', 'ы', 'в', 'а', 'п', 'р', 'о', 'л', 'д', 'ж', 'э', 'enter',
  'lshift', 'я', 'ч', 'с', 'м', 'и', 'т', 'ь', 'б', 'ю', 'up', 'rshift',
  'ctrl', 'win', 'alt', 'space', 'altgr', 'left', 'down', 'right', 'ctrl', 'done',
];

const keyLayoutSymEn = [
  'esc', 'F1', 'F2', 'F3', 'F4', 'F5', 'F6', 'F7', 'F8', 'F9', 'F10', 'F11', 'F12',
  '~', '!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '_', '+', 'backspace',
  'tab', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '{', '}', '|', 'del',
  'caps', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ':', '"', 'enter',
  'lshift', 'z', 'x', 'c', 'v', 'b', 'n', 'm', '<', '>', 'up', 'rshift',
  'ctrl', 'win', 'alt', 'space', 'altgr', 'left', 'down', 'right', 'ctrl', 'done',
];

const specialKeys = ['esc', 'F1', 'F2', 'F3', 'F4', 'F5', 'F6', 'F7', 'F8', 'F9', 'F10', 'F11', 'F12',
    'backspace', 'tab', 'del', 'caps', 'enter', 'lshift', 'done', 'up', 'rshift', 'ctrl', 'win', 'alt', 'space',
    'altgr', 'left', 'down', 'right'];

function createKeys() {
  const fragment = document.createDocumentFragment();
  
  const editCaretPos = (direction) => {
    const currentPosCarret = textArea.selectionEnd;
    const posMinus = () => {
      //console.log(currentPosCarret);
      textArea.focus();
      textArea.setSelectionRange(currentPosCarret - 1, currentPosCarret - 1);
      textArea.focus();
    };
    const posPlus = () => {
      //console.log(currentPosCarret);
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

  if(keyLang === 'en' && shiftPress === false) {
    keyLayout = keyLayoutEn;
  };

  if(keyLang === 'ru' && shiftPress === false) {
    keyLayout = keyLayoutRu;
  };

  if(keyLang === 'en' && shiftPress === true) {
    keyLayout = keyLayoutSymEn;
    //console.log('shiftPress === true')
  };

  if(keyLang === 'ru' && shiftPress === true){
    keyLayout = keyLayoutSymRu;
  };
  //console.log(shiftPress)
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
          editCaretPos('left');
        });
        break;

      case 'right':
        keyEl.innerHTML = createKeyIcons('keyboard_arrow_right');
        keyEl.addEventListener('click', () => {
          textArea.focus();
          editCaretPos('right');
        });
        break;
      
      case 'done':
        // keyEl.classList.add("keyboard__key--wide");
        keyEl.innerHTML = createKeyIcons('check_circle');
        keyEl.addEventListener('click', () => {
         keyLang = keyLang === 'en' ? 'ru' : 'en';
         createKeys()
         capsLockStatus = false;
        });
        break;

      case 'lshift':
        keyEl.classList.add('keyboard__key');
        keyEl.textContent = key.toLowerCase();
      break;

      case 'rshift':
        keyEl.classList.add('keyboard__key');
        keyEl.textContent = key.toLowerCase();
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
  capsLockStatus = !capsLockStatus;
  const keys = keyboard.querySelectorAll('.keyboard__key');
  keys.forEach((key) => {
    if (key.childElementCount === 0 && !specialKeys.includes(key.textContent)) {
      key.textContent = capsLockStatus ? key.textContent.toUpperCase() : key.textContent.toLowerCase();
    }
  });
};

const toggleShift = (bool) => {
  shiftPress = bool;
  createKeys()
};

function addEventListenerKeyLight() {
  const keys = document.querySelectorAll('.keyboard__key');
  
textArea.addEventListener('keydown', (event) => {
  const currentKeyDown = event.key.toLocaleLowerCase();
  const currentKeyDownCode = event.code.toLocaleLowerCase();
  //console.log(event.keyCode);
  const pressedKey = keyCode.indexOf(event.keyCode);
  console.log('KEY DOWN', keyLayout[pressedKey]);
  const keyPressedCurrentValue = keyLayout[pressedKey];
  addText(keyPressedCurrentValue)
  //keyCode.push(event.keyCode);
  //console.log(keyPressedCurrentValue)
  
  keys.forEach((el) => {
    const key = el.innerText;
    if (key === 'esc' && currentKeyDown === 'escape') {
      el.classList.add('keyboard__key--pressed');
    }
    else if (key === 'lshift' && currentKeyDownCode === 'shiftleft') {
      el.classList.add('keyboard__key--pressed');
    }
    else if (key === 'rshift' && currentKeyDownCode === 'shiftright') {
      el.classList.add('keyboard__key--pressed');
    }
    else if(key === 'caps' && keyPressedCurrentValue === 'caps') {
      el.classList.add('keyboard__key--pressed')
    }
    else if(key === 'backspace' && keyPressedCurrentValue === 'backspace') {
      el.classList.add('keyboard__key--pressed')
      backspace()
    }
    else if (key === currentKeyDown) {
      el.classList.add('keyboard__key--pressed');
    }
    
      // console.log("match Down")
  });
  
}, true);

textArea.addEventListener('keypress', (event) => {
  const currentKeyUp = event.key.toLocaleLowerCase();
  const currentKeyUpCode = event.code.toLocaleLowerCase();
  console.log('KEYpRESS', currentKeyUp)
  // KeyboardEvent.shiftKey  !!!!!!!!!!!!!!!!!
 /* keys.forEach((el) => {
    const key = el.innerText;
    if (key === 'esc' && currentKeyUp === 'escape') {
      event.repeat = false;
      el.classList.remove('keyboard__key--pressed');
    }
    if (key === 'lshift' && currentKeyUpCode === 'shiftleft') {
      event.repeat = false;
      el.classList.remove('keyboard__key--pressed');
    }
    if (key === 'rshift' && currentKeyUpCode === 'shiftright') {
      event.repeat = false;
      el.classList.remove('keyboard__key--pressed');
    }
    if (el.innerText === currentKeyUp) {
      el.classList.remove('keyboard__key--pressed');
      // console.log("match UP")
    }
  });*/
  event.preventDefault()
});

textArea.addEventListener('keyup', (event) => {
  //event.repeat = false;
  
  const pressedKey = keyCode.indexOf(event.keyCode);
  const keyPressedCurrentValue = keyLayout[pressedKey];
  const currentKeyDown = event.key.toLocaleLowerCase();
  const currentKeyDownCode = event.code.toLocaleLowerCase();
  console.log('keyUP', currentKeyDown)
  
  keys.forEach((el) => {
    const key = el.innerText;
    if (key === 'esc' && currentKeyDown === 'escape') {
      el.classList.remove('keyboard__key--pressed');
    }
    if (key === 'lshift' && currentKeyDownCode === 'shiftleft') {
      el.classList.remove('keyboard__key--pressed');
    }
    if (key === 'rshift' && currentKeyDownCode === 'shiftright') {
      el.classList.remove('keyboard__key--pressed');
    }
    if(key === 'caps' && keyPressedCurrentValue === 'caps') {
      el.classList.remove('keyboard__key--pressed')
    }
    if (key === currentKeyDown) {
      el.classList.remove('keyboard__key--pressed');
    }
    if(key === 'caps' && keyPressedCurrentValue === 'caps') {
    el.classList.remove('keyboard__key--pressed')}
    event.preventDefault();
    });
});
const keyboard = document.querySelector('.keyboard__keys');
keyboard.addEventListener('mousedown', (event) => {
  //console.log(event)
  //console.log(event.target.innerText)
  setTimeout(() => {
    if(event.target.innerText === 'lshift'){
      toggleShift(true)
      textArea.focus()
    }
  }, 300);
    
  setTimeout(() => {
    if(event.target.innerText === 'rshift'){
      toggleShift(true)
      textArea.focus()
    }
  }, 300);
}, );
keyboard.addEventListener('mouseup', (event) => {
  if(event.target.innerText === 'lshift'){
    toggleShift(false)
    }
  if(event.target.innerText === 'rshift'){
    toggleShift(false)
    }
});

};
// textArea.selectionStart = 5
// 5
// textArea.selectionEnd = 5
// 5
