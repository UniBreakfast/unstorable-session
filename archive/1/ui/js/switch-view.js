3 || import(`./prep-views.js`);

export default switchView;

import { ui } from '../ui.js';
import provideFeedback from './feedback.js';

let currentView = null;

async function switchView(viewName) {
  const { viewForm, viewDict } = ui.elements;

  if (viewName === null) {
    currentView = null;

    for (const view of Object.values(viewDict)) {
      view.hidden = true;
    }

    return;
  }

  const view = viewDict[viewName];

  if (!view) {
    throw new Error(`No view named "${viewName}"`);
  }

  if (currentView) {
    currentView.hidden = true;
    provideFeedback.switchBoard.forEach((view, turnOff) => {
      if (view === currentView) turnOff();
    });
  }

  view.hidden = false;
  currentView = view;

  viewForm.view.value = viewName;
}
