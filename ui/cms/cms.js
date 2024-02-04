export {cms as countedMarkableSelect, cms};

import { markableSelect as ms } from './ms/ms.js';
import { countDetails as cd } from './cd/cd.js';

const { 
  markAll, unmarkAll, invertMark, selectItem, 
  unhide, hide, hideMarked, hideUnmarked, toggleHideAll,
  showMatched,
  add, update, remove, removeMarked,
  moveCurrentUp, moveCurrentDown, moveCurrentFirst, moveCurrentLast,
  moveMarkedUp, moveMarkedDown, moveMarkedFirst, moveMarkedLast,
  getItemText,
  restoreOrder, sort, reverse, shuffle,
} = ms;

const cms = {
  init,
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
  ms.experiment();
}

function init() {
  cd.init();
  ms.init();

  ms.on('countchange', () => cd.update(ms.count()));
}
