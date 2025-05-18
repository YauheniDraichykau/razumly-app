import NextAuth, { NextAuthOptions, Session } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import Google from 'next-auth/providers/google';
import { JWT } from 'next-auth/jwt';
import { httpService } from '@core/lib/http';

type SessionFn = {
  session: Session;
  token: JWT;
};

export const authOptions: NextAuthOptions = {
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    Credentials({
      id: 'credentials',
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(creds) {
        if ('accessToken' in creds!) {
          return { id: creds?.email || '', accessToken: creds.accessToken };
        }

        return null;
      },
    }),
  ],
  pages: {
    signIn: '/auth',
  },
  callbacks: {
    async signIn({ account }) {
      if (account?.provider !== 'google') {
        return true;
      }
      if (!account.id_token) {
        return false;
      }

      try {
        const response = await httpService.post('/auth/google', { idToken: account.id_token });

        console.log(response.headers);

        const { accessToken } = response.data as { accessToken: string };
        (account as typeof account & { backendAccess?: string }).backendAccess = accessToken;

        return true;
      } catch {
        return false;
      }
    },
    async jwt({ token, account, user }) {
      if (account && 'backendAccess' in account) {
        token.accessToken = (account as { backendAccess?: string }).backendAccess;
      }
      if (user && 'accessToken' in user) {
        token.accessToken = (user as { accessToken?: string }).accessToken;
      }
      return token;
    },
    async session({ session, token }: SessionFn) {
      return { ...session, accessToken: token.accessToken };
    },
    async redirect({ url, baseUrl }) {
      if (url.startsWith(`${baseUrl}/api/auth/callback`) || url.startsWith(`${baseUrl}/auth`)) {
        return `/app/dashboard`;
      }

      return url.startsWith('/') ? url : baseUrl;
    },
  },
  session: { strategy: 'jwt' },
  secret: process.env.NEXTAUTH_SECRET,
};
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
