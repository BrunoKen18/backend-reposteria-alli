import {index} from '../lib/algolia';
import {Request} from 'express';
export async function getProductsFeatured() {
  const products = await index.search('', {}).catch((e) => e);
  const featured = products.hits.filter((r) => r.featured);
  return featured;
}
export async function getSearchProduct(
  search: string,
  type: any,
  price: any,
  finalLimit: number,
  finalOffset: number
) {
  const parseType = JSON.parse(type);
  const parsePrice = JSON.parse(price);
  const cadenaDeBusquedaCategory = parseType
    ? parseType.map((item: string) => `Type:${item}`).join(' OR ')
    : null;

  const cadenaDeBusquedaPrice = parsePrice
    ? `"Unit cost" >= ${parsePrice[0]} AND "Unit cost" <= ${parsePrice[1]}`
    : '';

  const products = await index
    .search(search || '', {
      hitsPerPage: finalLimit,
      offset: finalOffset,
      length: finalLimit,
      filters: ` ${cadenaDeBusquedaPrice ? cadenaDeBusquedaPrice : ''}  ${
        cadenaDeBusquedaCategory ? ' AND ' + cadenaDeBusquedaCategory : ''
      }`,
    })
    .catch((e) => e);
  return {
    results: products.hits,
    pagination: {
      limit: finalLimit,
      offset: finalOffset,
      total: products.nbHits,
    },
  };
}
export async function getSearchProductId(id: string) {
  const product = await index.getObject(id).catch((e) => e);
  return product;
}

export function getOffsetAndLimitFomReq(
  req: Request,
  maxLimit = 100,
  maxOffset = 100000
) {
  const limit = parseInt((req.query.limit as string) || '0');
  const offset = parseInt((req.query.offset as string) || '0');

  let finalLimit = 10;
  if (limit > 0 && limit < maxLimit) {
    finalLimit = limit;
  } else if (limit > maxLimit) {
    finalLimit = maxLimit;
  }

  const finalOffset = offset < maxOffset ? offset : 0;
  return {finalLimit, finalOffset};
}
