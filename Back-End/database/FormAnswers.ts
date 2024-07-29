import mongoose, { Schema, Document, Model } from 'mongoose';

// Define the TypeScript interface for the document
interface IForm extends Document {
  formID: number;
  answers: Record<string, any>; // This is the TypeScript type for an object
}

// Create the schema corresponding to the document interface
const FormSchema: Schema = new Schema({
  formID: { type: Number, required: true },
  answers: { type: Object, required: true }
});

// Create the model using the schema and the document interface
const Form: Model<IForm> = mongoose.model<IForm>('Form', FormSchema);

export default Form;