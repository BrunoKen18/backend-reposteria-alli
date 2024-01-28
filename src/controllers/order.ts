import {ProductAlgoliaType} from '../lib/types';
import {createPreference} from '../lib/mercadopago';
import {db} from '../lib/firebase';

export async function createOrdersPreference(product: ProductAlgoliaType) {
  const preference = {
    items: [
      {
        title: product['Name'],
        description: product['Description'] || 'Detalle de la compra',
        picture_url:
          'https://res.cloudinary.com/dy26iktoi/image/upload/v1700770795/yhzjii4dn16ejn2qpirg.webp' ||
          '',
        category_id: 'car_electronics',
        quantity: product.quantity,
        currency_id: 'ARS',
        unit_price: product['Unit cost'],
      },
    ],
    back_urls: {
      success: 'https://desafio-m10-weld.vercel.app/thanks',
      pending: 'https://desafio-m8-d396d.web.app/login',
    },
    auto_return: 'approved',
    external_reference: 'order.id',
    notification_url:
      'https://webhook.site/78f96eec-74d6-48e1-8c55-d7a6181e42d0',
  };
  const response = await createPreference(preference);
  console.log(db.collection('orders'));

  return {
    url: response.body.init_point,
    orderId: response.body.external_reference,
  };
}
