import request from 'supertest';
import { v4 } from 'uuid';
import mongoose from 'mongoose';
import User from '../src/database/User/user.entity';
import Form from '../src/database/Form/form.entity';
import Field from '../src/database/Field/field.entity';
import { initTestServer } from './appTest';

let app: any;

beforeAll(async () => {
    app = await initTestServer();
});

afterAll(async () => {
    await mongoose.connection.close();
});

describe('Form Creation and Retrieval', () => {
    let userId: mongoose.Types.ObjectId;
    let formId: mongoose.Types.ObjectId;
    let fieldId: mongoose.Types.ObjectId;

    it('should return all forms created by the user', async () => {
        const response = await request(app)
            .get(`/hooo/forms`)
            .expect('Content-Type', /json/)
            .expect(200);

        expect(response.body).toBeInstanceOf(Array);
        expect(response.body.length).toBeGreaterThan(0);

    });
});
