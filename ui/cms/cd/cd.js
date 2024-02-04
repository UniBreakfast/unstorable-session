export { cd as countDetails, cd };

import {
  countDetails,
  markedCountSpan, shownCountSpan, hiddenCountSpan, totalCountSpan,
  markedCounter, shownCounter, hiddenCounter, totalCounter,
  totalWordSpan,
} from '../../elements.js';

const cd = {
  init, update,
};

let lastHiddenCount = 0;

function init() {
  clear();
}

function clear() {
  markedCountSpan.hidden = true;
  shownCountSpan.hidden = true;
  hiddenCountSpan.hidden = true;
  totalCountSpan.hidden = true;
}

function update(countData) {
  const { marked, shown, hidden, total } = countData;

  if (marked) {
    markedCountSpan.hidden = false;
    markedCounter.textContent = marked;
  } else {
    markedCountSpan.hidden = true;
  }

  if (hidden) {
    shownCountSpan.hidden = false;
    shownCounter.textContent = shown;
    hiddenCountSpan.hidden = false;
    hiddenCounter.textContent = hidden;

    if (lastHiddenCount < hidden) {
      countDetails.open = true;

      lastHiddenCount = hidden;
    }
  } else {
    shownCountSpan.hidden = true;
    hiddenCountSpan.hidden = true;
  }

  totalCountSpan.hidden = false;
  totalCounter.textContent = total;

  if (marked || hidden) {
    totalWordSpan.textContent = 'total';
  } else {
    totalWordSpan.textContent = total === 1 ? 'item' : 'items';
  }
}
