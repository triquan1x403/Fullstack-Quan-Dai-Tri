import { z } from 'zod';

export const createResourceValidator = {
  body: z.object({
    firstName: z.string().min(1),
    lastName: z.string().min(1),
  }),
} as const;

export type CreateResourceBodySchema = z.infer<typeof createResourceValidator.body>;
