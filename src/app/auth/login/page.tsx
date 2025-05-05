import { getServerSession } from 'next-auth/next';
import { redirect } from 'next/navigation';
import GoogleLoginButton from '@auth/components/google-login-button';
import { authOptions } from 'src/app/api/auth/[...nextauth]/route';

export default async function AuthLoginPage() {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect('/dashboard');
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-background">
      <div className="max-w-md w-full space-y-6 text-center">
        <h1 className="text-2xl font-bold text-foreground">Добро пожаловать в Razumly</h1>
        <p className="text-muted-foreground">Авторизуйтесь, чтобы упрощать медицинские документы</p>
        <GoogleLoginButton />
      </div>
    </main>
  );
}
