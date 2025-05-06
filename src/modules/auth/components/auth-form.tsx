'use client';

import type React from 'react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, EyeOff, Loader2 } from 'lucide-react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import type { z } from 'zod';
import {
  Button,
  Input,
  Label,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@core/ui';
import { SocialButton } from '@auth/components/social-button';
import { loginCredentials, registerUser } from '@core/lib/auth';
import { signinSchema, signupSchema } from '@auth/validators';
import { FieldErrors, FieldValues, useForm } from 'react-hook-form';
import { useToast } from '@core/hooks/use-toast';

interface AuthFormProps {
  initialAuthMode?: 'signin' | 'signup';
}

type SignUpForm = z.infer<typeof signupSchema>;
type SignInForm = z.infer<typeof signinSchema>;

export function AuthForm({ initialAuthMode = 'signin' }: AuthFormProps) {
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>(initialAuthMode);
  const [showPassword, setShowPassword] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
    setError,
    reset,
  } = useForm<SignUpForm | SignInForm>({
    resolver: zodResolver(authMode === 'signup' ? signupSchema : signinSchema),
    defaultValues: { email: '', password: '', name: '' } as any,
  });

  const onSubmit = async (values: FieldValues) => {
    try {
      if (authMode === 'signup') {
        await registerUser(values as SignUpForm);
      }
      await loginCredentials(values.email, values.password, '/dashboard');

      router.push('/dashboard');
    } catch (e: any) {
      toast({
        title: 'Error',
        description: e.message ?? 'Authentication failed',
        variantStyle: 'error',
      });
    }
  };

  const onErrors = (errors: FieldErrors) => {
    if (Object.keys(errors).length > 0) {
      Object.keys(errors).forEach((error) => {
        const errorMessage =
          typeof errors[error]?.message === 'string' ? errors[error]?.message : 'An error occurred';

        toast({
          title: 'Error',
          description: errorMessage,
          variantStyle: 'error',
        });
      });
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleAuthMode = () => {
    setAuthMode(authMode === 'signin' ? 'signup' : 'signin');
    reset();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="border-none shadow-xl">
        <CardHeader className="space-y-1 pb-4">
          <CardTitle className="text-2xl font-bold">
            {authMode === 'signin' ? 'Welcome back' : 'Create an account'}
          </CardTitle>
          <CardDescription>
            {authMode === 'signin'
              ? 'Sign in to your account to continue'
              : 'Enter your information to create an account'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6">
            <div className="grid grid-cols-1 gap-3">
              <SocialButton provider="google" />
            </div>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-2 text-muted-foreground/80">or continue with</span>
              </div>
            </div>

            <form onSubmit={handleSubmit(onSubmit, onErrors)} className="space-y-4">
              <AnimatePresence mode="wait">
                {authMode === 'signup' && (
                  <motion.div
                    key="name"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-2"
                  >
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      placeholder="John Doe"
                      {...register('name')}
                      disabled={isSubmitting}
                    />
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  {...register('email')}
                  placeholder="hello@example.com"
                  disabled={isSubmitting}
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  {/* {authMode === 'signin' && (
                    <button
                      type="button"
                      onClick={() => {}}
                      className="text-xs text-primary hover:underline"
                    >
                      Forgot password?
                    </button>
                  )} */}
                </div>
                <div className="relative">
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    id="password"
                    {...register('password')}
                    disabled={isSubmitting}
                    className="pr-10"
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground/80 hover:text-muted-foreground"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }} className="pt-2">
                <Button
                  type="submit"
                  className="w-full bg-primary hover:bg-primary-hover"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      {authMode === 'signin' ? 'Signing in...' : 'Creating account...'}
                    </>
                  ) : authMode === 'signin' ? (
                    'Sign in'
                  ) : (
                    'Create account'
                  )}
                </Button>
              </motion.div>
            </form>

            <div className="text-center text-sm">
              {authMode === 'signin' ? "Don't have an account? " : 'Already have an account? '}
              <button
                type="button"
                onClick={toggleAuthMode}
                className="font-medium text-primary hover:underline"
              >
                {authMode === 'signin' ? 'Sign up' : 'Sign in'}
              </button>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
