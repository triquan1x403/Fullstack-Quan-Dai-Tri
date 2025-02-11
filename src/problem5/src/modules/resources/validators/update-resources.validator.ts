import { z } from 'zod';

export const updateResourceValidator = {
  params: z.object({
    id: z.string().uuid(),
  }),
  body: z.object({
    firstName: z.string().min(1).optional(),
    lastName: z.string().min(1).optional(),
  }),
} as const;

export type UpdateResourceParamSchema = z.infer<typeof updateResourceValidator.params>;
export type UpdateResourceBodySchema = z.infer<typeof updateResourceValidator.body>;
