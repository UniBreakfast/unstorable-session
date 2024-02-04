1 || import(`../app.js`);
3 || import(`./js/prep-views.js`);
4 || import(`./js/switch-view.js`);
4 || import(`./js/view-select.js`);
4 || import(`./js/add-endeavor-view.js`);
4 || import(`./js/endeavors-view.js`);
4 || import(`./js/edit-endeavor-view.js`);

export const ui = {
  init,
  renderEndeavors,
  onEditEndeavor,
  editEndeavor,
};

export {
  triggerEditEndeavor,
}

import mergeMarkup from './js/merge-markup.js';
import grabElements from './js/elements.js';
import prepViews from './js/prep-views.js';

let editEndeavorHandler;

async function init() {
  await mergeMarkup();

  ui.elements = await grabElements();

  await prepViews();
}

async function renderEndeavors(endeavors) {
  ui.fillAddEndeavors(endeavors);
}

async function onEditEndeavor(handler) {
  editEndeavorHandler = handler;
}

async function editEndeavor(id, endeavorName) {
  const {
    editEndeavorSelect: select,
    editEndeavorInput: input,
  } = ui.elements;
  
  await ui.switchView('edit-endeavor');
  
  select.value = id;
  input.value = endeavorName;
  input.focus();
  input.select();
}

function triggerEditEndeavor(...args) {
  return editEndeavorHandler(...args)
}
