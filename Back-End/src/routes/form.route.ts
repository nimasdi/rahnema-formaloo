import { Router } from 'express';
import { publishForm, updateForm } from '../controller/controller';

const router = Router();

router.put('/forms/:formId', updateForm);

router.put('/forms/:id/publish', publishForm);



export default router;
