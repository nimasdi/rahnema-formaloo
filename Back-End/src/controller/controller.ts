// src/controllers/formController.ts

import { Request, Response } from 'express';
import { FormService } from '../services/Form.services';
import { CreateForm } from '../models/Form';


export class FormController {
    static async updateForm(req: Request, res: Response): Promise<void> {
        try {
            const formId = req.params.formId;
            const updateData: Partial<CreateForm> = req.body;

            const updatedForm = await FormService.updateForm(formId, updateData);

            if (updatedForm) {
                res.status(200).json(updatedForm);
            } else {
                res.status(404).json({ message: 'Form not found' });
            }
        } catch (error) {
            if(error instanceof Error){
            res.status(500).json({ message: `Failed to update form: ${error.message}` });
            }else {
                res.status(500).json({ message: "unnkkkkowm"});
            }
        }
    }

}
