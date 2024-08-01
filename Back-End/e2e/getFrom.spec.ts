import request from 'supertest';
import { v4 } from 'uuid';
import mongoose from 'mongoose';
import User from '../src/database/User/user.entity';
import Form from '../src/database/Form/form.entity';
import Field from '../src/database/Field/field.entity';
import { initTestServer } from './appTest';
import { makeApp } from '../src/app';
import MongoDBConnection from '../src/database/connect';
import FillForm from '../src/database/FormAnswers';
import { seedForm } from '../src/database/seed.form';
import { FillFormRepository } from '../src/repositories/FillForm.repository';
import { FormRepository } from '../src/repositories/Form.repo';
import { UserRepository } from '../src/repositories/User.repo';
import { FillFormService } from '../src/services/FillForm.service';
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

describe('Form Creation and Retrieval', () => {
    let userId: mongoose.Types.ObjectId;
    let formId: mongoose.Types.ObjectId;
    let fieldId: mongoose.Types.ObjectId;

    it('should return all forms created by the user', async () => {
        const response = await request(app)
            .get(`/user/hooo/forms`)
            .expect('Content-Type', /json/)
            .expect(200);

        expect(response.body).toBeInstanceOf(Array);
        expect(response.body.length).toBeGreaterThan(0);

    });
});
