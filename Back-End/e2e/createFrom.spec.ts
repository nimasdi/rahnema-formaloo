import request from 'supertest';
import { v4 } from 'uuid';
import User from '../src/database/User/user.entity';
import Form from '../src/database/Form/form.entity';
import { initTestServer } from './appTest';

let app: any;

beforeAll(async () => {
    app = await initTestServer(); 
});

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
            .post(`/zooo/createform`)
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
            .post(`/zooo/createform`)
            .send(invalidFormInput)
            .expect('Content-Type', /json/)
            .expect(400);
    });
});
