2 || import(`../ui.js`);

export default mergeMarkup;

'' && import(`./markup-registry.js`);

async function mergeMarkup() {
  const paths = await getPaths();
  const entryPromises = paths.map(getMarkupEntry);
  const results = await Promise.allSettled(entryPromises);
  const markupEntries = results
    .filter(result => result.status === 'fulfilled')
    .map(result => result.value);
  const markupRegistry = Object.fromEntries(markupEntries);

  while (plugMatching(markupRegistry));
}

async function getPaths() {
  const registryURL = 'ui/js/markup-registry.js';
  const response = await fetch(registryURL);
  const code = await response.text();
  const re = /(?<=import '..)(.*)(?=')/g;
  const paths = code.match(re);

  return paths.map(path => 'ui' + path);
}

async function getMarkupEntry(url) {
  const response = await fetch(url);

  if (!response.ok) throw new Error(response.statusText);

  const markup = await response.text();

  if (!markup) throw console.warn(`No markup found in "${url}"`);
  
  const fileName = url.split('/').pop();
  const name = fileName.replace('.htm', '');

  return [name, markup];
}

function plugMatching(markupRegistry) {
  let plugged;

  for (const name in markupRegistry) {
    const selector = `${name}, #${name}`;
    const parents = [...document.querySelectorAll(selector)]
      .filter(notRecursivelyNested(selector));

    for (const parent of parents) {
      const markup = markupRegistry[name];
      
      parent.innerHTML = markup;
    }

    plugged ||= parents.length;
  }

  return plugged;
}

function notRecursivelyNested(selector) {
  const nestedSelector = `:is(${selector}) :is(${selector})`;
  
  return function(el) {
    const isNested = el.closest(nestedSelector);

    if (isNested) {
      console.warn(`Skipping nested "${selector}" element`, el);
      return;
    }

    return !el.childElementCount
  }
}
