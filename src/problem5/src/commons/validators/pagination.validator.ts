import { z } from 'zod';

export const paginationValidator = {
  query: z.object({
    take: z
      .string()
      .optional()
      .transform((val) => (val ? parseInt(val, 10) : 10))
      .pipe(
        z.number().int().min(1, { message: 'take must be greater than or equal to 1' }).optional(),
      ),
    page: z
      .string()
      .optional()
      .transform((val) => (val ? parseInt(val, 10) : 1))
      .pipe(
        z.number().int().min(1, { message: 'page must be greater than or equal to 1' }).optional(),
      ),
  }),
} as const;

export type PaginationQuerySchema = z.infer<typeof paginationValidator.query>;
