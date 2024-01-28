import {base, getDataAirtable} from '../lib/airtable';
import {index} from '../lib/algolia';

export async function syncAirableInAlgolia() {
  let product = [];
  await getDataAirtable();

  base('Furniture')
    .select({
      view: 'All furniture',
      pageSize: 10,
    })
    .eachPage(
      async function (records, fetchNextPage) {
        const object = records.map((r) => {
          return {
            objectID: r.id,
            ...r.fields,
          };
        });
        product.push(object);
        await index.saveObjects(object);
        fetchNextPage();
      },
      function done(err) {
        console.log('A terminadpo');
        if (err) {
          return err;
        }
      }
    );
  console.log(product?.length);

  return product;
}