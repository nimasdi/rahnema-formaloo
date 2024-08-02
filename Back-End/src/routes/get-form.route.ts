import express from 'express';
import { FormService } from '../services/Form.service';


export const makeGetFormRoute = (formService: FormService) => {
    const router = express.Router();

    router.get('/getform/:formid', async (req, res) => {
        try {
            const form_id = req.params.formid;
            const form = await formService.getFormByFormId(form_id);
            res.status(200).json(form);
        } catch (error) {
            res.status(400).json({ message: "user doesnt exist" });
        }
    });

    return router;
}