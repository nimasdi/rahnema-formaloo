import request from 'supertest';
import { v4 } from 'uuid';
import User from '../src/database/User/user.entity';
import Form from '../src/database/Form/form.entity';
import { initTestServer } from './appTest';
import { makeApp } from '../src/app';
import MongoDBConnection from '../src/database/connect';
import FillForm from '../src/database/FormAnswers';
import { seedForm } from '../src/database/seed.form';
import { FillFormRepository } from '../src/repositories/FillForm.repository';
import { FillFormService } from '../src/services/FillForm.service';
import { FormRepository } from '../src/repositories/Form.repo';
import { UserRepository } from '../src/repositories/User.repo';
import { FormService } from '../src/services/Form.service';


let app: any

beforeAll(async () => {

    const formRepository = new FillFormRepository(FillForm)
    const formService = new FillFormService(formRepository)
    const formRepository2 = new FormRepository(Form)
    const userRepository = new UserRepository(User);
    const formService2 = new FormService(formRepository2, userRepository);
    // const uri = process.env.MONGO_URI || '';
    const uri = "mongodb://localhost:27017/rahnema-formaloo";
    const dbConnection = new MongoDBConnection(uri);

    await dbConnection.connect().then(async () => {
        await seedForm()
        app = makeApp(formService,formService2)
    }).catch(err => console.log("not connected to db"))

})

describe('Form Creation', () => {

    it('should create a form for the user and return 201', async () => {

        const validFormInput = {
            fields: [
                {
                    "name": "First Field",
                    "validations": { "required": true },
                    "type": "string",
                    "options": ["Option1", "Option2"]
                },
                {
                    "name": "Second Field",
                    "validations": { "minLength": "5" },
                    "type": "string",
                    "options": ["OptionA", "OptionB"]
                }
            ],
            publish: false,
            title: "ssss"
        }

        const response = await request(app)
            .post(`/user/zooo/createform`)
            .send(validFormInput)
            .expect('Content-Type', /json/)
            .expect(201);
    });

    it('should return 400 if form input is invalid', async () => {

        const invalidFormInput = {
            fields: ['field1', 'field2'],
            publish: true,
        }

        const response = await request(app)
            .post(`/user/zooo/createform`)
            .send(invalidFormInput)
            .expect('Content-Type', /json/)
            .expect(400);
    });
});
