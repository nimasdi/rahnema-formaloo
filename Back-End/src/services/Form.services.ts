

import { CreateForm, Form, IForm } from '../models/Form';


export class FormService {
    static async updateForm(formId: string, updateData: Partial<CreateForm>): Promise<IForm | null> {
        try {
            const updatedForm = await Form.findByIdAndUpdate(formId, updateData, { new: true }).exec();
            return updatedForm;
        } catch (error) {
          if(error instanceof Error){
            throw new Error(`Failed to update form: ${error.message}`);
          }
          else {
            throw new Error('Failed to update form: unkown');
          }
        }
    }
}
