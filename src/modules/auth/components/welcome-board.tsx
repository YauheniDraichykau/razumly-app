'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { FileText } from 'lucide-react';
import { AuthForm } from '@auth/components/auth-form';
import { AuthBackground } from '@auth/components/auth-background';

export const WelcomeBoard = ({ mode }: { mode: 'signin' | 'signup' }) => {
  return (
    <div className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-secondary/50 p-4">
      <AuthBackground />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 w-full max-w-md"
      >
        <div className="mb-8 flex justify-center">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 100 }}
            className="flex items-center gap-2"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-white shadow-lg">
              <FileText className="h-6 w-6" />
            </div>
            <span className="text-2xl font-bold">Razumly</span>
          </motion.div>
        </div>

        <AuthForm initialAuthMode={mode} />

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-8 text-center text-sm text-muted-foreground/80"
        >
          <p>
            By using Razumly, you agree to our{' '}
            <Link href="#" className="text-primary hover:underline">
              Terms of Service
            </Link>{' '}
            and{' '}
            <Link href="#" className="text-primary hover:underline">
              Privacy Policy
            </Link>
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};
