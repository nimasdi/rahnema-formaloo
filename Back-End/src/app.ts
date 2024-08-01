import express from "express"
import { makeFillFormRoute } from "./routes/fillForm.route"
import { FillFormService } from "./services/FillForm.service"
import { makeCreateFormRoute } from "./routes/create-form.route";
import { makeUserFromRoute } from "./routes/getUserForms.route";
import { FormService } from "./services/Form.service";

export const makeApp = (fillFormService: FillFormService , formService: FormService) => {

    const app = express()

    app.use(express.json())
    app.use(express.urlencoded({ extended: true }))

    app.use("/fillForm", makeFillFormRoute(fillFormService))
    app.use('/user', makeCreateFormRoute(formService))
    app.use('/user', makeUserFromRoute(formService))

    const errorHandling: express.ErrorRequestHandler = (error, req, res, next) => {

        if (error instanceof Error) {
            res.status(400).json({ message: error });
        }

        res.status(500).send()

    }

    app.use(errorHandling)

    app.use((req, res, next) => {
        res.status(404).send("Not Found!")
    })

    return app
}








