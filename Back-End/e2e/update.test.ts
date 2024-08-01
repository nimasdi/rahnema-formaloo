
import request from 'supertest';
import express from 'express';
import { updateForm } from '../src/controller/controller'; 
import { Form } from '../src/models/Form';

jest.mock('../src/models/Form');

const app = express();
app.use(express.json());
app.put('/forms/:id', updateForm);

describe('Update Form API', () => {
  let formId: string;

  beforeAll(() => {
    formId = '605c72ef3f1b2c001f647f9e';
  });

  it('should update an existing form', async () => {
    const mockForm = {
      _id: formId,
      fields: ['field1', 'field2'],
      publish: true,
      user_username: 'test_user',
      title: 'Updated Test Form'
    };

    (Form.findByIdAndUpdate as jest.Mock).mockResolvedValue(mockForm);

    const response = await request(app)
      .put(`/forms/${formId}`)
      .send({ 
        fields: ['field1', 'field2'], 
        publish: true, 
        user_username: 'test_user', 
        title: 'Updated Test Form' 
      })
      .expect(200);

    expect(response.body.title).toBe('Updated Test Form');
    expect(response.body._id).toBe(formId);
  });

  it('should return 404 if form not found', async () => {
    (Form.findByIdAndUpdate as jest.Mock).mockResolvedValue(null); 

    const response = await request(app)
      .put(`/forms/${formId}`)
      .send({ 
        fields: ['field1', 'field2'], 
        publish: true, 
        user_username: 'test_user', 
        title: 'Updated Test Form' 
      })
      .expect(404);

    expect(response.body.error).toBe('Form not found');
  });

  it('should return 500 if there is an internal server error', async () => {
    (Form.findByIdAndUpdate as jest.Mock).mockRejectedValue(new Error('Internal Server Error')); 

    const response = await request(app)
      .put(`/forms/${formId}`)
      .send({ 
        fields: ['field1', 'field2'], 
        publish: true, 
        user_username: 'test_user', 
        title: 'Updated Test Form' 
      })
      .expect(500);

    console.log(response.body);

    expect(response.body.error).toBe('Failed to update form: Internal Server Error');
  });
});
