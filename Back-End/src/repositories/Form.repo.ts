import mongoose, { Model } from 'mongoose';
import Form, { IForm } from '../database/Form/form.entity';
import { CreateForm, CreateFormInput } from '../models/Form/form.model';
import Field, { IField } from '../database/Field/field.entity';
import User from '../database/User/user.entity';

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

    async getFormsByUserUsername(username: string): Promise<IForm[]> {
        const user = await User.findOne({ username }).exec();
        
        if (user === null) {
            throw new Error('User not found');
        }

        const forms = await Form.aggregate([
            { $match: { _id: { $in: user.forms } } },
            {
                $lookup: {
                    from: Field.collection.name,
                    localField: 'fields',
                    foreignField: '_id',
                    as: 'fields'
                }
            }
        ]);


        return forms as IForm[];
    }
}