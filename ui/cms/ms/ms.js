export {ms as markableSelect, ms};

import { itemSelect as is} from './is/is.js';
import { markBox as mb } from './mb/mb.js';

const { 
  on, count, selectItem,
  unhide, hide, hideMarked, hideUnmarked, toggleHideAll,
  showMatched,
  update, remove, removeMarked,
  moveCurrentUp, moveCurrentDown, moveCurrentFirst, moveCurrentLast,
  moveMarkedUp, moveMarkedDown, moveMarkedFirst, moveMarkedLast,
  getItemText,
  restoreOrder, sort, reverse, shuffle,
} = is;

const ms = {
  init,
  on, count, markAll, unmarkAll, invertMark, selectItem,
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
  is.empty();
  is.addBelow('a1b2', 'Alfa');
  is.addBelow('c3d4', 'Bravo');
  is.addAbove('e5f6', 'Charlie');
  is.fill({'d1': 'Delta', 'e2': 'Echo', 'f3': 'Foxtrot', 'g4': 'Golf', 'h5': 'Hotel', 'i6': 'India'});
  is.select('e2');
}

function init() {
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
