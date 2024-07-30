import Request  from "supertest";
import { Express } from "express";
import { makeApp } from "../src/app";
import MongoDBConnection from "../src/database/connect";
import { FormRepository } from "../src/repositories/Form.repository";
import { FormService } from "../src/services/Form.service";
import Form from "../src/database/FormAnswers";
import { seedForm } from "../src/database/seed.form";

describe("getFormResult",()=>{
    let app: Express;

    beforeAll(async () => {

        const formRepository = new FormRepository(Form)
        const formService = new FormService(formRepository)
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