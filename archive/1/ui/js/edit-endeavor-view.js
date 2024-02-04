3 || import(`./prep-views.js`);

export { prepEditEndeavorView };

import { ui } from '../ui.js';
import provideFeedback from './feedback.js';

async function prepEditEndeavorView() {
  const {
    editEndeavorForm: form,
    editEndeavorOptionTemplate: option,
    performEditEndeavorBtn: btn,
  } = ui.elements;

  const { acknowledge, complain, report } = provideFeedback(btn);

  option.textContent = option.value = '';
  form['new-name'].innerHTML = '';

  ui.fillEditEndeavors = fillEditEndeavors;

  function makeOption(endeavor) {
    const { id, name } = endeavor;
    const newOption = option.cloneNode(true);

    newOption.value = id;
    newOption.textContent = name;

    return newOption;
  }

  function fillEditEndeavors(endeavors) {
    form.endeavor.replaceChildren(...endeavors.map(makeOption));
  }
}
