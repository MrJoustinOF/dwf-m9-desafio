import mercadopago from "mercadopago";

const { MP_TOKEN: access_token } = process.env;

mercadopago.configure({ access_token });

const createPreference = async (data) => {
  const { product, quantity, orderId: external_reference } = data;

  const { objectID, title, desc: description, price: unit_price } = product;

  const { BASE_URL, CLIENT_URL } = process.env;

  const success = CLIENT_URL + "/thanks?id=" + external_reference;
  const pending = CLIENT_URL + "/item/" + objectID;
  const failure = CLIENT_URL + "/item/" + objectID;

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
      pending,
      failure,
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
