import mongoose, { Model } from 'mongoose';
import Form, { IForm } from '../database/Form/form.entity';
import { CreateForm, CreateFormInput } from '../models/Form/form.model';
import Field, { IField } from '../database/Field/field.entity';

export class FormRepository {
    constructor(private model: Model<IForm>) { }

    async createForm(formInput: CreateForm): Promise<IForm> {
        try {

            const fields = await Promise.all(formInput.fields.map(async (fieldInput) => {
                const newField = new Field(fieldInput);
                await newField.save();
                return newField._id;
            }));

            const newForm = new this.model({
                ...formInput,
                fields
            });
            await newForm.save();

            return newForm;
        } catch (e) {
            console.error('Error creating form:', e);
            throw new Error(`Error creating form`);
        }
    }
}