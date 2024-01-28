"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDataAirtable = exports.base = void 0;
const airtable_1 = __importDefault(require("airtable"));
const algolia_1 = require("./algolia");
var base = new airtable_1.default({
    apiKey: process.env.AIRTABLE_KEY,
}).base('appEt0LIcwvJBjgvB');
exports.base = base;
const tiendaBase = new airtable_1.default({ apiKey: process.env.AIRTABLE }).base('appXu0aYFo1OsZRi0');
async function getDataAirtable() {
    const newBase = tiendaBase('Furniture').select({
        pageSize: 100,
    });
    const response = await newBase.all();
    const object = response.map((r) => ({
        objectID: r.id,
        ...r.fields,
    }));
    const res = await algolia_1.tiendaIndex.replaceAllObjects(object);
    console.log('res', res.objectIDs);
    return res.objectIDs;
}
exports.getDataAirtable = getDataAirtable;
