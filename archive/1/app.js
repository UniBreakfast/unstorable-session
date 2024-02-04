0 && import(`./index.html`);

import { ui } from './ui/ui.js';
import { ds } from './ds/ds.js';

main();

async function main() {
  await Promise.all([ui.init(), ds.init()]);

  await ui.switchView(null);
  await ui.switchView('edit-endeavor');

  ui.onAddEndeavor(ds.addEndeavor);
  ds.onEndeavorsChange(ui.renderEndeavors);

  ui.onEditEndeavor(ui.editEndeavor);
  ui.onRemoveEndeavor(ds.removeEndeavor);
  ui.onDuplicateEndeavor(ds.duplicateEndeavor);
}
