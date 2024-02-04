1 || import(`../app.js`);

export const ds = {
  init,
  addEndeavor,
  onEndeavorsChange,
};

const endeavors = [];

let lastId = 0;
let useUpdatedEndeavors;

async function init() {

}

function onEndeavorsChange(handler) {
  useUpdatedEndeavors = handler;
}

async function addEndeavor(endeavor) {
  const { name } = endeavor;

  if (!name) {
    throw new Error('name is required');
  }

  if (endeavors.some(e => e.name === name)) {
    throw new Error(`There is already an endeavor named "${name}"`);
  }

  const id = genId();
  const newEndeavor = { id, name };

  await pause(1000);
  
  endeavors.unshift(newEndeavor);
  useUpdatedEndeavors?.(endeavors);
  
  return newEndeavor;
}

function genId() {
  return ++lastId;
}

function pause(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
