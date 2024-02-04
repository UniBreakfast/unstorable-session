export {data as items, data}

const data = await fetch('./ds/json/items.json').then(response => response.json())
