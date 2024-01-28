"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMerchantOrder = exports.createPreference = void 0;
const mercadopago_1 = __importDefault(require("mercadopago"));
mercadopago_1.default.configure({ access_token: process.env.Mp_TOKEN });
async function createPreference(preferences) {
    const response = await mercadopago_1.default.preferences.create(preferences);
    return response;
}
exports.createPreference = createPreference;
async function getMerchantOrder(id) {
    const response = await mercadopago_1.default.merchant_orders.get(id);
    return response;
}
exports.getMerchantOrder = getMerchantOrder;
