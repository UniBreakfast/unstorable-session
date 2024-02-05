export {ms as markableSelect, ms};

import { itemSelect as is} from './is/is.js';
import { markBox as mb } from './mb/mb.js';

const { 
  on, count, fill, selectItem,
  getSelection, getMarked,
  unhide, hide, hideMarked, hideUnmarked, toggleHideAll,
  showMatched,
  update, remove, removeMarked,
  moveCurrentUp, moveCurrentDown, moveCurrentFirst, moveCurrentLast,
  moveMarkedUp, moveMarkedDown, moveMarkedFirst, moveMarkedLast,
  getItemText,
  restoreOrder, sort, reverse, shuffle,
} = is;

const ms = {
  init, on, count, fill, 
  getSelection, getMarked,
  markAll, unmarkAll, invertMark, selectItem,
  unhide, hide, hideMarked, hideUnmarked, toggleHideAll,
  showMatched,
  add, update, remove, removeMarked,
  moveCurrentUp, moveCurrentDown, moveCurrentFirst, moveCurrentLast,
  moveMarkedUp, moveMarkedDown, moveMarkedFirst, moveMarkedLast,
  getItemText,
  restoreOrder, sort, reverse, shuffle,
  experiment,
};

function experiment() {
  is.experiment();
}

function init() {
  is.init();
  is.empty();

  mb.on('toggle', is.toggleMark);
  is.on('select', () => mb.toggle(is.isMarked()));
}

function markAll() {
  is.markAll();
  if (is.isMarked()) mb.mark();
}

function unmarkAll() {
  is.unmarkAll();
  mb.unmark();
}

function invertMark() {
  is.invertMark();
  mb.toggle();
}

function add(text) {
  is.addBelow(text, text);
  is.select(text);
}
