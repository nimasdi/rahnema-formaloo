import express from 'express';
import { FormService } from '../services/Form.service';


export const makeUserFromRoute = (formService: FormService) => {
    const router = express.Router();

    router.get('/:username/forms', async (req, res) => {
        try {
            const username = req.params.username;
            const forms = await formService.getFormsByUserUsername(username);
            res.status(200).json(forms);
        } catch (error) {
            res.status(400).json({ message: "user doesnt exist" });
        }
    });

    return router;
}