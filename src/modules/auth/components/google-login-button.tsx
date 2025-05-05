'use client';
import { signIn } from 'next-auth/react';
// import { FcGoogle } from 'react-icons/fc';

export default function GoogleLoginButton() {
  return (
    <button
      onClick={() => signIn('google')}
      className="flex items-center justify-center gap-2 rounded-lg px-6 py-3
                 bg-brand text-white hover:bg-brand-hover
                 transition-colors"
    >
      {/* <FcGoogle className="h-5 w-5" /> */}
      <span className="border border-black text-black">Войти через Google</span>
    </button>
  );
}
