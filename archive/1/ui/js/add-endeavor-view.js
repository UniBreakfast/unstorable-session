3 || import(`./prep-views.js`);

export { prepAddEndeavorView };

import { ui } from '../ui.js';
import provideFeedback from './feedback.js';

async function prepAddEndeavorView() {
  const {
    addEndeavorForm: form,
    addEndeavorOptionTemplate: option,
    addEndeavorBtn: btn,
  } = ui.elements;

  const { acknowledge, complain, report } = provideFeedback(btn);

  option.textContent = option.value = '';
  form.endeavors.innerHTML = '';

  ui.onAddEndeavor = onAddEndeavor;
  ui.fillAddEndeavors = fillAddEndeavors;

  function onAddEndeavor(addEndeavor) {
    form.onsubmit = handleAddEndeavor;

    async function handleAddEndeavor() {
      const name = form.endeavor.value;

      try {
        acknowledge(`Trying to add endeavor "${name}"...`);

        await addEndeavor({ name });

        report(`Endeavor "${name}" added successfully!`);

        form.endeavor.value = '';
      } catch (err) {
        complain(`Failed to add endeavor "${name}": ${err.message}`);
      }
    }
  }

  function makeOption(endeavor) {
    const { id, name } = endeavor;
    const newOption = option.cloneNode(true);

    newOption.value = id;
    newOption.textContent = name;

    return newOption;
  }

  function fillAddEndeavors(endeavors) {
    form.endeavors.replaceChildren(...endeavors.map(makeOption));
  }
}
