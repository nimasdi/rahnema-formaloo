// src/models/formModel.ts

import { z } from 'zod';
import { Schema, model, Document } from 'mongoose';

export interface IField {
    type: string;  // e.g., text, checkbox, radio, dropdown
    label: string;
    options?: string[]; // For radio and dropdown fields
    required?: boolean;
    maxLength?: number;
}

export interface IForm extends Document {
    fields: IField[];
    publish: boolean;
    url: string;
    user_username: string;
    form_id: string;
    title: string;
}

const fieldSchema = new Schema<IField>({
    type: { type: String, required: true },
    label: { type: String, required: true },
    options: [String],
    required: Boolean,
    maxLength: Number
});

const formSchema = new Schema<IForm>({
    fields: [fieldSchema],
    publish: { type: Boolean, default: false },
    url: { type: String, required: true },
    user_username: { type: String, required: true },
    form_id: { type: String, required: true },
    title: { type: String, required: true }
});

export const Form = model<IForm>('Form', formSchema);




export const CreateFormInput = z.object({
    fields: z.array(z.string()),
    publish: z.boolean(),
    user_username: z.string().min(1),
    title: z.string().min(1)
});

export type CreateForm = z.infer<typeof CreateFormInput>;