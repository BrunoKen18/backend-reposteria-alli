"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOffsetAndLimitFomReq = exports.getSearchProductId = exports.getSearchProduct = exports.getProductsFeatured = void 0;
const algolia_1 = require("lib/algolia");
async function getProductsFeatured() {
    const products = await algolia_1.index.search('', {}).catch((e) => e);
    const featured = products.hits.filter((r) => r.featured);
    return featured;
}
exports.getProductsFeatured = getProductsFeatured;
async function getSearchProduct(search, finalLimit, finalOffset) {
    const products = await algolia_1.index
        .search(search, {
        hitsPerPage: finalLimit,
        offset: finalOffset,
        length: finalLimit,
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
exports.getSearchProduct = getSearchProduct;
async function getSearchProductId(id) {
    const product = await algolia_1.index.getObject(id).catch((e) => e);
    return product;
}
exports.getSearchProductId = getSearchProductId;
function getOffsetAndLimitFomReq(req, maxLimit = 100, maxOffset = 100000) {
    const limit = parseInt(req.query.limit || '0');
    const offset = parseInt(req.query.offset || '0');
    let finalLimit = 10;
    if (limit > 0 && limit < maxLimit) {
        finalLimit = limit;
    }
    else if (limit > maxLimit) {
        finalLimit = maxLimit;
    }
    const finalOffset = offset < maxOffset ? offset : 0;
    return { finalLimit, finalOffset };
}
exports.getOffsetAndLimitFomReq = getOffsetAndLimitFomReq;
