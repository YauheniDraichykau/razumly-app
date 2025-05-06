import NextAuth, { NextAuthOptions, Session } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import Google from 'next-auth/providers/google';
import { JWT } from 'next-auth/jwt';

type SessionFn = {
  session: Session;
  token: JWT;
};

const api = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:4000';

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
        const r = await fetch(`${api}/auth/login`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify({
            email: creds?.email || '',
            password: creds?.password || '',
          }),
        });

        if (!r.ok) return null;
        const { accessToken } = (await r.json()) as { accessToken: string };

        return { id: creds?.email || '', accessToken };
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

      const r = await fetch(`${api}/auth/google`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ idToken: account.id_token }),
      });

      if (!r.ok) {
        return false;
      }

      const { accessToken } = (await r.json()) as { accessToken: string };
      (account as typeof account & { backendAccess?: string }).backendAccess = accessToken;

      return true;
    },
    async jwt({ token, account, user }) {
      if (account && 'backendAccess' in account) {
        token.accessToken = (account as any).backendAccess;
      }
      if (user && 'accessToken' in user) {
        token.accessToken = (user as any).accessToken;
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
