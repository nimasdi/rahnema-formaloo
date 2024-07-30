import mongoose, { Model } from 'mongoose';
import Form, { IForm } from '../database/Form/form.entity';
import { CreateForm, CreateFormInput } from '../models/Form/form.model';

export class FormRepository {
    constructor(private model: Model<IForm>) {}

    async createForm(formInput: CreateForm): Promise<IForm> {
        try {
            const newForm = new this.model(formInput);
            await newForm.save();
            return newForm;
        } catch (e) {
            throw new Error(`Error creating form`);
        }
    }
    }
