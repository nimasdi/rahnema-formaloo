import { IForm } from '../database/Form/form.entity';
import { FormRepository } from '../repositories/Form.repo';
import { UserRepository } from '../repositories/User.repo';
import { v4 } from 'uuid';
import { ZodError } from 'zod';
import mongoose from 'mongoose';
import { CreateForm, CreateFormInput } from '../models/Form/form.model';

export class FormService {
    constructor(
        private formRepository: FormRepository,
        private userRepository: UserRepository
    ) { }

    async createForm(formInput: CreateForm): Promise<IForm> {
        try {
            const input = CreateFormInput.parse(formInput);

            let user = await this.userRepository.findOneByUsername(input.user_username);
            if (user === null) {
                user = await this.userRepository.createUser({ username: input.user_username });
            }

            const form_id = v4();
            const url = `http://localhost:3000/forms/${form_id}`;

            const completeFormInput = {
                ...input,
                form_id,
                url
            };

            const newForm = await this.formRepository.createForm(completeFormInput);

            const formId = newForm._id as mongoose.Types.ObjectId;

            user.forms.push(formId);
            await user.save();

            return newForm;
        } catch (error) {
            if (error instanceof ZodError) {
                throw new Error(`Validation error`);
            }
            throw new Error(`Error creating form`);
        }
    }

    async getFormsByUserUsername(username: string): Promise<IForm[]> {
        return await this.formRepository.getFormsByUserUsername(username);
    }

    async getFormByFormId(form_id: string): Promise<IForm> {
        const form = await this.formRepository.getFormByFormId(form_id);
        if (!form) {
            throw new Error('Form not found');
        }
        return form;
    }
}
