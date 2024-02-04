export {
  body, form, 
  itemSelect, markBox, countDetails, actionDetails, feedbackDetails,
  markedCountSpan, shownCountSpan, hiddenCountSpan, totalCountSpan,
  markedCounter, shownCounter, hiddenCounter, totalCounter, totalWordSpan,
  actionSelect, input, inputBtn,
};

const { body } = document;
const [form] = document.forms;
const [countDetails, actionDetails, feedbackDetails] = form.querySelectorAll('details');
const [markedCountSpan, shownCountSpan, hiddenCountSpan, totalCountSpan] = countDetails.querySelectorAll('details>span');
const [markedCounter, shownCounter, hiddenCounter, totalCounter, totalWordSpan] = countDetails.querySelectorAll('span>span');
const [itemSelect, actionSelect] = form.querySelectorAll('select');
const input = actionDetails.querySelector('input');
const inputBtn = actionDetails.querySelector('button');
const markBox = form.mark;
