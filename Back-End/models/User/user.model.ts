import {z} from 'zod';

export const CreateUserInput = z.object({
    username : z.string().min(1),
})

export type CreateUser = z.infer<typeof CreateUserInput>;