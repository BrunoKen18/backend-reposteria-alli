import mercadopago from 'mercadopago';
mercadopago.configure({access_token: process.env.Mp_TOKEN as string});

export async function createPreference(preferences) {
  const response = await mercadopago.preferences.create(preferences);
  return response;
}

export async function getMerchantOrder(id: number) {
  const response = await mercadopago.merchant_orders.get(id);
  return response;
}
