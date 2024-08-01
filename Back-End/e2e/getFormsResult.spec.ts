import Request  from "supertest";
import { makeApp } from "../src/app";
import FillForm from "../src/database/FormAnswers";
import { FillFormRepository } from "../src/repositories/FillForm.repository";
import { FillFormService } from "../src/services/FillForm.service";
import MongoDBConnection from "../src/database/connect";
import { seedForm } from "../src/database/seed.form";
import { Express } from "express"

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
    
    it("should return list of forms with specific form id", async ()=>{
        const formId: string = '1234567893477346';

        await Request(app)
        .post(`/fillForm/getResult/${formId}`)
        .send({formId})
        .expect(200)

    })

    it("should return 403 if form_id is not mongodb_id", async ()=>{
        const formId: string = '123456746';

        await Request(app)
        .post(`/fillForm/getResult/${formId}`)
        .send({formId})
        .expect(403)
    })

    it("should return 404 if form_id is not exist", async ()=>{
        const formId: string = '123456746';

        await Request(app)
        .post(`/fillForm/getResult/${formId}`)
        .send({formId})
        .expect(404)
        .expect({message: "form not found"})
    })
})