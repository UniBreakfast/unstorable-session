2 || import(`../ui.js`);

export default prepViews;

import { ui } from '../ui.js';
import { prepViewSelect, fillViewSelect }
  from './view-select.js';
import { prepAddEndeavorView }
  from './add-endeavor-view.js';
import { prepEndeavorsView }
  from './endeavors-view.js';
import { prepEditEndeavorView }
  from './edit-endeavor-view.js';
import switchView from './switch-view.js';

async function prepViews() {
  await prepViewSelect();
  await fillViewSelect();

  await Promise.all([
    prepAddEndeavorView(),
    prepEndeavorsView(),
    prepEditEndeavorView(),
  ]);

  ui.switchView = switchView;
}
