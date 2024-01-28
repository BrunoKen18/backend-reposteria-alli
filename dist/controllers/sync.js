"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.syncAirableInAlgolia = void 0;
const airtable_1 = require("../lib/airtable");
const algolia_1 = require("../lib/algolia");
async function syncAirableInAlgolia() {
    let product = [];
    await (0, airtable_1.getDataAirtable)();
    (0, airtable_1.base)('Furniture')
        .select({
        view: 'All furniture',
        pageSize: 10,
    })
        .eachPage(async function (records, fetchNextPage) {
        const object = records.map((r) => {
            return {
                objectID: r.id,
                ...r.fields,
            };
        });
        product.push(object);
        await algolia_1.index.saveObjects(object);
        fetchNextPage();
    }, function done(err) {
        console.log('A terminadpo');
        if (err) {
            return err;
        }
    });
    console.log(product?.length);
    return product;
}
exports.syncAirableInAlgolia = syncAirableInAlgolia;
