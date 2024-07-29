import { Schema, model, Document } from 'mongoose';

interface IField extends Document {
    name: string,
    validations: Record<string, string>;
    type: string;
    options: string[];
}

const FieldSchema = new Schema<IField>({
    name: {
        type: String,
        required: true
    },
    validations: {
        type: Map,
        of: Schema.Types.Mixed,
    },
    type: {
        type: String,
        required: true,
        enum: ['string', 'number', 'boolean', 'date'],
    },
    options: [String]
});


const Field = model<IField>('Field', FieldSchema);

export { IField };
export default Field;
