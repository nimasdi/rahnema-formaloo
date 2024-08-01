import express from "express"
import { makeFillFormRoute } from "./routes/fillForm.route"

import dotenv from "dotenv-flow"
import { FillFormService } from "./services/FillForm.service"
dotenv.config()

export const makeApp = (fillFormService: FillFormService) => {

    const app = express()

    app.use(express.json())
    app.use(express.urlencoded({ extended:true }))

    app.use("/fillForm",makeFillFormRoute(fillFormService))

    const errorHandling : express.ErrorRequestHandler = (error, req, res, next) => {
    
        if(error instanceof Error){
            res.status(400).json({message : error});
        }
    
        res.status(500).send()
    
    }
    
    app.use(errorHandling)

    app.use((req,res,next) => {
        res.status(404).send("Not Found!")
    })

    return app
}







