import express from "express"
import { fillFormRoutes } from "./routes/fillForm.route"

import dotenv from "dotenv-flow"
dotenv.config()

export const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended:true }))

app.use("/fillForm",fillFormRoutes)

app.use((req,res,next) => {
    res.status(404).send("Not Found!")
})

