import { z } from 'zod';

export const signupSchema = z.object({
  name: z.string().nonempty('Name cannot be empty').min(2, 'Name is too short'),
  email: z.string().nonempty('Email cannot be empty').email('E-mail should have a valid format'),
  password: z.string().min(6, 'Password should be at least 6 characters long'),
});

export const signinSchema = signupSchema.omit({ name: true });
