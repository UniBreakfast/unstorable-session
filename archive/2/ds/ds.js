1 || import(`../app.js`);

export {ds as dataService, ds};

import {items as data} from './js/items.js';
let items = data;

let handleChange, handleAdd, handleMove;

const ds = {
  init, getItems, addItem, removeItem,
  onChangeTrigger, onAddTrigger, onMoveTrigger,
  moveItemUp, moveItemDown, moveItemTop, moveItemBottom,
};

async function init() {
  items = await data;
}

async function getItems() {
  return items;
}

function addItem(item) {
  if (items.includes(item)) {
    handleAdd?.(item);
    
    throw new Error(`Item "${item}" already exists!`);
  }
  
  items.push(item);

  handleChange?.(items);
  handleAdd?.(item);
}

function removeItem(item) {
  if (!item) {
    throw new Error(`Nothing to remove!`);
  }
  
  const index = items.indexOf(item);

  if (index === -1) {
    throw new Error(`Item "${item}" does not exist!`);
  }

  items.splice(index, 1);

  handleChange?.(items);
}

function onChangeTrigger(handler) {
  handleChange = handler;
}

function onAddTrigger(handler) {
  handleAdd = handler;
}

function onMoveTrigger(handler) {
  handleMove = handler;
}

function moveItemUp(item) {
  const i = items.indexOf(item);

  if (i === -1) {
    throw new Error(`Item "${item}" does not exist!`);
  }

  if (i === 0) throw new Error(`Item "${item}" already at the top!`);

  items.splice(i - 1, 0, ...items.splice(i, 1));

  handleChange?.(items);
  handleMove?.(item);

  return items[i];
}

function moveItemDown(item) {
  const i = items.indexOf(item);

  if (i === -1) {
    throw new Error(`Item "${item}" does not exist!`);
  }

  if (i === items.length - 1) throw new Error(`Item "${item}" already at the bottom!`);

  items.splice(i + 1, 0, ...items.splice(i, 1));

  handleChange?.(items);
  handleMove?.(item);

  return items[i];
}

function moveItemTop(item) {
  const i = items.indexOf(item);

  if (i === -1) {
    throw new Error(`Item "${item}" does not exist!`);
  }

  if (i === 0) throw new Error(`Item "${item}" already at the top!`);

  items.unshift(...items.splice(i, 1));

  handleChange?.(items);
  handleMove?.(item);
}

function moveItemBottom(item) {
  const i = items.indexOf(item);

  if (i === -1) {
    throw new Error(`Item "${item}" does not exist!`);
  }

  if (i === items.length - 1) throw new Error(`Item "${item}" already at the bottom!`);

  items.push(...items.splice(i, 1));

  handleChange?.(items);
  handleMove?.(item);
}
