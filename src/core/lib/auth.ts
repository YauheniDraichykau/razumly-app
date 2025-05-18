import { signOut } from 'next-auth/react';
import { httpService } from './http';
import { authStore } from '@auth/store/Auth.store';
import { getCookie } from 'cookies-next/client';

export const registerUser = async (data: { name: string; email: string; password: string }) => {
  try {
    await httpService.post('/auth/register', data);
  } catch (error) {
    throw new Error('Registration Error');
  }
};

export const loginCredentials = async (
  email: string,
  password: string,
  callback = '/app/dashboard',
) => {
  const { signIn } = await import('next-auth/react');

  const absCallback = callback.startsWith('http')
    ? callback
    : `${window.location.origin}${callback}`;

  const response = await httpService.post(
    '/auth/login',
    { email, password },
    {
      withCredentials: true,
    },
  );

  const { accessToken } = response.data as { accessToken?: string };

  if (!accessToken) {
    throw new Error('Access token has not been returned');
  }

  const res = await signIn('credentials', {
    accessToken,
    redirect: false,
    callbackUrl: absCallback,
  });

  authStore.setAccessToken(accessToken);

  if (res?.error) {
    throw new Error('Invalid credentials');
  }
};

export const logout = async () => {
  try {
    await httpService.post(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/logout`,
      {},
      {
        withCredentials: true,
      },
    );
    authStore.clear();
  } catch (err) {
    console.warn('Logout API failed:', err);
  }

  await signOut({ callbackUrl: '/auth' });
};
