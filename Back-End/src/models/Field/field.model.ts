import { z } from 'zod';

export const FieldInput = z.object({
    name: z.string().min(1),
    validations: z.record(z.any()),
    type: z.string().min(1),
    options: z.array(z.string()).default([])
});

export type FieldInputType = z.infer<typeof FieldInput>;
