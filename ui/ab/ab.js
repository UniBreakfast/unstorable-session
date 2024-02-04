export {ab as actionBlock, ab};

import { actionSelect as as} from './as/as.js';
import { inputDetails as id } from './id/id.js';

const { getInput, setInput, on } = id;

const ab = {
  init, ready, on,
  getInput, setInput,
};

function init() {
  as.init();
  id.init();

  id.toggle(as.isInputHungry())

  as.on('select', () => id.toggle(as.isInputHungry()));
}

function ready() {
  if (!as.isInputHungry() || id.isOpen()) return true;

  id.open();
}
