# B-Store Project Guidelines

## Project Overview

E-commerce application built with Next.js 16, React 19, Prisma, PostgreSQL (Neon), and Tailwind CSS.

## Build Commands

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run test         # Run all tests
npm run test:watch   # Run tests in watch mode
```

### Running a Single Test

```bash
npx jest tests/paypal.test.ts              # Run specific test file
npx jest tests/paypal.test.ts -t "generates token"  # Run specific test by name
```

## Tech Stack

- **Framework**: Next.js 16 with App Router
- **Database**: PostgreSQL via Neon with Prisma ORM
- **Auth**: NextAuth.js (beta) with Google, GitHub, and credentials providers
- **Payments**: Stripe, PayPal, Cash on Delivery
- **UI**: Radix UI components, Tailwind CSS, shadcn/ui patterns
- **Validation**: Zod schemas
- **Testing**: Jest with ts-jest
- **Error Tracking**: Sentry

## Code Style

### Imports

Order imports as follows:
1. React/Next.js imports
2. Third-party libraries (zod, prisma, etc.)
3. Internal imports using `@/` alias
4. Types (import type when possible)

```typescript
import { Suspense } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { z } from 'zod';
import { prisma } from '@/db/prisma';
import { formatError } from '@/lib/utils';
import type { Product } from '@/types';
```

### File Naming

- **Components**: PascalCase (e.g., `ProductCard.tsx`)
- **Server Actions**: camelCase with `.action.ts` suffix (e.g., `product.action.ts`)
- **Types**: camelCase (e.g., `index.ts` in `types/` folder)
- **Utilities**: camelCase (e.g., `utils.ts`)
- **Validators**: `validators.ts` for Zod schemas

### Component Patterns

Use named exports for components:
```typescript
const ProductCard = ({ product }: { product: Product }) => {
  return <Card>...</Card>;
};
export default ProductCard;
```

Server Components (default):
```typescript
const Homepage = async () => {
  return <><ProductList /></>;
};
export default Homepage;
```

Client Components:
```typescript
'use client';
import { useState } from 'react';
// component implementation
```

### Server Actions

Use `'use server'` directive at the top:
```typescript
'use server';
import { prisma } from '@/db/prisma';
import { revalidatePath, updateTag } from 'next/cache';

export async function myAction(param: string) {
  'use cache';
  cacheTag('my-tag');
  
  const data = await prisma.model.findMany();
  return convertToPlainObject(data);
}
```

Return format for mutations:
```typescript
return { success: true, message: 'Operation completed' };
return { success: false, message: formatError(error) };
```

### Types

Derive types from Zod schemas:
```typescript
import { z } from 'zod';
import { productSchema } from '@/lib/validators';

export type Product = z.infer<typeof productSchema> & {
  id: string;
  createdAt: Date;
};
```

### Error Handling

Use `formatError()` utility for consistent error formatting:
```typescript
try {
  await prisma.product.delete({ where: { id } });
  return { success: true, message: 'Deleted successfully' };
} catch (error) {
  return { success: false, message: formatError(error) };
}
```

### Database

- Prisma client is imported from `@/db/prisma`
- Use `convertToPlainObject()` to serialize Prisma results
- Use `cacheTag()` and `updateTag()` for Next.js cache invalidation

### Styling

- Use Tailwind CSS with custom CSS variables for theming
- Use `cn()` utility for conditional class merging
- Dark mode supported via `next-themes`

### Testing

- Tests located in `tests/` directory
- Use Jest with `test()` function
- Mock external dependencies when needed

## Project Structure

```
app/
  (auth)/          # Auth-related pages (sign-in, sign-up)
  (root)/          # Main app pages
  admin/           # Admin dashboard pages
  user/            # User profile pages
components/
  shared/          # Reusable components (header, product, etc.)
  ui/              # Base UI primitives (shadcn/ui)
  admin/           # Admin-specific components
hooks/             # Custom React hooks
lib/
  actions/         # Server actions (*.action.ts)
  constants/       # App constants
  validators.ts    # Zod validation schemas
  utils.ts         # Utility functions
db/
  prisma.ts        # Prisma client with extensions
types/             # TypeScript type definitions
prisma/
  schema.prisma    # Database schema
tests/             # Jest test files
```

## MCP Server Integration

Context7 MCP server is configured for documentation research. When research is needed:

- Use `context7` tools for searching documentation
- Available via `opencode.json` configuration

## Key Conventions

- Use TypeScript strict mode
- Async server components for data fetching
- Use Suspense boundaries with loading skeletons
- Form validation with react-hook-form + Zod resolvers
- Currency formatted as strings (Decimal in Prisma)
- UUID primary keys for all models