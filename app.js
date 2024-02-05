import { userInterface as ui } from './ui/ui.js';
import { dataService as ds } from './ds/ds.js';

start();

// proceed();

function start() {
  ds.init();
  ui.init();

  ui.fillItems(ds.getItems());
  ui.show();

  ds.on('change', () => ui.fillItems(ds.getItems()));

  ui.on('add', () => ds.add(ui.getInput()));
  ui.on('update', () => ds.update(ui.getSelection(), ui.getInput()));
  ui.on('remove', () => ds.remove(ui.getSelection()));
  ui.on('removemarked', () => ds.remove(...ui.getMarked()));
  ui.on('currentup', () => ds.moveUp(ui.getSelection()));
  ui.on('currentdown', () => ds.moveDown(ui.getSelection()));
  ui.on('currentfirst', () => ds.moveFirst(ui.getSelection()));
  ui.on('currentlast', () => ds.moveLast(ui.getSelection()));
  ui.on('markedup', () => ds.moveUp(...ui.getMarked()));
  ui.on('markeddown', () => ds.moveDown(...ui.getMarked()));
  ui.on('markedfirst', () => ds.moveFirst(...ui.getMarked()));
  ui.on('markedlast', () => ds.moveLast(...ui.getMarked()));
  
  ui.on('order',  ds.restoreOrder);
  ui.on('sort', ds.sort);
  ui.on('reverse', ds.reverse);
  ui.on('shuffle', ds.shuffle);

  ui.on('markall', ui.markAll);
  ui.on('unmarkall', ui.unmarkAll);
  ui.on('invertmark', ui.invertMark);
  ui.on('findselect', ui.selectRequestedItem);
  ui.on('showall', ui.unhide);
  ui.on('hide', ui.hide);
  ui.on('hidemarked', ui.hideMarked);
  ui.on('hideunmarked', ui.hideUnmarked);
  ui.on('matchtext', ui.showBySubstring);
  ui.on('matchregex', ui.showByRegEx);
  ui.on('invertshow', ui.toggleHideAll);

  ui.on('inputcopy', ui.fillInput);
  
  // ui.experiment();
}

function proceed() {
  ui.on('add', ui.addItem);
  ui.on('update', ui.updateItem);
  ui.on('remove', ui.remove);
  ui.on('removemarked', ui.removeMarked);
  ui.on('currentup', ui.moveCurrentUp);
  ui.on('currentdown', ui.moveCurrentDown);
  ui.on('currentfirst', ui.moveCurrentFirst);
  ui.on('currentlast', ui.moveCurrentLast);
  ui.on('markedup', ui.moveMarkedUp);
  ui.on('markeddown', ui.moveMarkedDown);
  ui.on('markedfirst', ui.moveMarkedFirst);
  ui.on('markedlast', ui.moveMarkedLast);
  ui.on('order', ui.restoreOrder);
  ui.on('sort', ui.sort);
  ui.on('reverse', ui.reverse);
  ui.on('shuffle', ui.shuffle);
}
