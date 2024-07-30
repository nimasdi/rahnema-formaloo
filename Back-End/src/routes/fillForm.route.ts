import { Router } from "express";
import { FormService } from "../services/Form.service";

export const makeFillFormRoute = (formService: FormService) => {
    const fillFormRoutes = Router()

    fillFormRoutes.get("/getResult/:formID",async (req,res,next) => {
        try {
            const formID = req.params.formID
    
            const filledFormResult = await formService.getFormsByFormID(formID)
    
            res.status(200).json({result : filledFormResult})
        } catch (error) {
            console.log(error)
            res.send(400).json(error)
        }
    })
    
    fillFormRoutes.post("",async (req,res,next) => {
        try {
            const formID = req.body.formID
            const answers = req.body.answers
    
            const filledFormResult = await formService.createForm(formID, answers)
    
            res.status(200).json({result : filledFormResult})
        } catch (error) {
            res.send(400).json(error)
        }
    })

    return fillFormRoutes

}

