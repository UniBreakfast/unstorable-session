3 || import(`./prep-views.js`);

export { prepEndeavorsView };

import { ui, triggerEditEndeavor } from '../ui.js';
import provideFeedback from './feedback.js';

async function prepEndeavorsView() {
  const {
    endeavorsForm: form,
    endeavorsOptionTemplate: option,
    performEndeavorsBtn: btn,
  } = ui.elements;

  const { acknowledge, complain, report } = provideFeedback(btn);

  let removeEndeavor;

  option.textContent = option.value = '';

  ui.fillEndeavors = fillEndeavors;
  ui.onRemoveEndeavor = onRemoveEndeavor;

  form.onsubmit = handleSubmit;

  async function handleSubmit() {
    const action = form.action.value

    if (action == 'edit') {
      await handleEdit()
    } else if (action == 'remove' && removeEndeavor) {
      await handleRemove()
    } else if (action =='duplicate') {
      await handleDuplicate()
    }
  }
  
  function onRemoveEndeavor(handler) {
    removeEndeavor = handler;
  }

  function makeOption(endeavor) {
    const { id, name } = endeavor;
    const newOption = option.cloneNode(true);

    newOption.value = id;
    newOption.textContent = name;

    return newOption;
  }

  function fillEndeavors(endeavors) {
    form.endeavor.replaceChildren(...endeavors.map(makeOption));
  }
}
