

import { Request, Response } from 'express';
import { FormService, toggleFormPublishStatus } from '../services/Form.services';
import Form from '../database/Form/form.entity';


export const updateForm = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { fields, publish, user_username, title } = req.body;

  try {
    const updatedForm = await Form.findOneAndUpdate(
      { form_id: id },
      { fields, publish, user_username, title },
      { new: true }
    );

    if (!updatedForm) {
      return res.status(404).json({ error: 'Form not found' });
    }

    res.status(200).json(updatedForm);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: `Failed to update form: ${error.message}` });
    } else {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
};








export const publishForm = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { publish } = req.body;

  if (typeof publish !== 'boolean') {
    return res.status(400).json({ error: 'Invalid publish status' });
  }


  try {
    const updatedForm = await Form.findOneAndUpdate(
      { form_id: id },
      { publish },
      { new: true }
    );

    if (!updatedForm) {
      return res.status(404).json({ error: 'Form not found' });
    }

    res.status(200).json(updatedForm);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: `Failed to update form: ${error.message}` });
    } else {
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }
};
