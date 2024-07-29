import { Schema, model, Document, Types } from 'mongoose';
import { IForm } from '../Form/form.entity';

interface IUser extends Document {
  username: string;
  forms: Types.ObjectId[]; // Array of ObjectId references
}

const UserSchema = new Schema<IUser>({
  username: {
    type: String,
    required: true,
    unique: true
  },
  forms: [{
    type: Schema.Types.ObjectId,
    ref: 'Form',
    default: []
  }]
});

const User = model<IUser>('User', UserSchema);

export { IUser };
export default User;
