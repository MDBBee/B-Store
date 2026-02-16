// 1)- Generate access token (https://developer.paypal.com/reference/get-an-access-token/)
// 2)- CreateOrder (https://developer.paypal.com/docs/api/orders/v2/)
// 3)- Capture Payment (https://developer.paypal.com/docs/api/orders/v2/)
// 4)- NPM package for frontE buttons- https://www.npmjs.com/package/@paypal/react-paypal-js--@paypal/react-paypal-js

const base = process.env.PAYPAL_API_URL || 'https://api-m.sandbox.paypal.com';

//2)
export const paypal = {
  createOrder: async function createOrder(price: number) {
    const accessToken = await generateAccessToken();
    const url = `${base}/v2/checkout/orders`;

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        intent: 'CAPTURE',
        purchase_units: [
          {
            amount: {
              currency_code: 'EUR',
              value: price,
            },
          },
        ],
      }),
    });

    return handleResponse(response);
  },

  // {
  //   "id": "5O190127TN364715T",
  //   "status": "PAYER_ACTION_REQUIRED",
  //   "payment_source": {"paypal": { }},
  //   "links": [
  //   {"href": "https://api-m.paypal.com/v2/checkout/orders/5O190127TN364715T",
  //   "rel": "self",
  //   "method": "GET"},
  //   {"href": "https://www.paypal.com/checkoutnow?token=5O190127TN364715T",
  //   "rel": "payer-action",
  //   "method": "GET"}
  //   ]
  // }

  capturePayment: async function capturePayment(orderId: string) {
    const accessToken = await generateAccessToken();
    const url = `${base}/v2/checkout/orders/${orderId}/capture`;

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return handleResponse(response);
  },
};

//1) Generate paypal access token
async function generateAccessToken() {
  const { PAYPAL_CLIENT_ID, PAYPAL_APP_SECRET } = process.env;
  const auth = Buffer.from(`${PAYPAL_CLIENT_ID}:${PAYPAL_APP_SECRET}`).toString(
    'base64',
  );

  const response = await fetch(`${base}/v1/oauth2/token`, {
    method: 'POST',
    body: 'grant_type=client_credentials',
    headers: {
      Authorization: `Basic  ${auth}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  });

  const jsonData = await handleResponse(response);
  return jsonData.access_token;
}

//1A response handler
async function handleResponse(response: Response) {
  if (response.ok) {
    return await response.json();
  } else {
    const errorMessage = await response.text();
    throw new Error(errorMessage);
  }
}

export { generateAccessToken };
