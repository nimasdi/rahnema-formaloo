import Request  from "supertest";
import { app } from "../src/app";
// import { createGroupHelper } from "./function.hepler";

describe("getFormResult",()=>{
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