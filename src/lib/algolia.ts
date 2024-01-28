import algoliasearch from 'algoliasearch';

const client = algoliasearch(
  process.env.ALGOLIA_ID as string,
  process.env.ALGOLIA_KEY as string
);
const tiendaClient = algoliasearch('M5BJRFSVUS', process.env.ALGOLIA as string);

const tiendaIndex = tiendaClient.initIndex('product');
const index = client.initIndex('products');

export {index, tiendaIndex};
