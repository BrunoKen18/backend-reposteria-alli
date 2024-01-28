"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.tiendaIndex = exports.index = void 0;
const algoliasearch_1 = __importDefault(require("algoliasearch"));
const client = (0, algoliasearch_1.default)(process.env.ALGOLIA_ID, process.env.ALGOLIA_KEY);
const tiendaClient = (0, algoliasearch_1.default)('M5BJRFSVUS', process.env.ALGOLIA);
const tiendaIndex = tiendaClient.initIndex('product');
exports.tiendaIndex = tiendaIndex;
const index = client.initIndex('products');
exports.index = index;
