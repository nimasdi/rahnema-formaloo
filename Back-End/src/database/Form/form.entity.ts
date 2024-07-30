import { Schema, model, Document } from 'mongoose';
import { IField } from '../Field/field.entity';

interface IForm extends Document {
    fields: IField[];
    publish: boolean,
    url: string,
    user_username: string,
    form_id: string,
    title: string
}

const FormSchema = new Schema<IForm>({
    fields: [{
        type: Schema.Types.ObjectId,
        ref: 'Field'
    }],
    publish: {
        type: Boolean,
        required: true
    },
    url: {
        type: String,
        unique : true
    },
    user_username: {
        type: String,
        required: true
    },
    form_id: {
        type: String,
        required: true,
        unique: true
    },
    title: {
        type: String,
        required: true
    }
});


const Form = model<IForm>('Form', FormSchema);

export {IForm};
export default Form;