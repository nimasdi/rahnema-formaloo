import { Router } from "express";
import { FillFormService } from "../services/FillForm.service";

export const makeFillFormRoute = (fillFormService: FillFormService) => {
    const fillFormRoutes = Router()

    fillFormRoutes.get("/getResult/:formID",async (req,res,next) => {
        try {
            const formID = req.params.formID
    
            const filledFormResult = await fillFormService.getFormsByFormID(formID)
    
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
    
            const filledFormResult = await fillFormService.createForm(formID, answers)
    
            res.status(200).json({result : filledFormResult})
        } catch (error) {
            res.send(400).json(error)
        }
    })

    return fillFormRoutes

}

