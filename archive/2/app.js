0 && import(`./index.html`);

import {userInterface as ui} from './ui/ui.js';
import {dataService as ds} from './ds/ds.js';

start();

async function start() {
  await Promise.all([ui.init(), ds.init()]);
  await ds.getItems().then(ui.fillItems);

  ui.show();
  ui.updateRelevance(ui.getAction());

  ui.onItemSelectTrigger(ui.updateMark);
  ui.onBoxTrigger(ui.toggleMark);
  ui.onClearTrigger(ui.clearValInput);
  ui.onActionSelectTrigger(ui.updateRelevance);

  ui.onFindTrigger(item => ui.selectItemIf(item, 'find'));
  ui.onSearchTrigger(ui.filterItems);
  ui.onAddTrigger(ds.addItem);
  ui.onRemoveTrigger(ds.removeItem);
  ui.onUpTrigger(ds.moveItemUp);
  ui.onDownTrigger(ds.moveItemDown);
  ui.onTopTrigger(ds.moveItemTop);
  ui.onBottomTrigger(ds.moveItemBottom);

  ds.onChangeTrigger(ui.fillItems);
  ds.onAddTrigger(item => ui.selectItemIf(item, 'add'));
  ds.onMoveTrigger(item => ['up', 'down', 'top', 'bottom']
    .forEach(act => ui.selectItemIf(item, act)));
}
