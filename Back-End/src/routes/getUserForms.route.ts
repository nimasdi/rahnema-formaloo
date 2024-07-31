import express from 'express';
import { FormRepository } from '../repositories/Form.repo';
import Form from '../database/Form/form.entity';
import { UserRepository } from '../repositories/User.repo';
import User from '../database/User/user.entity';
import { FormService } from '../services/Form.service';


export const router = express.Router();

//TODO: remove these
const formRepository = new FormRepository(Form);
const userRepository = new UserRepository(User);
const formService = new FormService(formRepository, userRepository);

router.get('/:username/forms', async (req, res) => {
    try {
        const username = req.params.username;
        const forms = await formService.getFormsByUserUsername(username);
        res.status(200).json(forms);
    } catch (error) {
        res.status(400).json({message: "user doesnt exist"});
    }
});

