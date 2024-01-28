import Airtable from 'airtable';
import {tiendaIndex} from './algolia';
var base = new Airtable({
  apiKey: process.env.AIRTABLE_KEY,
}).base('appEt0LIcwvJBjgvB');
const tiendaBase = new Airtable({apiKey: process.env.AIRTABLE}).base(
  'appXu0aYFo1OsZRi0'
);
async function getDataAirtable() {
  const newBase = tiendaBase('Furniture').select({
    pageSize: 100,
  });
  const response = await newBase.all();
  const object = response.map((r) => ({
    objectID: r.id,
    ...r.fields,
  }));
  const res = await tiendaIndex.replaceAllObjects(object);
  return res.objectIDs;
}

export {base, getDataAirtable};
