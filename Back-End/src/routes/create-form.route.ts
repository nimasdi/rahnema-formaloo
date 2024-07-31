import { Router, Request, Response } from 'express';
import { ZodError } from 'zod';
import { FormService } from '../services/Form.service';
import { FormRepository } from '../repositories/Form.repo';
import Form from '../database/Form/form.entity';
import { UserRepository } from '../repositories/User.repo';
import User from '../database/User/user.entity';


//TODO
const formservice = new FormService(new FormRepository(Form), new UserRepository(User))

export const router = Router();

router.post('/:username/createform', async (req: Request, res: Response) => {
    try {
        const { username } = req.params;
        const formInput = { ...req.body, user_username: username };

        const newForm = await formservice.createForm(formInput);

        res.status(201).json(newForm);
    } catch (error) {

        return res.status(400).json({ message: 'Validation error' });

    }
});

