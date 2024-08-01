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

    let app: Express;

    beforeAll(async () => {

        const formRepository = new FillFormRepository(FillForm)
        const formService = new FillFormService(formRepository)
        const uri = process.env.MONGO_URI || '';
        const dbConnection = new MongoDBConnection(uri);

        await dbConnection.connect().then(async () => {
            await seedForm()
            app = makeApp(formService)
        }).catch(err => console.log("not connected to db"))

    })

    it("should return 200 if data is valid", async ()=>{

        const filledForm = {
            formID: "66a93f98fc6427e8d2c5f28f",
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
            formID: "2323233443",
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
            formID: "j23232nnmd3s434342323",
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