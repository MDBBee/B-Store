import { ShippingAddress } from '@/types';

export const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME || 'B-store';
export const APP_DESCRIPTION =
  process.env.NEXT_PUBLIC_APP_DESCRIPTION || 'An e-commerce website.';

export const SERVER_URL =
  process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000';

export const LATEST_PRODUCTS_LIMIT =
  Number(process.env.LATEST_PRODUCTS_LIMIT) || 4;

export const signInDefaultValues = {
  email: '',
  password: '',
};

export const signUpDefaultValues = {
  name: '',
  password: '',
  confirmPassword: '',
  email: '',
};

export const shippingFormDefault: ShippingAddress = {
  fullName: '',
  streetAddress: '',
  city: '',
  postalCode: '',
  country: '',
};

export const PAYMENT_METHODS = process.env.PAYMENT_METHODS
  ? process.env.PAYMENT_METHODS.split(', ')
  : ['PayPal', 'Stripe', 'CashOnDelivery'];

export const DEFAULT_PAYMENT_METHOD =
  process.env.DEFAULT_PAYMENT_METHOD || 'PayPal';

export const PAGE_SIZE = Number(process.env.PAGE_SIZE) || 6;

export const PRODUCT_CATEGORIES = [
  { label: 'All', value: 'all' },
  { label: 'Children', value: 'children' },
  { label: 'Women', value: 'women' },
  { label: 'Men', value: 'men' },
  { label: 'Accessories', value: 'accessories' },
  { label: 'Games', value: 'games' },
];

export const productDefaultValues = {
  name: '',
  slug: '',
  category: PRODUCT_CATEGORIES[0].value,
  images: [],
  brand: '',
  description: '',
  price: '0',
  stock: 0,
  rating: '0',
  numReviews: '0',
  isFeatured: false,
  banner: null,
};

export const USER_ROLES = process.env.USER_ROLES
  ? process.env.USER_ROLES?.split(', ')
  : ['admin', 'user', 'guest'];

export const reviewFormDefaultValues = {
  title: '',
  comment: '',
  rating: 0,
};

export const SENDER_EMAIL = process.env.SENDER_EMAIL || 'onboarding@resend.dev';

export const HIGHEST_PRODUCT_PRICE =
  process.env.HIGHEST_PRODUCT_PRICE || '2000';
