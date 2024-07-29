import Request  from "supertest";
import { app } from "../src/app";
// import { createGroupHelper } from "./function.hepler";

describe("getFormResult",()=>{
    it("should return list of forms with specific form id", async ()=>{
        const formId: number = 1234567893477346;

        const resultForms = await Request(app)
        .post("/createExpense")
        .send({formId})
        .expect(200)

    })

    it("should return 404 if form_id is not mongodb_id", async ()=>{
    })

    it("should return 404 if form_id is not exist", async ()=>{
    })
})