1 || import(`../app.js`);

export { ui as userInterface, ui };

import { aquireElements } from './js/elements.js';

let handleSelect, handleMark, handlerClear,
  handleRelevance, handleFind, handleSearch,
  handleAdd, handleRemove,
  handleUp, handleDown, handleTop, handleBottom;

const ui = {
  init, show, getAction,
  fillItems, selectItemIf, filterItems,
  onItemSelectTrigger, onBoxTrigger, onClearTrigger,
  onActionSelectTrigger,
  onFindTrigger, onSearchTrigger, onAddTrigger, onRemoveTrigger,
  onUpTrigger, onDownTrigger, onTopTrigger, onBottomTrigger,
  updateMark, toggleMark, clearValInput,
  updateRelevance,
};

const relevance = {
  select: ['find', 'search', 'remove', 'up', 'down', 'top', 'bottom', 'mark'],
  input: ['find', 'search', 'add'],
};

let allItems = [];
let markedItems = [];

function init() {
  aquireElements(ui)

  const { form, clearBtn } = ui.elements;

  clearBtn.onclick = () => handlerClear?.();
  form.onsubmit = handleSubmit;
}

function show() {
  body.hidden = false
}

function fillItems(items) {
  const { itemSelect } = ui.elements;
  const options = items.map(makeOpt);

  allItems = items;
  itemSelect.replaceChildren(...options);

  handleSelect?.(options[0]?.classList.contains('marked'));

  markedItems = markedItems.filter(item => items.includes(item));
}

function makeOpt(item) {
  const opt = document.createElement('option');

  opt.text = opt.value = item;
  if (markedItems.includes(item)) {
    opt.classList.add('marked');
    opt.text += ' ✓';
  }

  return opt;
}

function filterItems(partial) {
  const { itemSelect, itemSelect: {options} } = ui.elements;
  let matchesCount = 0;
  const item = getItem();
  const current = getItemOption(item);
  let first;

  for (const option of options) {
    const matches = option.value.includes(partial);

    if (matches) first ??= option;
    option.hidden = !matches;
    matchesCount += matches;
  }

  if (!current || current.hidden) {
    if (first) itemSelect.value = first.value;
    else itemSelect.value = '';
  }

  updateMark();

  return {
    matches: matchesCount, 
    count: options.length, 
    rest: options.length - matchesCount, 
  };
}

function getItem() {
  const { itemSelect } = ui.elements;

  return itemSelect.value;
}

function getAction() {
  const { actSelect } = ui.elements;

  return actSelect.value;
}

function onItemSelectTrigger(handler) {
  handleSelect = handler;

  const { itemSelect } = ui.elements;

  itemSelect.onchange = () => {
    const item = itemSelect.value;
    const option = getItemOption(item);
    const marked = option.classList.contains('marked');

    handleSelect?.(marked);
  }
}

function onBoxTrigger(handler) {
  handleMark = handler;
}

function onClearTrigger(handler) {
  handlerClear = handler;
}

function onActionSelectTrigger(handler) {
  handleRelevance = handler;

  const { actSelect } = ui.elements;

  actSelect.onchange = () => handleRelevance?.(actSelect.value);
}

function onFindTrigger(handler) {
  handleFind = handler;
}

function onSearchTrigger(handler) {
  handleSearch = handler;
}

function onAddTrigger(handler) {
  handleAdd = handler;

  const { markBox } = ui.elements;

  markBox.onchange = () => handleMark?.(getItem(), markBox.checked);
}

function onRemoveTrigger(handler) {
  handleRemove = handler;
}

function onUpTrigger(handler) {
  handleUp = handler;
}

function onDownTrigger(handler) {
  handleDown = handler;
}

function onTopTrigger(handler) {
  handleTop = handler;
}

function onBottomTrigger(handler) {
  handleBottom = handler;
}

function updateMark(marked) {
  const { itemSelect, markBox } = ui.elements;

  if (marked === undefined) {
    const item = getItem();
    const option = getItemOption(item);
    marked = option?.classList.contains('marked');
  }

  itemSelect.classList.toggle('marked', marked);
  markBox.checked = marked;
}

function toggleMark(item, marked) {
  const { itemSelect } = ui.elements;
  const option = getItemOption(item);

  if (!option) return;

  if (marked) {
    markedItems.push(item);
    option.innerText = `${item} ✓`;
  } else {
    const i = markedItems.indexOf(item);
    if (i >= 0) markedItems.splice(i, 1);
    option.innerText = item;
  }

  option.classList.toggle('marked', marked);

  if (itemSelect.value === item) {
    ui.elements.markBox.checked = marked;
    itemSelect.classList.toggle('marked', marked);
  }
}

function clearValInput() {
  const { itemInput } = ui.elements;

  itemInput.value = '';
}

function updateRelevance(action) {
  const { itemSelect, itemInput } = ui.elements;
  const selectRelevant = relevance.select.includes(action);
  const inputRelevant = relevance.input.includes(action);

  itemSelect.parentElement.classList.toggle('irrelevant', !selectRelevant);
  itemInput.parentElement.classList.toggle('irrelevant', !inputRelevant);

  itemInput[inputRelevant ? 'removeAttribute' : 'setAttribute']('form', null);
}

function handleSubmit() {
  switch (getAction()) {
    case 'find': return performHandleFind();
    case 'search': return performHandleSearch();
    case 'add': return performHandleAdd();
    case 'remove': return performHandleRemove();
    case 'up': return performHandleUp();
    case 'down': return performHandleDown();
    case 'top': return performHandleTop();
    case 'bottom': return performHandleBottom();
  }
}

function performHandleFind() {
  if (!handleFind) return;

  const { itemInput, details, hintNote } = ui.elements;
  const item = itemInput.value;

  try {
    handleFind(item);

    details.style.color = 'green';
    hintNote.textContent = `Item "${item}" found and selected successfully.`;

  } catch (err) {
    details.style.color = 'red';
    hintNote.textContent = err.message;
  }

  details.open = true;
}

function performHandleSearch() {
  if (!handleSearch) return;

  const { itemInput, details, hintNote } = ui.elements;
  const item = itemInput.value;

  try {
    const {matches, count, rest} = handleSearch(item);

    details.style.color = 'green';
    hintNote.textContent = !matches ? `No matches. ${rest} items are hidden.` :
    `${matches} items out of ${count} do match.${rest ? ` Rest ${rest} items are hidden.` : ''}`;

  } catch (err) {
    details.style.color = 'red';
    hintNote.textContent = err.message;
  }

  details.open = true;
}

function performHandleAdd() {
  if (!handleAdd) return;

  const { itemInput, feedbackDetails, feedbackNote } = ui.elements;
  const item = itemInput.value;

  try {
    handleAdd(item);
    clearValInput();

    feedbackDetails.style.color = 'green';
    feedbackNote.textContent = `Item "${item}" added successfully.`;

  } catch (err) {
    feedbackDetails.style.color = 'red';
    feedbackNote.textContent = err.message;
  }

  feedbackDetails.open = true;
}

function performHandleRemove() {
  if (!handleRemove) return;

  const { details, hintNote } = ui.elements;
  const item = getItem();

  try {
    handleRemove(item);

    details.style.color = 'green';
    hintNote.textContent = `Item "${item}" removed successfully.`;

  } catch (err) {
    details.style.color = 'red';
    hintNote.textContent = err.message;
  }

  details.open = true;
}

function performHandleUp() {
  if (!handleUp) return;

  const { details, hintNote } = ui.elements;
  const item = getItem();

  try {
    const otherItem = handleUp(item);

    details.style.color = 'green';
    hintNote.textContent = `Item "${item}" moved up successfully. Switched with "${otherItem}".`;

  } catch (err) {
    details.style.color = 'red';
    hintNote.textContent = err.message;
  }

  details.open = true;
}

function performHandleDown() {
  if (!handleDown) return;

  const { details, hintNote } = ui.elements;
  const item = getItem();

  try {
    const otherItem = handleDown(item);

    details.style.color = 'green';
    hintNote.textContent = `Item "${item}" moved down successfully. Switched with "${otherItem}".`;

  } catch (err) {
    details.style.color = 'red';
    hintNote.textContent = err.message;
  }

  details.open = true;
}

function performHandleTop() {
  if (!handleTop) return;

  const { details, hintNote } = ui.elements;
  const item = getItem();

  try {
    handleTop(item);

    details.style.color = 'green';
    hintNote.textContent = `Item "${item}" moved to top successfully.`;

  } catch (err) {
    details.style.color = 'red';
    hintNote.textContent = err.message;
  }

  details.open = true;
}

function performHandleBottom() {
  if (!handleBottom) return;

  const { details, hintNote } = ui.elements;
  const item = getItem();

  try {
    handleBottom(item);

    details.style.color = 'green';
    hintNote.textContent = `Item "${item}" moved to bottom successfully.`;

  } catch (err) {
    details.style.color = 'red';
    hintNote.textContent = err.message;
  }

  details.open = true;
}

function selectItemIf(item, action) {
  const { itemSelect } = ui.elements;

  if (getAction() !== action) return;

  const option = getItemOption(item);

  if (!option) {
    throw new Error(`Item "${item}" not found!`);
  }

  itemSelect.value = item;
}

function getItemOption(item) {
  const { itemSelect } = ui.elements;

  return itemSelect.querySelector(`[value="${item}"]`);
}
