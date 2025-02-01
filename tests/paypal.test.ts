import { generateAccessToken, paypal } from '../lib/paypal';

// Test to generate access token from paypal
test('generates token from paypal', async () => {
  const tokenResponse = await generateAccessToken();

  expect(typeof tokenResponse).toBe('string');
  expect(tokenResponse.length).toBeGreaterThan(0);
});

// Test to create a paypal order
test('Creates a paypal order', async () => {
  const token = await generateAccessToken();
  const price = 10.0;

  const orederResponse = await paypal.createOrder(price);

  expect(orederResponse).toHaveProperty('id');
  expect(orederResponse).toHaveProperty('status');
  expect(orederResponse.status).toBe('CREATED');
});

// Test to capture payment with mock order
test('Simulate capturing a payment from an order', async () => {
  const orderId = '100';

  const mockCapturePayment = jest
    .spyOn(paypal, 'capturePayment')
    .mockResolvedValue({ status: 'COMPLETED' });

  const captureResponse = await paypal.capturePayment(orderId);
  expect(captureResponse).toHaveProperty('status', 'COMPLETED');

  mockCapturePayment.mockRestore();
});
