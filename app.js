import { userInterface as ui } from './ui/ui.js';

start();

proceed();

function start() {
  ui.init();

  ui.show();

  ui.experiment();
}

function proceed() {
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
  ui.on('inputcopy', ui.fillInput);
}
