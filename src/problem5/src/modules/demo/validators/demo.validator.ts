import { z } from 'zod';

export const demoValidator = {
  body: z.object({
    email: z.string().email(),
  }),
} as const;

export type DemoBodySchema = z.infer<typeof demoValidator.body>;
