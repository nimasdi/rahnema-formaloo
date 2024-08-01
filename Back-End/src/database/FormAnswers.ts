import mongoose, { Schema, Document, Model } from 'mongoose';

// Define the TypeScript interface for the document
export interface IFillForm extends Document {
  formID: string;
  answers: Record<string, any>; // This is the TypeScript type for an object
}

// Create the schema corresponding to the document interface
const FormSchema: Schema = new Schema({
  formID: { type: String, required: true },
  answers: { type: Object, required: true }
});

// Create the model using the schema and the document interface
const Form: Model<IFillForm> = mongoose.model<IFillForm>('Form', FormSchema);

export default Form;