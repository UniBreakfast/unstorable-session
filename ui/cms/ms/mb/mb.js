export {mb as markBox, mb};

import {markBox as b} from '../../../elements.js';

const mb = {
  mark, unmark, toggle,
  on,
};

const h = {}; // handlers

b.onchange = handleChange;

function mark() {
  b.checked = true;
}

function unmark() {
  b.checked = false;
}

function toggle(marked) {
  if (arguments.length) b.checked = marked;
  else b.checked = !b.checked;
}

function on(eventName, handler) {
  h[eventName] = handler;
}

function handleChange() {
  h['toggle']?.(b.checked);
}
