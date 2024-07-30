import { IForm } from '../database/Form/form.entity';
import { nanoid } from 'nanoid';
import { FormRepository } from '../repositories/Form.repo';
import { CreateForm, CreateFormInput } from '../models/Form/form.model';
import { ZodError } from 'zod';
import { UserRepository } from '../repositories/User.repo';
import {v4} from 'uuid'

export class FormService {
    constructor(
        private formRepository: FormRepository,
        private userRepository: UserRepository
    ) { }

    async createForm(formInput: CreateForm): Promise<IForm> {
        try {
            const input = CreateFormInput.parse(formInput);

            const userExists = await this.userRepository.findOneByUsername(input.user_username);

            if (userExists === null) {
                const user = this.userRepository.createUser({ username: input.user_username });
            }

            const form_id = v4();
            const url = `http://localhost:3000/forms/${form_id}`;

            const completeFormInput = {
                ...input,
                form_id,
                url
            };

            return await this.formRepository.createForm(completeFormInput);
        } catch (error) {
            throw new Error(`Error creating form`);
        }
    }
}
