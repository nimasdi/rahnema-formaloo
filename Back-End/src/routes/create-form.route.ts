import { Router, Request, Response } from 'express';
import { FormService } from '../services/Form.service';


export const makeCreateFormRoute = (formService: FormService) => {

    const router = Router();

    router.post('/:username/createform', async (req: Request, res: Response) => {
        try {
            const { username } = req.params;
            const formInput = { ...req.body, user_username: username };

            const newForm = await formService.createForm(formInput);

            res.status(201).json(newForm);
        } catch (error) {

            return res.status(400).json({ message: 'Validation error' });

        }
    });

    return router
}