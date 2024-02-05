export { ds as dataService, ds };

const ds = {
  init, on, getItems,
  add, update, remove,
  moveUp, moveDown, moveFirst, moveLast,
  restoreOrder, sort, reverse, shuffle,
};

const h = {}; // handlers

let itemsDict = {
  'i1': 'Alpha',
  'i2': 'Bravo',
  'i3': 'Charlie',
  'i4': 'Delta',
  'i5': 'Echo',
  'i6': 'Foxtrot',
  'i7': 'Golf',
  'i8': 'Hotel',
  'i9': 'India',
  'i10': 'Juliett',
  'i11': 'Kilo',
  'i12': 'Lima',
  'i13': 'Mike',
  'i14': 'November',
  'i15': 'Oscar',
  'i16': 'Papa',
  'i17': 'Quebec',
  'i18': 'Romeo',
  'i19': 'Sierra',
  'i20': 'Tango',
  'i21': 'Uniform',
  'i22': 'Victor',
  'i23': 'Whiskey',
  'i24': 'X-ray',
  'i25': 'Yankee',
  'i26': 'Zulu',
};

let lastId = 0;

function init() {
  actualizeLastId();
}

function on(eventName, handler) {
  h[eventName] = handler;
}

function getItems() {
  return itemsDict;
}

function add(text) {
  const id = ++lastId;

  itemsDict['i' + id] = text;

  h['change']?.();
}

function update(id, text) {
  if (!(id in itemsDict)) {
    throw new Error(`Item not found.`);
  }

  if (!text) {
    throw new Error(`Text should not be empty.`);
  }

  if (text === itemsDict[id]) {
    throw new Error(`Provided text is the same as it was.`);
  }

  itemsDict[id] = text;

  h['change']?.();
}

function remove(...ids) {
  if (!ids.length) {
    throw new Error(`No items to remove.`);
  }

  const missingIds = ids.filter(id => !(id in itemsDict));

  if (missingIds.length) {
    throw new Error(`Some items not found.`);
  }

  ids.forEach(id => delete itemsDict[id]);

  h['change']?.();
}

function rebuild(entries) {
  itemsDict = Object.fromEntries(entries);

  h['change']?.();
}

function moveItems(ids, calcMove) {
  if (!ids.length) {
    throw new Error(`Nothing to move.`);
  }

  const missingIds = ids.filter(id => !(id in itemsDict));

  if (missingIds.length) {
    throw new Error(`${ids.length > 1 ? 'Some items' : 'Item'} not found.`);
  }

  const entries = Object.entries(itemsDict);
  const indices = ids.map(id => entries.findIndex(([key]) => key === id));
  const movingEntries = indices.map(i => entries[i]);
  const rest = entries.filter((_, i) => !indices.includes(i));
  const i = calcMove(indices)

  rebuild(rest.toSpliced(i, 0, ...movingEntries));
}

function moveFirst(...ids) {
  moveItems(ids, indices => {
    if (Math.max(...indices) < ids.length) {
      throw new Error(`${ids.length > 1 ? 'Items are' : 'Item is'} at the top.`);
    }

    return 0;
  });
}

function moveLast(...ids) {
  moveItems(ids, indices => {
    if (Math.min(...indices) >= Object.keys(itemsDict).length - ids.length) {
      throw new Error(`${ids.length > 1 ? 'Items are' : 'Item is'} at the bottom.`);
    }

    return Infinity;
  });
}

function moveUp(...ids) {
  moveItems(ids, indices => {
    if (Math.max(...indices) < ids.length) {
      throw new Error(`${ids.length > 1 ? 'Items are' : 'Item is'} at the top.`);
    }

    return Math.min(...indices) - 1;
  });
}

function moveDown(...ids) {
  moveItems(ids, indices => {
    if (Math.min(...indices) >= Object.keys(itemsDict).length - ids.length) {
      throw new Error(`${ids.length > 1 ? 'Items are' : 'Item is'} at the bottom.`);
    }

    return Math.max(...indices) + 2 - ids.length;
  });
}

function restoreOrder() {
  rebuild(Object.entries(itemsDict).sort(([a], [b]) => a.slice(1) - b.slice(1)));
}

function sort() {
  rebuild(Object.entries(itemsDict).sort(([, a], [, b]) => a.localeCompare(b)));
}

function reverse() {
  rebuild(Object.entries(itemsDict).reverse());
}

function shuffle() {
  rebuild(Object.entries(itemsDict).sort(() => Math.random() - 0.5));
}

function actualizeLastId() {
  lastId = Math.max(...Object.keys(itemsDict).map(Number))
}
