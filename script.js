/* eslint-disable no-use-before-define */
/* eslint-disable linebreak-style */

let keyLang = localStorage.getItem('lang') || 'en';
let shiftPress = false;
let keyLayout;
let ctrlKeyPress = false;

function addInput() {
  const caption = document.createElement('h1');
  caption.classList.add('caption');
  const captionText = 'Virtual Keybord';

  const inputBoard = document.createElement('textarea');
  inputBoard.classList.add('input_board');
  inputBoard.setAttribute('autofocus', 'autofocus');
  const textHelp = document.createElement('p');
  textHelp.classList.add('text-help');
  const text = 'Создана под Windows; Смена раскладки CTRL + ALT';
  document.body.append(caption);
  document.body.querySelector('.caption').append(captionText);
  document.body.append(textHelp);
  document.body.querySelector('.text-help').append(text);
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

// Add text on input area
const textArea = document.querySelector('.input_board');

function addText(text) {
  textArea.focus();
  const caretPosition = textArea.selectionEnd;
  const textLength = textArea.value.length;
  if (caretPosition === textLength) {
    textArea.value += capsLockStatus ? `${text.toUpperCase()}` : `${text}`;
  } else {
    const textAfterCaret = textArea.value.slice(caretPosition, textArea.value.length);
    const textBeforeCaret = textArea.value.slice(0, caretPosition);
    textArea.value = capsLockStatus ? `${textBeforeCaret}${text.toUpperCase()}${textAfterCaret.toUpperCase()}` : `${textBeforeCaret}${text}${textAfterCaret}`;
    const carretPositionAfter = caretPosition + text.length;
    textArea.setSelectionRange(carretPositionAfter, carretPositionAfter);
  }
  textArea.focus();
}
// Backspace
const backspace = () => {
  const caretPosition = textArea.selectionEnd;
  const selectStart = textArea.selectionStart;
  const textLength = textArea.value.length;

  if (textArea.value.length !== selectStart && caretPosition === selectStart) {
    const textBeforeCaret = textArea.value.slice(0, selectStart - 1);
    const textAfterCaret = textArea.value.slice(caretPosition, textLength);
    textArea.value = `${textBeforeCaret}${textAfterCaret}`;
    textArea.setSelectionRange(selectStart - 1, selectStart - 1);
  }
  if (caretPosition !== selectStart) {
    const textBeforeCaret = textArea.value.slice(0, selectStart);
    const textAfterCaret = textArea.value.slice(caretPosition, textLength);
    textArea.value = `${textBeforeCaret}${textAfterCaret}`;
    textArea.setSelectionRange(selectStart, selectStart);
  }
  if (caretPosition === textLength) {
    textArea.value = textArea.value.substring(0, textArea.value.length - 1);
    textArea.setSelectionRange(selectStart - 1, selectStart - 1);
  }

  textArea.focus();
};

const del = () => {
  const caretPosition = textArea.selectionEnd;
  const selectStart = textArea.selectionStart;
  const textLength = textArea.value.length;

  if (textArea.value.length !== selectStart && caretPosition === selectStart) {
    const textBeforeCaret = textArea.value.slice(0, selectStart);
    const symbSliceAfter = caretPosition + 1;
    const textAfterCaret = textArea.value.slice(symbSliceAfter, textLength);
    textArea.value = `${textBeforeCaret}${textAfterCaret}`;
  }
  if (caretPosition !== selectStart) {
    const textBeforeCaret = textArea.value.slice(0, selectStart);
    const textAfterCaret = textArea.value.slice(caretPosition, textLength);
    textArea.value = `${textBeforeCaret}${textAfterCaret}`;
    textArea.setSelectionRange(selectStart, selectStart);
  }
  textArea.setSelectionRange(selectStart, selectStart);
  textArea.focus();
};

function createKeyIcons(iconName) {
  return `<i class="material-icons">${iconName}</i>`;
}

function getLang() {
  return `<span>${localStorage.getItem('lang') || 'en'}</span>`;
}

const toggleShift = (bool) => {
  shiftPress = bool;
  createKeys();
};

function keyLanguage() {
  keyLang = keyLang === 'en' ? 'ru' : 'en';
  localStorage.setItem('lang', keyLang);
  createKeys();
  capsLockStatus = false;
  textArea.focus();
}

const listenerKeyDown = (event) => {
  const pressedKey = keyCodes.indexOf(event.keyCode);
  const keyPressedCurrentValue = keyLayout[pressedKey];
  const keys = document.querySelectorAll('.keyboard__key');
  keys.forEach((el) => {
    const key = el.childElementCount >= 1 ? el.firstChild.innerText : el.innerText;
    const keyID = el.id;

    if (key === 'del' && keyPressedCurrentValue === key) {
      event.preventDefault();
      el.classList.add('keyboard__key--pressed');
      del();
    }
    if (key === 'keyboard_tab' && keyPressedCurrentValue === 'tab') {
      event.preventDefault();
      el.classList.add('keyboard__key--pressed');
      addText(' ');
      textArea.focus();
    }
    if (key === 'keyboard_return' && keyPressedCurrentValue === 'enter') {
      event.preventDefault();
      el.classList.add('keyboard__key--pressed');
      addText('\n');
      textArea.focus();
    }
    if (keyID === 'lshift' && event.code === 'ShiftLeft') {
      toggleShift(true);
      const lshift = document.querySelector('#lshift');
      lshift.classList.add('keyboard__key--pressed');
    }
    if (keyID === 'rshift' && event.code === 'ShiftRight') {
      toggleShift(true);
      const rshift = document.querySelector('#rshift');
      rshift.classList.add('keyboard__key--pressed');
    }
    if (key === 'alt' && event.code === 'AltLeft') {
      el.classList.add('keyboard__key--pressed');
      if (ctrlKeyPress) {
        keyLanguage();
        el.classList.add('keyboard__key--pressed');
        ctrlKeyPress = false;
      }
      event.preventDefault();
    }
    if (key === 'altgr' && event.code === 'AltRight') {
      event.preventDefault();
      el.classList.add('keyboard__key--pressed');
    }
    if (keyID === 'lctrl' && event.code === 'ControlLeft') {
      el.classList.add('keyboard__key--pressed');
      ctrlKeyPress = true;
    }

    if (keyID === 'rctrl' && event.code === 'ControlRight') {
      el.classList.add('keyboard__key--pressed');
    }

    if (key === 'backspace' && event.code === 'Backspace') {
      event.preventDefault();
      el.classList.add('keyboard__key--pressed');
      backspace();
    }
    if (key === 'keyboard_capslock' && keyPressedCurrentValue === 'caps') {
      el.classList.add('keyboard__key--pressed');
    }
    if (key === 'space_bar' && keyPressedCurrentValue === 'space') {
      event.preventDefault();
      el.classList.add('keyboard__key--pressed');
      addText(' ');
    }
    if (key === 'win' && event.code === 'MetaLeft') {
      event.preventDefault();
      el.classList.add('keyboard__key--pressed');
    } else if (key.toLowerCase() === keyPressedCurrentValue && !specialKeys.includes(key)) {
      el.classList.add('keyboard__key--pressed');
      addText(keyPressedCurrentValue);
      event.preventDefault();
    } else if (key === keyPressedCurrentValue && !specialKeys.includes(key)) {
      el.classList.add('keyboard__key--pressed');
      addText(keyPressedCurrentValue);
      event.preventDefault();
    }
  });
};


const listenerKeyUp = (event) => {
  const pressedKey = keyCodes.indexOf(event.keyCode);
  const keyPressedCurrentValue = keyLayout[pressedKey];
  const keys = document.querySelectorAll('.keyboard__key');
  keys.forEach((el) => {
    const key = el.childElementCount >= 1 ? el.firstChild.innerText : el.innerText;
    const keyID = el.id;
    if (keyID === 'lshift' && event.code === 'ShiftLeft') {
      el.classList.remove('keyboard__key--pressed');
      toggleShift(false);
      shiftPress = false;
      createKeys();
    } else if (keyID === 'rshift' && event.code === 'ShiftRight') {
      el.classList.remove('keyboard__key--pressed');
      toggleShift(false);
      shiftPress = false;
      createKeys();
    } else if (key === 'alt' && event.altKey) {
      el.classList.remove('keyboard__key--pressed');
    } else if (key === 'ctrl' && event.ctrlKey) {
      el.classList.remove('keyboard__key--pressed');
      ctrlKeyPress = false;
    } else if (key === 'keyboard_capslock' && keyPressedCurrentValue === 'caps') {
      el.classList.remove('keyboard__key--pressed');
      toggleCapsLock();
    } else {
      el.classList.remove('keyboard__key--pressed');
    }
  });
  event.preventDefault();
};

const toggleCapsLock = () => {
  document.removeEventListener('keydown', listenerKeyDown, false);
  document.removeEventListener('keyup', listenerKeyUp, false);
  capsLockStatus = !capsLockStatus;
  const caps = document.querySelector('#caps_lock');
  caps.classList.toggle('keyboard__key--inactive');
  caps.classList.toggle('keyboard__key--active');
  const keys = keyboard.querySelectorAll('.keyboard__key');
  keys.forEach((key) => {
    if (key.childElementCount === 0 && !specialKeys.includes(key.textContent)) {
      const keyTxt = capsLockStatus ? key.textContent.toUpperCase() : key.textContent.toLowerCase();
      // eslint-disable-next-line no-param-reassign
      key.textContent = keyTxt;
    }
  });

  document.addEventListener('keydown', listenerKeyDown, false);
  document.addEventListener('keyup', listenerKeyUp, false);
};

const keyCodes = [
  192, 49, 50, 51, 52, 53, 54, 55, 56, 57, 48, 189, 187, 8,
  9, 81, 87, 69, 82, 84, 89, 85, 73, 79, 80, 219, 221, 220, 46,
  20, 65, 83, 68, 70, 71, 72, 74, 75, 76, 186, 222, 13,
  16, 90, 88, 67, 86, 66, 78, 77, 188, 190, 38, 16,
  17, 91, 18, 32, 18, 37, 40, 39, 17,
];

const keyLayoutEn = [
  '`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'backspace',
  'tab', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']', '\\', 'del',
  'caps', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', '\'', 'enter',
  'lshift', 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', 'up', 'rshift',
  'lctrl', 'win', 'alt', 'space', 'altgr', 'left', 'down', 'right', 'rctrl', 'done',
];

const keyLayoutRu = [
  'ё', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'backspace',
  'tab', 'й', 'ц', 'у', 'к', 'е', 'н', 'г', 'ш', 'щ', 'з', 'х', 'ъ', '\\', 'del',
  'caps', 'ф', 'ы', 'в', 'а', 'п', 'р', 'о', 'л', 'д', 'ж', 'э', 'enter',
  'lshift', 'я', 'ч', 'с', 'м', 'и', 'т', 'ь', 'б', 'ю', 'up', 'rshift',
  'lctrl', 'win', 'alt', 'space', 'altgr', 'left', 'down', 'right', 'rctrl', 'done',
];

const keyLayoutSymRu = [
  'Ё', '!', '"', '№', ';', '%', ':', '?', '*', '(', ')', '_', '+', 'backspace',
  'tab', 'Й', 'Ц', 'У', 'К', 'Е', 'Н', 'Г', 'Ш', 'Щ', 'З', 'Х', 'Ъ', '|', 'del',
  'caps', 'Ф', 'Ы', 'В', 'А', 'П', 'Р', 'О', 'Л', 'Д', 'Ж', 'Э', 'enter',
  'lshift', 'Я', 'Ч', 'С', 'М', 'И', 'Т', 'Ь', 'Б', 'Ю', 'up', 'rshift',
  'lctrl', 'win', 'alt', 'space', 'altgr', 'left', 'down', 'right', 'rctrl', 'done',
];

const keyLayoutSymEn = [
  '~', '!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '_', '+', 'backspace',
  'tab', 'Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', '{', '}', '|', 'del',
  'caps', 'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', ':', '"', 'enter',
  'lshift', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', '<', '>', 'up', 'rshift',
  'lctrl', 'win', 'alt', 'space', 'altgr', 'left', 'down', 'right', 'rctrl', 'done',
];

const specialKeys = [
  'backspace', 'tab', 'del', 'caps', 'enter', 'lshift', 'done', 'up', 'rshift', 'ctrl', 'rctrl', 'lctrl', 'win', 'alt', 'space',
  'altgr', 'left', 'down', 'right', 'shift',
];

const editCaretPos = (direction) => {
  const currentPosCarret = textArea.selectionEnd;
  const posMinus = () => {
    textArea.focus();
    textArea.setSelectionRange(currentPosCarret - 1, currentPosCarret - 1);
    textArea.focus();
  };
  const posPlus = () => {
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
    default:
      break;
  }
};

function createKeys() {
  const fragment = document.createDocumentFragment();

  if (keyLang === 'en' && !shiftPress) {
    keyLayout = keyLayoutEn;
  }

  if (keyLang === 'ru' && !shiftPress) {
    keyLayout = keyLayoutRu;
  }

  if (keyLang === 'en' && shiftPress) {
    keyLayout = keyLayoutSymEn;
  }

  if (keyLang === 'ru' && shiftPress) {
    keyLayout = keyLayoutSymRu;
  }
  keyLayout.forEach((key) => {
    const keyEl = document.createElement('button');
    const insertLineBreak = ['f12', 'backspace', 'del', 'enter', 'rshift'].indexOf(key) !== -1;
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
        keyEl.addEventListener('click', () => {
          addText('up');
        });
        break;

      case 'down':
        keyEl.innerHTML = createKeyIcons('keyboard_arrow_down');
        keyEl.addEventListener('click', () => {
          addText('down');
        });
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
        keyEl.innerHTML = getLang();
        keyEl.addEventListener('click', () => {
          keyLanguage();
        });
        break;

      case 'lshift':
        keyEl.classList.add('keyboard__key');
        keyEl.classList.add('keyboard__key--wide');
        keyEl.id = 'lshift';
        keyEl.textContent = 'shift';
        keyEl.addEventListener('click', () => {
          keyLanguage();
        });
        break;

      case 'rshift':
        keyEl.classList.add('keyboard__key');
        keyEl.classList.add('keyboard__key--wide');
        keyEl.id = 'rshift';
        keyEl.textContent = 'shift';
        break;

      case 'del':
        keyEl.classList.add('keyboard__key');
        keyEl.textContent = key.toLowerCase();
        keyEl.addEventListener('click', () => {
          del();
        });
        break;

      case 'lctrl':
        keyEl.classList.add('keyboard__key');
        keyEl.id = 'lctrl';
        keyEl.textContent = 'ctrl';
        break;

      case 'rctrl':
        keyEl.classList.add('keyboard__key');
        keyEl.id = 'rctrl';
        keyEl.textContent = 'ctrl';
        break;

      default:
        keyEl.classList.add('keyboard__key');
        keyEl.textContent = key;
        if (!specialKeys.includes(key)) {
          keyEl.addEventListener('click', () => {
            addText(key);
          });
        }

        break;
    }


    fragment.appendChild(keyEl);
    if (insertLineBreak) {
      fragment.appendChild(document.createElement('br'));
    }
  });

  const keyboard = document.querySelector('.keyboard__keys');
  keyboard.innerHTML = '';
  keyboard.appendChild(fragment); // add object

  //------------------------------


  document.removeEventListener('keydown', listenerKeyDown, false);
  document.removeEventListener('keyup', listenerKeyUp, false);
  document.addEventListener('keydown', listenerKeyDown, false);
  document.addEventListener('keyup', listenerKeyUp, false);
}
createKeys();

const keyboard = document.querySelector('.keyboard__keys');

keyboard.addEventListener('mousedown', (event) => {
  const clickID = event.target.id;
  if (clickID === 'lshift') {
    toggleShift(true);
    textArea.focus();
    const lshift = document.querySelector('#lshift');
    lshift.classList.add('keyboard__key--pressed');
  }
  if (clickID === 'rshift') {
    event.target.classList.add('keyboard__key--pressed');
    toggleShift(true);
    textArea.focus();
    const rshift = document.querySelector('#rshift');
    rshift.classList.add('keyboard__key--pressed');
  }
});
keyboard.addEventListener('mouseup', (event) => {
  const clickID = event.target.id;
  if (clickID === 'lshift') {
    toggleShift(false);
  }
  if (clickID === 'rshift') {
    toggleShift(false);
  }
});
