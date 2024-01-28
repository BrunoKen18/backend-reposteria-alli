"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const product_1 = require("./controllers/product");
const sync_1 = require("./controllers/sync");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const order_1 = require("./controllers/order");
const port = '3000';
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.get('/sync/algolia', async (req, res) => {
    const syncResponse = await (0, sync_1.syncAirableInAlgolia)();
    res.status(200).json(syncResponse);
});
app.get('/featured', async (req, res) => {
    const featured = await (0, product_1.getProductsFeatured)();
    res.json(featured);
});
app.get('/products', async (req, res) => {
    const { q } = req.query;
    const { finalOffset, finalLimit } = (0, product_1.getOffsetAndLimitFomReq)(req);
    const products = await (0, product_1.getSearchProduct)(q, finalLimit, finalOffset);
    res.json(products);
});
app.get('/products/:id', async (req, res) => {
    const { id } = req.params;
    const product = await (0, product_1.getSearchProductId)(id);
    res.json(product);
});
app.post('/order', async (req, res) => {
    const data = await (0, order_1.createOrdersPreference)(req.body);
    res.json(data);
});
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
