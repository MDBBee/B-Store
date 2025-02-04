import { ShippingAddress } from '@/types';

export const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME || 'B-store';
export const APP_DESCRIPTION =
  process.env.NEXT_PUBLIC_APP_DESCRIPTION ||
  'A modern full-option e-commerce website.';
export const SERVER_URL =
  process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000';
export const LATEST_PRODUCTS_LIMIT =
  Number(process.env.LATEST_PRODUCTS_LIMIT) || 4;

export const signInDefaultValues = {
  email: 'ad@min.com',
  password: 'abcdef',
};
export const signUpDefaultValues = {
  name: '',
  password: '',
  confirmPassword: '',
  email: '',
};

export const shippingFormDefault: ShippingAddress = {
  fullName: 'Jane Doe',
  streetAddress: 'Holmintie 76 c',
  city: 'Seinajoki',
  postalCode: '23321',
  country: 'Finland',
};

export const PAYMENT_METHODS = process.env.PAYMENT_METHODS
  ? process.env.PAYMENT_METHODS.split(', ')
  : ['PayPal', 'Stripe', 'CashOnDelivery'];
export const DEFAULT_PAYMENT_METHOD =
  process.env.DEFAULT_PAYMENT_METHOD || 'PayPal';

export const PAGE_SIZE = Number(process.env.PAGE_SIZE) || 5;

export const productDefaultValues = {
  name: '',
  slug: '',
  category: '',
  images: [],
  brand: '',
  decription: '',
  price: '0',
  stock: 0,
  rating: '0',
  numReviews: '0',
  isFeatured: false,
  banner: null,
};

export const USER_ROLES = process.env.USER_ROLES
  ? process.env.USER_ROLES?.split(', ')
  : ['admin', 'user'];
