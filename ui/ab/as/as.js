export {as as actionSelect, as};

import { actionSelect as s} from '../../elements.js';

const as = {
  init, on,
  isInputHungry,
};

const h = {}; // handlers

let o = s.selectedOptions[0];

function init() {
  s.onchange = handleChange;
}

function on(eventName, handler) {
  h[eventName] = handler;
}

function isInputHungry() {
  return o.hasAttribute('data-in');
}

function handleChange() {
  o = s.selectedOptions[0];
  h['select']?.();
}
