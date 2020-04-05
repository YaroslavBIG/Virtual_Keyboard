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

// Add text on input area
const textArea = document.querySelector('.input_board');

function addText(text) {
  textArea.focus();
  const caretPosition = textArea.selectionEnd;
  const textLength = textArea.value.length;
  if(caretPosition === textLength) {
    textArea.value += capsLockStatus ? `${text.toUpperCase()}` : `${text}`;
  }
  else {
    const textAfterCaret = textArea.value.slice(caretPosition,textArea.value.length);
    const textBeforeCaret = textArea.value.slice(0, caretPosition);
    textArea.value = capsLockStatus ? `${textBeforeCaret}${text.toUpperCase()}${textAfterCaret.toUpperCase()}` : `${textBeforeCaret}${text}${textAfterCaret}`;
    const carretPositionAfter = caretPosition + text.length;
    textArea.setSelectionRange(carretPositionAfter, carretPositionAfter)
  }
  textArea.focus();
}
// Backspace
const backspace = () => {
  const caretPosition = textArea.selectionEnd
  const selectStart = textArea.selectionStart
  const textLength = textArea.value.length;
  
  if(textArea.value.length !== selectStart && caretPosition === selectStart) {
    const textBeforeCaret = textArea.value.slice(0, selectStart - 1);
    const textAfterCaret = textArea.value.slice(caretPosition, textLength);
    textArea.value = `${textBeforeCaret}${textAfterCaret}`
    textArea.setSelectionRange(selectStart - 1, selectStart - 1)
  }
  if(caretPosition !== selectStart){
    const textBeforeCaret = textArea.value.slice(0, selectStart);
    const textAfterCaret = textArea.value.slice(caretPosition, textLength);
    textArea.value = `${textBeforeCaret}${textAfterCaret}`
    textArea.setSelectionRange(selectStart, selectStart)
  }
  if(caretPosition === textLength){
    textArea.value = textArea.value.substring(0, textArea.value.length - 1);
    textArea.setSelectionRange(selectStart - 1, selectStart - 1)
  }
 
  textArea.focus();
}

const del = () => {
  const caretPosition = textArea.selectionEnd
  const selectStart = textArea.selectionStart
  const textLength = textArea.value.length;
  
  if(textArea.value.length !== selectStart && caretPosition === selectStart) {
    const textBeforeCaret = textArea.value.slice(0, selectStart);
    const symbSliceAfter = caretPosition + 1;
    const textAfterCaret = textArea.value.slice(symbSliceAfter, textLength);
    textArea.value = `${textBeforeCaret}${textAfterCaret}`
    
  }
  if(caretPosition !== selectStart){
    const textBeforeCaret = textArea.value.slice(0, selectStart);
    const textAfterCaret = textArea.value.slice(caretPosition, textLength);
    textArea.value = `${textBeforeCaret}${textAfterCaret}`
    textArea.setSelectionRange(selectStart, selectStart)
  }
  textArea.setSelectionRange(selectStart, selectStart)
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
const keyCodes = [
  27, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 123,
  192, 49, 50, 51, 52, 53, 54, 55, 56, 57, 48, 189, 187, 8,
  9, 81, 87, 69, 82, 84, 89, 85, 73, 79, 80, 219, 221, 220, 46,
  20, 65, 83, 68, 70, 71, 72, 74, 75, 76, 186, 222, 13,
  16, 90, 88, 67, 86, 66, 78, 77, 188, 190, 38, 16,
  17, 91, 18, 32, 18, 37, 40, 39, 17, 
];

const keyLayoutEn = [
  'esc', 'f1', 'f2', 'f3', 'f4', 'f5', 'f6', 'f7', 'f8', 'f9', 'f10', 'f11', 'f12',
  '`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'backspace',
  'tab', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']', '\\', 'del',
  'caps', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', '\'', 'enter',
  'lshift', 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', 'up', 'rshift',
  'ctrl', 'win', 'alt', 'space', 'altgr', 'left', 'down', 'right', 'ctrl', 'done',  
];

const keyLayoutRu = [
  'esc', 'f1', 'f2', 'f3', 'f4', 'f5', 'f6', 'f7', 'f8', 'f9', 'f10', 'f11', 'f12',
  'ё', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'backspace',
  'tab', 'й', 'ц', 'у', 'к', 'е', 'н', 'г', 'ш', 'щ', 'з', 'х', 'ъ', '\\', 'del',
  'caps', 'ф', 'ы', 'в', 'а', 'п', 'р', 'о', 'л', 'д', 'ж', 'э', 'enter',
  'lshift', 'я', 'ч', 'с', 'м', 'и', 'т', 'ь', 'б', 'ю', 'up', 'rshift',
  'ctrl', 'win', 'alt', 'space', 'altgr', 'left', 'down', 'right', 'ctrl', 'done', 
];

const keyLayoutSymRu = [
  'esc', 'f1', 'f2', 'f3', 'f4', 'f5', 'f6', 'f7', 'f8', 'f9', 'f10', 'f11', 'f12',
  'ё', '!', '"', '№', ';', '%', ':', '?', '*', '(', ')', '_', '+', 'backspace',
  'tab', 'й', 'ц', 'у', 'к', 'е', 'н', 'г', 'ш', 'щ', 'з', 'х', 'ъ', '|', 'del',
  'caps', 'ф', 'ы', 'в', 'а', 'п', 'р', 'о', 'л', 'д', 'ж', 'э', 'enter',
  'lshift', 'я', 'ч', 'с', 'м', 'и', 'т', 'ь', 'б', 'ю', 'up', 'rshift',
  'ctrl', 'win', 'alt', 'space', 'altgr', 'left', 'down', 'right', 'ctrl', 'done',
];

const keyLayoutSymEn = [
  'esc', 'f1', 'f2', 'f3', 'f4', 'f5', 'f6', 'f7', 'f8', 'f9', 'f10', 'f11', 'f12',
  '~', '!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '_', '+', 'backspace',
  'tab', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '{', '}', '|', 'del',
  'caps', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ':', '"', 'enter',
  'lshift', 'z', 'x', 'c', 'v', 'b', 'n', 'm', '<', '>', 'up', 'rshift',
  'ctrl', 'win', 'alt', 'space', 'altgr', 'left', 'down', 'right', 'ctrl', 'done',
];

const specialKeys = ['esc', 'f1', 'f2', 'f3', 'f4', 'f5', 'f6', 'f7', 'f8', 'f9', 'f10', 'f11', 'f12',
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
    const insertLineBreak = ['f12', 'backspace', 'del', 'enter', 'rshift'].indexOf(key) !== -1;
    const addSlimClass = ['esc', 'f1', 'f2', 'f3', 'f4', 'f5', 'f6', 'f7', 'f8', 'f9', 'f10', 'f11', 'f12',];
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
          addText(' ');
        });
        break;

      case 'caps':
        keyEl.classList.add('keyboard__key--wide', 'keyboard__key--inactive');
        keyEl.id = 'caps_lock';
        keyEl.innerHTML = createKeyIcons('keyboard_capslock');
        keyEl.addEventListener('click', () => {
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

      case 'del':
        keyEl.classList.add('keyboard__key')
        keyEl.textContent = key.toLowerCase();
        keyEl.addEventListener('click', () => {
          del()
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
}
createKeys();

const keyboard = document.querySelector('.keyboard__keys');

const toggleCapsLock = () => {
  console.log('toggleCapsLock')
  const keyboard = document.querySelector('.keyboard__keys');
  capsLockStatus = !capsLockStatus;
  const caps = document.querySelector('#caps_lock')
  caps.classList.toggle('keyboard__key--inactive');
  caps.classList.toggle('keyboard__key--active');
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
const keys = document.querySelectorAll('.keyboard__key');
function addEventListenerKeyLight() {
  const keys = document.querySelectorAll('.keyboard__key');
  
textArea.addEventListener('keydown', (event) => {
  const currentKeyDown = event.key.toLocaleLowerCase();
  const currentKeyDownCode = event.code.toLocaleLowerCase();
  //console.log('DOWNCODE',event.keyCode);
  const pressedKey = keyCodes.indexOf(event.keyCode);
  const keyPressedCurrentValue = keyLayout[pressedKey];
  //event.preventDefault()
 // keyCodes.push(event.keyCode);
 //console.log(pressedKey)
  //console.log(keyPressedCurrentValue)
  
  keys.forEach((el) => {
    const key = el.childElementCount >= 1 ? el.firstChild.innerText : el.innerText;
    //console.log(key)
    if (key === 'esc' && keyPressedCurrentValue === key) {
      el.classList.add('keyboard__key--pressed');
    }
    else if(key === 'del' && keyPressedCurrentValue === key) {
      event.preventDefault();
      el.classList.add('keyboard__key--pressed')
      del()
    }
    else if(key === 'keyboard_tab' && keyPressedCurrentValue === 'tab') {
      event.preventDefault();
      el.classList.add('keyboard__key--pressed')
      addText(' ')
      textArea.focus()
    }
    else if(key === 'keyboard_return' && keyPressedCurrentValue === 'enter') {
      event.preventDefault();
      el.classList.add('keyboard__key--pressed')
      addText('\n')
      textArea.focus()
    }
    else if (key === 'lshift' && keyPressedCurrentValue === key) {
      el.classList.add('keyboard__key--pressed');
      setTimeout(() => {
          toggleShift(true)
          textArea.focus()
      }, 300);
    }
    else if (key === 'rshift' && keyPressedCurrentValue === key) {
      el.classList.add('keyboard__key--pressed');
    }
    else if(key === 'backspace' && keyPressedCurrentValue === key) {
      event.preventDefault();
      el.classList.add('keyboard__key--pressed')
      backspace();
    }
    
    else if (key === keyPressedCurrentValue) {
      el.classList.add('keyboard__key--pressed');
      addText(keyPressedCurrentValue);
      event.preventDefault();
    }
    
      // console.log("match Down")
  });
  
}, true);

/*textArea.addEventListener('keypress', (event) => {
  const currentKeyUp = event.key.toLocaleLowerCase();
  const currentKeyUpCode = event.code.toLocaleLowerCase();
  
  // KeyboardEvent.shiftKey  !!!!!!!!!!!!!!!!!
  const pressedKey = keyCodes.indexOf(event.keyCode);
  const keyPressedCurrentValue = keyLayout[pressedKey];
  console.log('KEYpRESS', event.keyCode)
  event.preventDefault()

  keys.forEach((el) => {
    const key = el.innerText;
    if (key === keyPressedCurrentValue) {
      el.classList.add('keyboard__key--pressed');
      addText(keyPressedCurrentValue);
      event.preventDefault();
    }
  
  });
});*/

textArea.addEventListener('keyup', (event) => {
  //event.repeat = false;
  
  const pressedKey = keyCodes.indexOf(event.keyCode);
  const keyPressedCurrentValue = keyLayout[pressedKey];
  const currentKeyDown = event.key.toLocaleLowerCase();
  const currentKeyDownCode = event.code.toLocaleLowerCase();
 // console.log('keyUP', currentKeyDown)
  console.log(keyPressedCurrentValue)
  event.preventDefault();
  keys.forEach((el) => {
    const key = el.childElementCount >= 1 ? el.firstChild.innerText : el.innerText;
    if (key === 'lshift' && keyPressedCurrentValue === key) {
      el.classList.remove('keyboard__key--pressed');
      toggleShift(false);
    }
    else if(key === 'keyboard_capslock' && keyPressedCurrentValue === 'caps') {
      console.log('!!!!!CAPS')
      event.preventDefault();
      el.classList.remove('keyboard__key--pressed')
      toggleCapsLock()
    }
    else{
      el.classList.remove('keyboard__key--pressed')
    }
  });
  event.preventDefault();
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
