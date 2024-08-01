import Request  from "supertest";
import { makeApp } from "../src/app";
import { Express } from "express"
import { FillFormRepository } from "../src/repositories/FillForm.repository";
import { FillFormService } from "../src/services/FillForm.service";
import MongoDBConnection from "../src/database/connect";
import { seedForm } from "../src/database/seed.form";
import FillForm from "../src/database/FormAnswers";

// import { createGroupHelper } from "./function.hepler";

describe("getFormResult",()=>{
    let app : Express
    beforeAll(()=>{
        const fillFormRepository = new FillFormRepository(FillForm)
        const fillFormService = new FillFormService(fillFormRepository)
        const uri = process.env.MONGO_URI || '';
        const dbConnection = new MongoDBConnection(uri);

        dbConnection.connect().then(async () => {
        await seedForm()
        const app = makeApp(fillFormService)

        const PORT = 3000

        app.listen(PORT,() => {
            console.log(`app run on port ${PORT}`)
        })
        }).catch(err => console.log("not connected to db"))

    })

    it("should return 200 if data is valid", async ()=>{

        const filledForm = {
            formId: "j23232nnmd32323",
            answers: {
                "name":"bahar",
                "family":"haghighat",
                "age":"25",
                "phone":"09917780974"
            }
        }

        await Request(app)
        .post("/fillForm")
        .send(filledForm)
        .expect(200)

    })

    it("should return 403 if form_id is not mongodb_id", async ()=>{
        const filledForm = {
            formId: "2323233443",
            answers: {
                "name":"bahar",
                "family":"haghighat",
                "age":"25",
                "phone":"09917780974"
            }
        }

        await Request(app)
        .post("/fillForm")
        .send(filledForm)
        .expect(403)
    })

    it("should return 404 if form_id is not exist", async ()=>{
        const filledForm = {
            formId: "j23232nnmd3s434342323",
            answers: {
                "name":"bahar",
                "family":"haghighat",
                "age":"25",
                "phone":"09917780974"
            }
        }

        await Request(app)
        .post("/fillForm")
        .send(filledForm)
        .expect(404)
        .expect({message: "form not found"})
    })
})