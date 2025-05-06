export const registerUser = async (data: { name: string; email: string; password: string }) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Credentials': '*' },
    credentials: 'include',
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error(await res.text());
  }
};

export const loginCredentials = async (
  email: string,
  password: string,
  callback = '/dashboard',
) => {
  const { signIn } = await import('next-auth/react');

  const absCallback = callback.startsWith('http')
    ? callback
    : `${window.location.origin}${callback}`;

  const res = await signIn('credentials', {
    email,
    password,
    redirect: false,
    callbackUrl: absCallback,
  });

  if (res?.error) {
    throw new Error('Invalid credentials');
  }
};
