2 || import(`../ui.js`);

export {aquireElements};

function aquireElements(ui) {
  const [form] = document.forms;
  const [itemSelect, actSelect] = form.querySelectorAll('select'); 
  const [markBox, itemInput] = form.querySelectorAll('input');
  const [clearBtn, actBtn] = form.querySelectorAll('button');
  const [itemsDetails, feedbackDetails] = form.querySelectorAll('details');
  const [summary, feedbackNote] = feedbackDetails.children;

  ui.elements = {
    form, itemsDetails, itemSelect, actSelect, markBox, itemInput, clearBtn, actBtn, feedbackDetails, summary, feedbackNote,
  };
}
