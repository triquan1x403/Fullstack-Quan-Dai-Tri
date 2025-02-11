import { z } from 'zod';

export const getResourceDetailValidator = {
  params: z.object({
    id: z.string().uuid(),
  }),
};

export type GetResourceDetailParamSchema = z.infer<typeof getResourceDetailValidator.params>;
