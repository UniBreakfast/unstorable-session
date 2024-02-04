export { id as inputDetails, id };

import { actionDetails, input, inputBtn } from '../../elements.js';

const id = {
  init, on,
  toggle, open, isOpen,
  getInput, setInput,
};

const h = {}; // handlers

const [cross, arrow] = inputBtn.children;

let isInputHungry;

function init() {
  handleInput();

  actionDetails.ontoggle = handleToggle;
  input.oninput = input.onchange = handleInput;
  inputBtn.onclick = handleClick;
}

function toggle(hungry) {
  isInputHungry = hungry;

  if (hungry) {
    open();
    input.required = true;
  } else {
    input.required = false;
  }
}

function open() {
  actionDetails.open = true;
}

function isOpen() {
  return actionDetails.open;
}

function on(eventName, handler) {
  h[eventName] = handler;
}

function handleToggle() {
  input.required = isInputHungry && actionDetails.open;
}

function handleInput() {
  const isEmpty = !input.value;

  cross.hidden = isEmpty;
  arrow.hidden = !isEmpty;
}

function handleClick() {
  if (cross.hidden) {
    h['inputcopy']?.();
  } else {
    input.value = '';
  }

  handleInput();
}

function getInput() {
  return input.value;
}

function setInput(value) {
  input.value = value;

  handleInput();
}
