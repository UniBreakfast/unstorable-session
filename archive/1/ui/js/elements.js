2 || import(`../ui.js`);

export default grabElements;

async function grabElements() {
  const views = Array.from(document.querySelectorAll('[id$="-view"]'));

  const viewDict = Object.fromEntries(views.map(makeViewEntry));

  const viewForm = document.getElementById('view-form');
  const addEndeavorForm = document.getElementById('add-endeavor-form');
  const endeavorsForm = document.getElementById('endeavors-form');
  const editEndeavorForm = document.getElementById('edit-endeavor-form');
  const addEndeavorOptionTemplate = addEndeavorForm.querySelector('option');
  const endeavorsOptionTemplate = endeavorsForm.querySelector('option');
  const editEndeavorOptionTemplate = editEndeavorForm.querySelector('option');
  const addEndeavorBtn = addEndeavorForm.querySelector('button');
  const performEndeavorsBtn = endeavorsForm.querySelector('button');
  const performEditEndeavorBtn = editEndeavorForm.querySelector('button');
  
  return {
    viewForm, viewDict,
    addEndeavorForm, endeavorsForm, editEndeavorForm,
    addEndeavorOptionTemplate, addEndeavorBtn,
    endeavorsOptionTemplate, performEndeavorsBtn,
    editEndeavorOptionTemplate, performEditEndeavorBtn,
  };
}

function makeViewEntry(view) {
  const name = view.id.replace(/-view$/, '');

  return [name, view];
}
