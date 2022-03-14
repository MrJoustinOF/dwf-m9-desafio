import mercadopago from "mercadopago";

const { MP_TOKEN: access_token } = process.env;

mercadopago.configure({ access_token });

const createPreference = async (data) => {
  const { product, quantity, orderId: external_reference } = data;

  const { title, desc: description, price: unit_price } = product;

  const { BASE_URL } = process.env;

  const success = BASE_URL + "/api/ipn/success";
  const notification_url = BASE_URL + "/api/ipn/mercadopago";

  const { response } = await mercadopago.preferences.create({
    items: [
      {
        title,
        description,
        picture_url: "http://www.myapp.com/myimage.jpg",
        category_id: "cat123",
        quantity,
        currency_id: "ARS",
        unit_price,
      },
    ],
    back_urls: {
      success,
    },
    external_reference,
    notification_url,
  });

  return response;
};

const getMerchantOrder = async (id) => {
  const res = mercadopago.merchant_orders.get(id);

  return res;
};

export { createPreference, getMerchantOrder };
