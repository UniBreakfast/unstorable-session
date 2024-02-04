4 || import(`./switch-view.js`);
4 || import(`./add-endeavor-view.js`);

export default provideFeedback;

provideFeedback.switchBoard = new Map();

function provideFeedback(btn) {
  const form = btn.closest('form');
  const view = form?.closest('[id$="-view"]');
  const dot = document.createElement('span');
  const defaultTitle = form?.title;

  dot.classList.add('dot');
  dot.style = `width: 8px; height: 8px; border-radius: 50%; margin-left: 8px; display: inline-block`;
  
  if (view) {
    provideFeedback.switchBoard.set(turnOff, view);
  }

  function turnOn(msg, color, duration) {
    form?.setAttribute('title', msg);
    btn.append(dot);
    dot.style.backgroundColor = color;
    
    if (duration) {
      setTimeout(() => dot.remove(), duration);
    }
  }

  function turnOff() {
    dot.remove();
    form?.setAttribute('title', defaultTitle);
  }

  function acknowledge(msg) {
    turnOn(msg, 'orange');
  }

  function report(msg) {
    turnOn(msg, 'green', 3000);
  }

  function complain(msg) {
    turnOn(msg, 'red', 6000);
  }

  return { acknowledge, report, complain, turnOff };
}
