import Request  from "supertest";
import { app } from "../src/app";
// import { createGroupHelper } from "./function.hepler";

describe("getFormResult",()=>{

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
        .post("/fillForm/fillForm")
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
        .post("/fillForm/fillForm")
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
        .post("/fillForm/fillForm")
        .send(filledForm)
        .expect(404)
        .expect({message: "form not found"})
    })
})