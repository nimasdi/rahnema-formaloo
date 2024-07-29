import { Router } from "express";
import { FormService } from "../services/Form.service";
import { FormRepository } from "../repositories/Form.repository";
import Form from "../database/FormAnswers";

export const fillFormRoutes = Router()

const formRepository = new FormRepository(Form)
const formService = new FormService(formRepository)

fillFormRoutes.get("/getResult/:formID",(req,res,next) => {
    try {
        const formID = req.params.formID

        const filledFormResult = formService.getFormsByFormID(formID)

        res.status(200).json({result : filledFormResult})
    } catch (error) {
        res.send(400).json(error)
    }
})

fillFormRoutes.post("",(req,res,next) => {
    try {
        const formID = req.body.formID
        const answers = req.body.answers

        const filledFormResult = formService.createForm(formID, answers)

        res.status(200).json({result : filledFormResult})
    } catch (error) {
        res.send(400).json(error)
    }
})