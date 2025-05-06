import { getServerSession } from 'next-auth/next';
import { redirect } from 'next/navigation';
import { authOptions } from 'src/app/api/auth/[...nextauth]/route';
import { WelcomeBoard } from '@auth/components/welcome-board';

type Props = {
  searchParams: { [key: string]: string | string[] | undefined };
};

export default async function AuthLoginPage({ searchParams }: Props) {
  const params = await searchParams;
  const mode = params.mode === 'signup' ? 'signup' : 'signin';
  const session = await getServerSession(authOptions);

  if (session) {
    redirect('/app/dashboard');
  }

  return <WelcomeBoard mode={mode} />;
}
