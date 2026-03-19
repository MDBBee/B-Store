import { neonConfig } from '@neondatabase/serverless';
import { PrismaNeon } from '@prisma/adapter-neon';
import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';
import ws from 'ws';

dotenv.config();

// Required for Neon in Node.js
neonConfig.webSocketConstructor = ws;

// Ensure DATABASE_URL exists
const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error('DATABASE_URL is not set');
}

// Global type (for hot reload in dev)
const globalForPrisma = globalThis as unknown as {
  prisma: ReturnType<typeof createPrismaClient> | undefined;
};

function createPrismaClient() {
  const adapter = new PrismaNeon({
    connectionString,
  });

  return new PrismaClient({ adapter }).$extends({
    result: {
      product: {
        price: {
          compute(product) {
            if (!product || product.price == null) return '0';
            return product.price.toString();
          },
        },
        rating: {
          compute(product) {
            if (!product || product.rating == null) return '0';
            return product.rating.toString();
          },
        },
      },

      cart: {
        itemsPrice: {
          needs: { itemsPrice: true },
          compute(cart) {
            if (!cart || cart.itemsPrice == null) return '0';
            return cart.itemsPrice.toString();
          },
        },
        totalPrice: {
          needs: { totalPrice: true },
          compute(cart) {
            if (!cart || cart.totalPrice == null) return '0';
            return cart.totalPrice.toString();
          },
        },
        shippingPrice: {
          needs: { shippingPrice: true },
          compute(cart) {
            if (!cart || cart.shippingPrice == null) return '0';
            return cart.shippingPrice.toString();
          },
        },
        taxPrice: {
          needs: { taxPrice: true },
          compute(cart) {
            if (!cart || cart.taxPrice == null) return '0';
            return cart.taxPrice.toString();
          },
        },
      },

      order: {
        itemsPrice: {
          needs: { itemsPrice: true },
          compute(order) {
            if (!order || order.itemsPrice == null) return '0';
            return order.itemsPrice.toString();
          },
        },
        totalPrice: {
          needs: { totalPrice: true },
          compute(order) {
            if (!order || order.totalPrice == null) return '0';
            return order.totalPrice.toString();
          },
        },
        shippingPrice: {
          needs: { shippingPrice: true },
          compute(order) {
            if (!order || order.shippingPrice == null) return '0';
            return order.shippingPrice.toString();
          },
        },
        taxPrice: {
          needs: { taxPrice: true },
          compute(order) {
            if (!order || order.taxPrice == null) return '0';
            return order.taxPrice.toString();
          },
        },
      },

      orderItem: {
        price: {
          compute(item) {
            if (!item || item.price == null) return '0';
            return item.price.toString();
          },
        },
      },
    },
  });
}

// Prevent multiple instances in development (Next.js hot reload fix)
export const prisma = globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}

// import { Pool, neonConfig } from '@neondatabase/serverless';
// import { PrismaNeon } from '@prisma/adapter-neon';
// import { PrismaClient } from '@prisma/client';
// import dotenv from 'dotenv';
// import ws from 'ws';

// dotenv.config();

// neonConfig.webSocketConstructor = ws;
// const connectionString = `${process.env.DATABASE_URL}`;

// const globalForPrisma = globalThis as unknown as {
//   prisma: ReturnType<typeof createPrismaClient> | undefined;
// };

// function createPrismaClient() {
//   const pool = new Pool({ connectionString });
//   const adapter = new PrismaNeon(pool);

//   // Extends the PrismaClient with a custom result transformer to convert the price and rating fields to strings.
//   return new PrismaClient({ adapter }).$extends({
//     result: {
//       product: {
//         price: {
//           compute(product) {
//             if (!product || product.price == null) return '0';
//             return product.price.toString();
//           },
//         },
//         rating: {
//           compute(product) {
//             if (!product || product.rating == null) return '0';
//             return product.rating.toString();
//           },
//         },
//       },
//       cart: {
//         itemsPrice: {
//           needs: { itemsPrice: true },
//           compute(cart) {
//             if (!cart || cart.itemsPrice == null) return '0';
//             return cart.itemsPrice.toString();
//           },
//         },
//         totalPrice: {
//           needs: { totalPrice: true },
//           compute(cart) {
//             if (!cart || cart.totalPrice == null) return '0';
//             return cart.totalPrice.toString();
//           },
//         },
//         shippingPrice: {
//           needs: { shippingPrice: true },
//           compute(cart) {
//             if (!cart || cart.shippingPrice == null) return '0';
//             return cart.shippingPrice.toString();
//           },
//         },
//         taxPrice: {
//           needs: { taxPrice: true },
//           compute(cart) {
//             if (!cart || cart.taxPrice == null) return '0';
//             return cart.taxPrice.toString();
//           },
//         },
//       },
//       order: {
//         itemsPrice: {
//           needs: { itemsPrice: true },
//           compute(cart) {
//             if (!cart || cart.itemsPrice == null) return '0';
//             return cart.itemsPrice.toString();
//           },
//         },
//         totalPrice: {
//           needs: { totalPrice: true },
//           compute(cart) {
//             if (!cart || cart.totalPrice == null) return '0';
//             return cart.totalPrice.toString();
//           },
//         },
//         shippingPrice: {
//           needs: { shippingPrice: true },
//           compute(cart) {
//             if (!cart || cart.shippingPrice == null) return '0';
//             return cart.shippingPrice.toString();
//           },
//         },
//         taxPrice: {
//           needs: { taxPrice: true },
//           compute(cart) {
//             if (!cart || cart.taxPrice == null) return '0';
//             return cart.taxPrice.toString();
//           },
//         },
//       },
//       orderItem: {
//         price: {
//           compute(cart) {
//             if (!cart || cart.price == null) return '0';
//             return cart.price.toString();
//           },
//         },
//       },
//     },
//   });
// }

// export const prisma = globalForPrisma.prisma ?? createPrismaClient();

// if (process.env.NODE_ENV !== 'production') {
//   globalForPrisma.prisma = prisma;
// }
