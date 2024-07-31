import { z } from 'zod';
import { FieldInput } from '../Field/field.model';

export const CreateFormInput = z.object({
    fields: z.array(FieldInput),
    publish: z.boolean(),
    user_username: z.string().min(1),
    title: z.string().min(1)
});

export type CreateForm = z.infer<typeof CreateFormInput>;
