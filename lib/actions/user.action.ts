'use server';

import {
  paymentMethodSchema,
  shippingAddressSchema,
  signInFormSchema,
  signUpFormSchema,
  updateUserSchema,
} from '../validators';
import { auth, signIn, signOut } from '@/auth';
import { prisma } from '@/db/prisma';
import { hashSync } from 'bcrypt-ts-edge';
import { isRedirectError } from 'next/dist/client/components/redirect-error';
import { compareObjects, formatError } from '../utils';
import { ShippingAddress } from '@/types';
import { z } from 'zod';
import { PAGE_SIZE } from '../constants';
import { revalidatePath } from 'next/cache';
import { Prisma } from '@prisma/client';

// Sign in with user cred
export const signInWithCredentials = async (
  prevState: { success: boolean; message: string },
  formData: FormData,
) => {
  try {
    const user = signInFormSchema.parse({
      email: formData.get('email'),
      password: formData.get('password'),
    });
    const callBackUrl = formData.get('callbackUrl') as string;

    await signIn('credentials', { ...user, redirectTo: callBackUrl });

    return { success: true, message: 'Signed in successfully' };
  } catch (error) {
    if (isRedirectError(error)) {
      // console.log('ISredirectError from user.actions.ts-swcreds:✅✅:', error);
      throw error;
    }

    return { success: false, message: 'Invalid email or password' };
  }
};

// Sign user out
export async function signOutUser() {
  await signOut();
}

// Sign Up user
export async function signUpUser(
  prevState: { message: string; success: boolean },
  formData: FormData,
) {
  try {
    const user = signUpFormSchema.parse({
      name: formData.get('name'),
      email: formData.get('email'),
      password: formData.get('password'),
      confirmPassword: formData.get('confirmPassword'),
    });

    const plainPassword = user.password;
    user.password = hashSync(user.password, 10);

    await prisma.user.create({
      data: {
        name: user.name,
        email: user.email,
        password: user.password,
      },
    });

    await signIn('credentials', {
      email: user.email,
      password: plainPassword,
    });

    return { success: true, message: 'Registration successful' };
  } catch (error) {
    // console.log(JSON.stringify(error, null, 2));

    if (isRedirectError(error)) {
      throw error;
    }
    return { success: false, message: formatError(error) as string };
  }
}

// Get user by id
export async function getUserById(userId: string) {
  const user = await prisma.user.findFirst({
    where: { id: userId },
  });

  if (!user) throw new Error('User not found');
  return user;
}

// Update the user's address
export async function updateUserAddress(data: ShippingAddress) {
  try {
    const session = await auth();
    const currentUser = await prisma.user.findFirst({
      where: { id: session?.user?.id },
    });

    if (!currentUser) throw new Error('User not found');

    const address = shippingAddressSchema.parse(data);

    if (compareObjects(address, currentUser.address as ShippingAddress))
      return {
        success: true,
        message: `No visible changes in address!. Address remains the same`,
      };

    await prisma.user.update({
      where: { id: currentUser.id },
      data: { address },
    });

    return {
      success: true,
      message: `Shipping address updated successfully!`,
    };
  } catch (error) {
    return { success: false, message: formatError(error) };
  }
}

// Update user's payment method
export async function updateUserPaymentMethod(
  data: z.infer<typeof paymentMethodSchema>,
) {
  try {
    const session = await auth();
    const currentUser = await prisma.user.findFirst({
      where: { id: session?.user?.id },
    });

    if (!currentUser) throw new Error('User not found');

    const paymentMethod = paymentMethodSchema.parse(data);

    // Update only if there is a change, return early
    if (paymentMethod.type === (currentUser?.paymentMethod as string))
      return {
        success: true,
        message: 'User Payment method updated successfully',
      };

    await prisma.user.update({
      where: { id: currentUser.id },
      data: { paymentMethod: paymentMethod.type },
    });

    return {
      success: true,
      message: 'User Payment method updated successfully',
    };
  } catch (error) {
    return { success: false, message: formatError(error) };
  }
}

// Update the user profile
export async function updateProfile(user: { name: string; email: string }) {
  try {
    const session = await auth();

    const currentUser = await prisma.user.findFirst({
      where: { id: session?.user?.id },
    });

    if (!currentUser) throw new Error('User not found');

    await prisma.user.update({
      where: { id: currentUser.id },
      data: { name: user.name },
    });
    return { success: true, message: "User's name updated successfully!" };
  } catch (error) {
    return { success: false, message: formatError(error) };
  }
}

// Get all the users
export async function getAllUsers({
  limit = PAGE_SIZE,
  page,
  query,
}: {
  limit?: number;
  page: number;
  query: string;
}) {
  const queryFilter: Prisma.UserWhereInput =
    query && query !== 'all'
      ? {
          name: {
            contains: query,
            mode: 'insensitive',
          } as Prisma.StringFilter,
        }
      : {};

  const data = await prisma.user.findMany({
    where: { ...queryFilter },
    orderBy: { createdAt: 'desc' },
    take: limit,
    skip: (page - 1) * limit,
  });

  const dataCount = await prisma.user.count();

  return { data, totalPages: Math.ceil(dataCount / limit) };
}

// Delete a user/users
export async function deleteUser(id: string) {
  try {
    await prisma.user.delete({ where: { id } });
    revalidatePath('/admin/users');

    return { success: true, message: 'user deleted' };
  } catch (error) {
    return { success: false, message: formatError(error) };
  }
}

// Update a user
export async function updateUser(user: z.infer<typeof updateUserSchema>) {
  try {
    await prisma.user.update({
      where: { id: user.id },
      data: { name: user.name, role: user.role },
    });

    revalidatePath('/admin/users');
    return { success: true, message: 'User updated successfully' };
  } catch (error) {
    return { success: false, message: formatError(error) };
  }
}
