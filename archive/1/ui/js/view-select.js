3 || import(`./prep-views.js`);

export { prepViewSelect, fillViewSelect };

import { ui } from '../ui.js';

let optionTemplate = null;

async function prepViewSelect() {
  const { viewForm } = ui.elements;

  optionTemplate = viewForm.view.options[0]
  optionTemplate.replaceChildren('<screen name>');
  optionTemplate.value = null;
    
  viewForm.onchange = () => {
    ui.switchView(viewForm.view.value);
  };
}

async function fillViewSelect() {
  const { viewForm, viewDict } = ui.elements;

  const options = Object.keys(viewDict).map(name => {
    const option = optionTemplate.cloneNode(true);

    option.text = name.replace(/-/g, ' ');
    option.value = name;

    return option;
  });

  viewForm.view.replaceChildren(...options);
}
