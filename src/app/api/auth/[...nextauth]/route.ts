import NextAuth, { NextAuthOptions, Account, User, Session } from 'next-auth';
import Google from 'next-auth/providers/google';
import { JWT } from 'next-auth/jwt';

type SignIn = {
  account: Account | null;
};

type JwtFn = {
  token: JWT;
  account: Account | null;
};

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
  ],
  pages: {
    signIn: '/auth/login',
  },
  callbacks: {
    async signIn({ account }: SignIn) {
      const idToken = account?.id_token;
      const r = await fetch(`${process.env.NEXT_API_URL}/auth/google`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ idToken }),
      });
      if (!r.ok) return false;
      const { accessToken } = await r.json();

      (account as Account).backendAccess = accessToken;

      return true;
    },
    async jwt({ token, account }: JwtFn) {
      return {
        ...token,
        accessToken: account?.backendAccess,
      };
    },
    async session({ session, token }: SessionFn) {
      return { ...session, accessToken: token.accessToken };
    },
    async redirect({ url, baseUrl }) {
      if (url.startsWith(`${baseUrl}/api/auth/callback`)) {
        return `/dashboard`;
      }
      if (url.startsWith(`${baseUrl}/auth/login`)) {
        return `/dashboard`;
      }

      return url.startsWith('/') ? url : baseUrl;
    },
  },
};
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
