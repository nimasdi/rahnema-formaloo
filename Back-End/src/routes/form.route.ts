// src/routes/formRoutes.ts

import { Router } from 'express';
import { FormController } from '../controller/controller';


const router = Router();

router.put('/forms/:formId', FormController.updateForm);

export default router;
