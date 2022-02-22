import mongoose from 'mongoose';
import request from 'supertest';
import app from '../app.js';
import AccountModel from '../models/AccountModel.js';

describe('[E2E] Testing the registration route', () => {
  beforeAll(async () => {
    await mongoose.connect('mongodb://localhost:27017/AdvancedVocabulary-TEST');
  });

  it('Should add a user with valid data to the database', async () => {
    const res = await request(app)
      .post('/api/register')
      .send({ email: 'email@test.com', password: 'Password1!' });
    expect(res.statusCode).toBe(201);
    expect(res.body.success).toBeDefined();
    expect(res.body.success).toBe(true);
    expect(await AccountModel.findOne({ email: 'email@test.com' })).not.toBe(
      null
    );
  });

  it('Should not add a user who already exists to the database', async () => {
    const res = await request(app)
      .post('/api/register')
      .send({ email: 'email@test.com', password: 'Password1!' });
    expect(res.statusCode).toBe(422);
    expect(res.body.success).toBeDefined();
    expect(res.body.success).toBe(false);
    expect(res.body.error).toBeDefined();
    expect(res.body.error).toBe('UserExistsError');
  });

  it('Should not accept an email address without a @ sign', async () => {
    const res = await request(app)
      .post('/api/register')
      .send({ email: 'emailtest.com', password: 'Password1!' });
    expect(res.statusCode).toBe(400);
    expect(res.body.success).toBeDefined();
    expect(res.body.success).toBe(false);
    expect(res.body.errors).toBeDefined();
    expect(res.body.errors).toStrictEqual([
      {
        value: 'emailtest.com',
        msg: 'Please provide a valid email address',
        param: 'email',
        location: 'body',
      },
    ]);
  });

  it('Should not accept an email address without an identifier', async () => {
    const res = await request(app)
      .post('/api/register')
      .send({ email: '@test.com', password: 'Password1!' });
    expect(res.statusCode).toBe(400);
    expect(res.body.success).toBeDefined();
    expect(res.body.success).toBe(false);
    expect(res.body.errors).toBeDefined();
    expect(res.body.errors).toStrictEqual([
      {
        value: '@test.com',
        msg: 'Please provide a valid email address',
        param: 'email',
        location: 'body',
      },
    ]);
  });

  it('Should not accept an email address without a domain', async () => {
    const res = await request(app)
      .post('/api/register')
      .send({ email: 'email@.com', password: 'Password1!' });
    expect(res.statusCode).toBe(400);
    expect(res.body.success).toBeDefined();
    expect(res.body.success).toBe(false);
    expect(res.body.errors).toBeDefined();
    expect(res.body.errors).toStrictEqual([
      {
        value: 'email@.com',
        msg: 'Please provide a valid email address',
        param: 'email',
        location: 'body',
      },
    ]);
  });

  it('Should not accept an email address without a top level domain', async () => {
    const res = await request(app)
      .post('/api/register')
      .send({ email: 'email@test', password: 'Password1!' });
    expect(res.statusCode).toBe(400);
    expect(res.body.success).toBeDefined();
    expect(res.body.success).toBe(false);
    expect(res.body.errors).toBeDefined();
    expect(res.body.errors).toStrictEqual([
      {
        value: 'email@test',
        msg: 'Please provide a valid email address',
        param: 'email',
        location: 'body',
      },
    ]);
  });

  it('Should not accept an empty string as email address', async () => {
    const res = await request(app)
      .post('/api/register')
      .send({ email: '', password: 'Password1!' });
    expect(res.statusCode).toBe(400);
    expect(res.body.success).toBeDefined();
    expect(res.body.success).toBe(false);
    expect(res.body.errors).toBeDefined();
    expect(res.body.errors).toStrictEqual([
      {
        value: '',
        msg: 'Please provide a valid email address',
        param: 'email',
        location: 'body',
      },
    ]);
  });

  it('Should not accept a password with less than 8 characters', async () => {
    const res = await request(app)
      .post('/api/register')
      .send({ email: 'password@test.com', password: 'Passw1!' });
    expect(res.statusCode).toBe(400);
    expect(res.body.success).toBeDefined();
    expect(res.body.success).toBe(false);
    expect(res.body.errors).toBeDefined();
    expect(res.body.errors).toStrictEqual([
      {
        value: 'Passw1!',
        msg: 'The password must be at least 8 characters long, contain upper and lowercase letters as well as numbers and symbols',
        param: 'password',
        location: 'body',
      },
    ]);
  });

  it('Should not accept a password without special characters', async () => {
    const res = await request(app)
      .post('/api/register')
      .send({ email: 'password@test.com', password: 'Password1' });
    expect(res.statusCode).toBe(400);
    expect(res.body.success).toBeDefined();
    expect(res.body.success).toBe(false);
    expect(res.body.errors).toBeDefined();
    expect(res.body.errors).toStrictEqual([
      {
        value: 'Password1',
        msg: 'The password must be at least 8 characters long, contain upper and lowercase letters as well as numbers and symbols',
        param: 'password',
        location: 'body',
      },
    ]);
  });

  it('Should not accept a password without numbers', async () => {
    const res = await request(app)
      .post('/api/register')
      .send({ email: 'password@test.com', password: 'Password!' });
    expect(res.statusCode).toBe(400);
    expect(res.body.success).toBeDefined();
    expect(res.body.success).toBe(false);
    expect(res.body.errors).toBeDefined();
    expect(res.body.errors).toStrictEqual([
      {
        value: 'Password!',
        msg: 'The password must be at least 8 characters long, contain upper and lowercase letters as well as numbers and symbols',
        param: 'password',
        location: 'body',
      },
    ]);
  });

  it('Should not accept a password without uppercase letters', async () => {
    const res = await request(app)
      .post('/api/register')
      .send({ email: 'password@test.com', password: 'password1!' });
    expect(res.statusCode).toBe(400);
    expect(res.body.success).toBeDefined();
    expect(res.body.success).toBe(false);
    expect(res.body.errors).toBeDefined();
    expect(res.body.errors).toStrictEqual([
      {
        value: 'password1!',
        msg: 'The password must be at least 8 characters long, contain upper and lowercase letters as well as numbers and symbols',
        param: 'password',
        location: 'body',
      },
    ]);
  });

  it('Should not accept a password without lowercase letters', async () => {
    const res = await request(app)
      .post('/api/register')
      .send({ email: 'password@test.com', password: 'PASSWORD1!' });
    expect(res.statusCode).toBe(400);
    expect(res.body.success).toBeDefined();
    expect(res.body.success).toBe(false);
    expect(res.body.errors).toBeDefined();
    expect(res.body.errors).toStrictEqual([
      {
        value: 'PASSWORD1!',
        msg: 'The password must be at least 8 characters long, contain upper and lowercase letters as well as numbers and symbols',
        param: 'password',
        location: 'body',
      },
    ]);
  });

  it('Should accept a valid password', async () => {
    const res = await request(app)
      .post('/api/register')
      .send({ email: 'password@test.com', password: 'Password1!' });
    expect(res.statusCode).toBe(201);
    expect(res.body.success).toBeDefined();
    expect(res.body.success).toBe(true);
  });

  afterAll(async () => {
    await AccountModel.deleteMany();
    await mongoose.connection.close();
  });
});
