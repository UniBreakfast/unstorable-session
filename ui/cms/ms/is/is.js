export { is as itemSelect, is };

import { itemSelect as s } from '../../../elements.js';

const is = {
  init, on, count, getSelection, getMarked,
  empty, addAbove, addBelow, fill, select, selectItem,
  toggleMark, isMarked, markAll, unmarkAll, invertMark,
  unhide, hide, hideMarked, hideUnmarked, toggleHideAll,
  showMatched,
  update, remove, removeMarked,
  moveCurrentUp, moveCurrentDown, moveCurrentFirst, moveCurrentLast,
  moveMarkedUp, moveMarkedDown, moveMarkedFirst, moveMarkedLast,
  getItemText,
  restoreOrder, sort, reverse, shuffle,
  experiment,
};

const h = {}; // handlers

const markPrefix = '', markSuffix = ' ✓';

let options = [...s];
let optionDict, textDict;
let o = s.selectedOptions[0];

function experiment() {
  
}

function init() {
  updateDictionary();

  s.onchange = handleChange;
}

function on(eventName, handler) {
  h[eventName] = handler;
}

function count() {
  const total = options.length;
  const marked = options.filter(o => o.hasAttribute('data-mark')).length;
  const hidden = options.filter(o => o.hidden).length;
  const shown = total - hidden;

  return { marked, shown, hidden, total };
}

function getSelection() {
  return s.value;
}

function getMarked() {
  return options.filter(o => o.hasAttribute('data-mark')).map(o => o.value);
}

function empty() {
  s.replaceChildren();
  options = [];
  optionDict = {};
  o = null;

  h['countchange']?.();
}

function createOption(value, text) {
  const option = document.createElement('option');

  option.value = value;
  option.text = text;

  return option;
}

function addBelow(value, text) {
  const option = createOption(value, text);

  options.push(option);
  textDict[value] = text;
  optionDict[value] = option;
  s.add(option);

  o ||= option;

  h['countchange']?.();

  return option;
}

function addAbove(value, text) {
  const option = createOption(value, text);

  options.unshift(option);
  textDict[value] = text;
  optionDict[value] = option;
  s.prepend(option);

  o ||= option;

  h['countchange']?.();

  return option;
}

function fill(items) {
  const readyDict = optionDict || {};
  const value = s.value;

  empty();

  for (const key in items) {
    options.push(readyDict[key] || createOption(key, items[key]));
  }

  s.append(...options);
  updateDictionary();

  
  select(value);

  h['countchange']?.();
}

function select(value) {
  if (arguments.length) {
    const option = optionDict[value];

    if (!option) return select();

    s.value = value;
    o = option;
    o.hidden = false;

    h['countchange']?.();

  } else if ((!o || o.hidden || o.value != s.value) && options.length) {
    const nextOptions = options.slice(options.indexOf(o) + 1)
      .concat(options.slice(0, options.indexOf(o)).reverse());
    const nextOption = nextOptions.find(o => !o.hidden);

    if (!nextOption) {
      s.value = '';
      o = null;

    } else {
      o = nextOption;
      s.value = o.value;
    }
  }

  h['select']?.();
}

function selectItem(text) {
  const option = options.find(o => textDict[o.value] == text);

  if (option) select(option.value);
}

function mark() {
  if (!o || o.hasAttribute('data-mark')) return;

  o.setAttribute('data-mark', '');
  o.text = markPrefix + o.text + markSuffix;

  h['countchange']?.();
}

function unmark() {
  if (!o || !o.hasAttribute('data-mark')) return;

  o.removeAttribute('data-mark');
  o.text = textDict[o.value];

  h['countchange']?.();
}

function toggleMark(marked) {
  if (arguments.length) marked ? mark() : unmark();
  else if (o) o.hasAttribute('data-mark') ? unmark() : mark();
}

function markAll() {
  for (const o of options) {
    if (!o.hasAttribute('data-mark') && !o.hidden) {
      o.setAttribute('data-mark', '');
      o.text = markPrefix + o.text + markSuffix;
    }
  }

  h['countchange']?.();
}

function unmarkAll() {
  for (const o of options) {
    if (o.hasAttribute('data-mark')) {
      o.removeAttribute('data-mark');
      o.text = textDict[o.value];
    }
  }

  h['countchange']?.();
}

function invertMark() {
  for (const o of options) {
    if (o.hasAttribute('data-mark')) {
      o.removeAttribute('data-mark');
      o.text = textDict[o.value];
    } else {
      o.setAttribute('data-mark', '');
      o.text = markPrefix + o.text + markSuffix;
    }
  }

  h['countchange']?.();
}

function unhide() {
  for (const o of options) o.hidden = false;

  select();

  h['countchange']?.();
}

function hide() {
  if (!o) return;

  o.hidden = true;
  o.removeAttribute('data-mark');
  o.text = textDict[o.value];

  select();

  h['countchange']?.();
}

function hideMarked() {
  for (const o of options) {
    if (o.hasAttribute('data-mark')) {
      o.hidden = true;
      o.removeAttribute('data-mark');
      o.text = textDict[o.value];
    }
  }
  select();

  h['countchange']?.();
}

function hideUnmarked() {
  for (const o of options) {
    if (!o.hasAttribute('data-mark')) {
      o.hidden = true;
    } else {
      o.removeAttribute('data-mark');
      o.text = textDict[o.value];
    }
  }
  select();

  h['countchange']?.();
}

function toggleHideAll() {
  const hiddenOptions = options.filter(o => o.hidden);

  if (!hiddenOptions.length) return;

  if (hiddenOptions.length == options.length) return unhide();

  markAll();
  unhide();
  hideMarked();
}

function showMatched(predicate) {
  for (const o of options) {
    o.hidden = !predicate(textDict[o.value]);
  }

  select();

  h['countchange']?.();
}

function update(text) {
  if (!o) return;

  o.text = text;
  textDict[o.value] = text;
}

function remove() {
  if (!o) return;

  const index = options.indexOf(o);

  options.splice(index, 1);
  o.remove();
  delete textDict[o.value];
  delete optionDict[o.value];

  select();

  h['countchange']?.();
}

function removeMarked() {
  for (let i = options.length - 1; i >= 0; i--) {
    const o = options[i];

    if (o.hasAttribute('data-mark')) {
      options.splice(i, 1);
      o.remove();

      delete textDict[o.value];
      delete optionDict[o.value];
    }
  }
  if (!document.contains(o)) o = null;

  select();

  h['countchange']?.();
}

function moveCurrentUp() {
  if (!o) return;

  let prevOption;

  while (!prevOption || prevOption.hidden) {
    prevOption = o.previousElementSibling;

    if (!prevOption) return;
  }

  o.after(prevOption);
}

function moveCurrentDown() {
  if (!o) return;

  let nextOption;

  while (!nextOption || nextOption.hidden) {
    nextOption = o.nextElementSibling;

    if (!nextOption) return;
  }

  o.before(nextOption);
}

function moveCurrentFirst() {
  if (!o) return;

  s.prepend(o);
}

function moveCurrentLast() {
  if (!o) return;

  s.add(o);
}

function moveMarkedUp() {
  const markedOptions = s.querySelectorAll('[data-mark]');

  if (!markedOptions.length) return;

  const firstMarked = markedOptions[0];
  let prevOption;

  while (!prevOption || prevOption.hidden) {
    prevOption = firstMarked.previousElementSibling;

    if (!prevOption) return s.prepend(...markedOptions);
  }

  prevOption.before(...markedOptions);
}

function moveMarkedDown() {
  const markedOptions = s.querySelectorAll('[data-mark]');

  if (!markedOptions.length) return;

  const lastMarked = markedOptions[markedOptions.length - 1];
  let nextOption;

  while (!nextOption || nextOption.hidden) {
    nextOption = lastMarked.nextElementSibling;

    if (!nextOption) return s.append(...markedOptions);
  }

  nextOption.after(...markedOptions);
}

function moveMarkedFirst() {
  const markedOptions = s.querySelectorAll('[data-mark]');

  if (!markedOptions.length) return;

  s.prepend(...markedOptions);
}

function moveMarkedLast() {
  const markedOptions = s.querySelectorAll('[data-mark]');

  if (!markedOptions.length) return;

  s.append(...markedOptions);
}

function isMarked() {
  return o && o.hasAttribute('data-mark') || false;
}

function handleChange() {
  o = s.selectedOptions[0];
  h['select']?.();
}

function getItemText() {
  return textDict[o?.value] || '';
}

function restoreOrder() {
  options.sort((a, b) => a.value.localeCompare(b.value));

  s.append(...options);
}

function sort() {
  options.sort((a, b) => textDict[a.value].localeCompare(textDict[b.value]));

  s.append(...options);
}

function reverse() {
  options.reverse();

  s.append(...options);
}

function shuffle() {
  for (let i = options.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));

    [options[i], options[j]] = [options[j], options[i]];
  }

  s.append(...options);
}

function updateDictionary() {
  textDict = Object.fromEntries(options.map(o => [o.value, o.text]));
  optionDict = Object.fromEntries(options.map(o => [o.value, o]));
}
