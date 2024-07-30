import { z } from 'zod';

export const CreateFormInput = z.object({
    fields: z.array(z.string()),
    publish: z.boolean(),
    user_username: z.string().min(1),
    title: z.string().min(1)
});

export type CreateForm = z.infer<typeof CreateFormInput>;
