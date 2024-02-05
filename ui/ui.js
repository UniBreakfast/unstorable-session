export {ui as userInterface, ui};

import { body, form } from './elements.js';
import { countedMarkableSelect as cms } from './cms/cms.js';
import { actionBlock as ab } from './ab/ab.js';

const { 
  getSelection, getMarked,
  fill: fillItems, markAll, unmarkAll, invertMark,
  unhide, hide, hideMarked, hideUnmarked, toggleHideAll,
  remove, removeMarked,
  moveCurrentUp, moveCurrentDown, moveCurrentFirst, moveCurrentLast,
  moveMarkedUp, moveMarkedDown, moveMarkedFirst, moveMarkedLast,
  restoreOrder, sort, reverse, shuffle,
} = cms;

const { getInput } = ab;

const ui = {
  init, show, on, fillItems, getSelection, getInput, getMarked,
  markAll, unmarkAll, invertMark, selectRequestedItem,
  unhide, hide, hideMarked, hideUnmarked, toggleHideAll,
  showBySubstring, showByRegEx,
  addItem, updateItem, remove, removeMarked,
  moveCurrentUp, moveCurrentDown, moveCurrentFirst, moveCurrentLast,
  moveMarkedUp, moveMarkedDown, moveMarkedFirst, moveMarkedLast,
  restoreOrder, sort, reverse, shuffle,
  experiment,
  fillInput,
};

const h = {}; // handlers

function show() {
  body.hidden = false;
}

function init() {
  cms.init();
  ab.init();

  form.onsubmit = handleSubmit;

  ab.on('inputcopy', () => h['inputcopy']?.());
}

function experiment() {
  cms.experiment();
}

function on(eventName, handler) {
  h[eventName] = handler;
}

function fillInput() {
  ab.setInput(cms.getItemText());
}

function selectRequestedItem() {
  cms.selectItem(getInput());
}

function showBySubstring() {
  const str = getInput();
  
  cms.showMatched(text => text.includes(str));
}

function showByRegEx() {
  const regex = new RegExp(getInput(), 'i');

  cms.showMatched(text => regex.test(text));
}

function addItem() {
  cms.add(getInput());
}

function updateItem() {
  cms.update(getInput());
}

function handleSubmit(e) {
  e.preventDefault();

  if (!ab.ready()) return;

  const action = form.action.value;

  switch (action) {
    case 'mark': return h['markall']?.();
    case 'unmark': return h['unmarkall']?.();
    case 'invert-mark': return h['invertmark']?.();
    case 'select': return h['findselect']?.();
    case 'hide-one': return h['hide']?.();
    case 'hide-marked': return h['hidemarked']?.();
    case 'hide-unmarked': return h['hideunmarked']?.();
    case 'all': return h['showall']?.();
    case 'match': return h['matchtext']?.();
    case 'regex': return h['matchregex']?.();
    case 'invert-show': return h['invertshow']?.();
    case 'add': return h['add']?.();
    case 'edit': return h['update']?.();
    case 'remove-one': return h['remove']?.();
    case 'remove-marked': return h['removemarked']?.();
    case 'one-up': return h['currentup']?.();
    case 'one-down': return h['currentdown']?.();
    case 'one-top': return h['currentfirst']?.();
    case 'one-bottom': return h['currentlast']?.();
    case 'marked-up': return h['markedup']?.();
    case 'marked-down': return h['markeddown']?.();
    case 'marked-top': return h['markedfirst']?.();
    case 'marked-bottom': return h['markedlast']?.();
    case 'order': return h['order']?.();
    case 'sort': return h['sort']?.();
    case 'reverse': return h['reverse']?.();
    case 'shuffle': return h['shuffle']?.();
  }
}
