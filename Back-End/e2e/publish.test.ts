import request from 'supertest';
import express from 'express';
import { Form } from '../src/models/Form'; // Adjust the path as necessary
import { publishForm } from '../src/controller/controller'; // Adjust the path as necessary

jest.mock('../src/models/Form'); // Adjust the path as necessary

const app = express();
app.use(express.json());
app.put('/forms/:id/publish', publishForm);

describe('Publish/Unpublish Form API', () => {
  let formId: string;

  beforeAll(() => {
    formId = '605c72ef3f1b2c001f647f9e';
  });

  it('should publish a form', async () => {
    const mockForm = {
      _id: formId,
      fields: ['field1', 'field2'],
      publish: true,
      user_username: 'test_user',
      title: 'Test Form'
    };

    (Form.findByIdAndUpdate as jest.Mock).mockResolvedValue(mockForm);

    const response = await request(app)
      .put(`/forms/${formId}/publish`)
      .send({ publish: true })
      .expect(200);

    expect(response.body.publish).toBe(true);
    expect(response.body._id).toBe(formId);
  });

  it('should unpublish a form', async () => {
    const mockForm = {
      _id: formId,
      fields: ['field1', 'field2'],
      publish: false,
      user_username: 'test_user',
      title: 'Test Form'
    };

    (Form.findByIdAndUpdate as jest.Mock).mockResolvedValue(mockForm);

    const response = await request(app)
      .put(`/forms/${formId}/publish`)
      .send({ publish: false })
      .expect(200);

    expect(response.body.publish).toBe(false);
    expect(response.body._id).toBe(formId);
  });

  it('should return 400 if publish status is invalid', async () => {
    const response = await request(app)
      .put(`/forms/${formId}/publish`)
      .send({ publish: 'invalid' })
      .expect(400);

    expect(response.body.error).toBe('Invalid publish status');
  });

  it('should return 404 if form not found', async () => {
    (Form.findByIdAndUpdate as jest.Mock).mockResolvedValue(null); // Simulate not found

    const response = await request(app)
      .put(`/forms/${formId}/publish`)
      .send({ publish: true })
      .expect(404);

    expect(response.body.error).toBe('Form not found');
  });
});
