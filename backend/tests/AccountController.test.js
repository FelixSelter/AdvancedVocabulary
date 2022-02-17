import mongoose from 'mongoose';
import request from 'supertest';
import app from '../app.js';
import AccountModel from '../models/AccountModel.js';
import {
  register,
  isEmailValid,
  isPasswordValid,
} from '../controller/AccountController.js';

describe('[U] Testing the email validation', () => {
  it('Should accept a valid email address', () => {
    expect(isEmailValid('email@test.com')).toBe(true);
  });

  it('Should not accept an empty string', () => {
    expect(isEmailValid('')).toBe(false);
  });

  it('Should not accept an email address without a @ sign', () => {
    expect(isEmailValid('emailtest.com')).toBe(false);
  });

  it('Should not accept an email address without an identifier', () => {
    expect(isEmailValid('@test.com')).toBe(false);
  });

  it('Should not accept an email address without a top level domain', () => {
    expect(isEmailValid('email@test')).toBe(false);
  });

  it('Should not accept an email address without a domain', () => {
    expect(isEmailValid('email@.com')).toBe(false);
  });
});

describe('[U] Testing the password validation', () => {
  it('Should accept a valid password', () => {
    expect(isPasswordValid('Password1!')).toBe(true);
  });

  it('Should not accept a password with less than 8 characters', () => {
    expect(isPasswordValid('Pasrd1!')).toBe(false);
  });

  it('Should not accept a password without numbers', () => {
    expect(isPasswordValid('Password!')).toBe(false);
  });

  it('Should not accept a password without special characters', () => {
    expect(isPasswordValid('Password1')).toBe(false);
  });

  it('Should not accept a password without uppercase letters', () => {
    expect(isPasswordValid('password1!')).toBe(false);
  });

  it('Should not accept a password without lowercase letters', () => {
    expect(isPasswordValid('PASSWORD1!')).toBe(false);
  });
});

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
    expect(res.body.error).toBeDefined();
    expect(res.body.error).toBe('EmailInvalidError');
  });

  it('Should not accept an email address without an identifier', async () => {
    const res = await request(app)
      .post('/api/register')
      .send({ email: '@test.com', password: 'Password1!' });
    expect(res.statusCode).toBe(400);
    expect(res.body.success).toBeDefined();
    expect(res.body.success).toBe(false);
    expect(res.body.error).toBeDefined();
    expect(res.body.error).toBe('EmailInvalidError');
  });

  it('Should not accept an email address without a domain', async () => {
    const res = await request(app)
      .post('/api/register')
      .send({ email: 'email@.com', password: 'Password1!' });
    expect(res.statusCode).toBe(400);
    expect(res.body.success).toBeDefined();
    expect(res.body.success).toBe(false);
    expect(res.body.error).toBeDefined();
    expect(res.body.error).toBe('EmailInvalidError');
  });

  it('Should not accept an email address without a top level domain', async () => {
    const res = await request(app)
      .post('/api/register')
      .send({ email: 'email@test', password: 'Password1!' });
    expect(res.statusCode).toBe(400);
    expect(res.body.success).toBeDefined();
    expect(res.body.success).toBe(false);
    expect(res.body.error).toBeDefined();
    expect(res.body.error).toBe('EmailInvalidError');
  });

  it('Should not accept an empty string as email address', async () => {
    const res = await request(app)
      .post('/api/register')
      .send({ email: '', password: 'Password1!' });
    expect(res.statusCode).toBe(400);
    expect(res.body.success).toBeDefined();
    expect(res.body.success).toBe(false);
    expect(res.body.error).toBeDefined();
    expect(res.body.error).toBe('EmailInvalidError');
  });

  it('Should not accept a password with less than 8 characters', async () => {
    const res = await request(app)
      .post('/api/register')
      .send({ email: 'password@test.com', password: 'Passw1!' });
    expect(res.statusCode).toBe(400);
    expect(res.body.success).toBeDefined();
    expect(res.body.success).toBe(false);
    expect(res.body.error).toBeDefined();
    expect(res.body.error).toBe('PasswordInvalidError');
  });

  it('Should not accept a password without special characters', async () => {
    const res = await request(app)
      .post('/api/register')
      .send({ email: 'password@test.com', password: 'Password1' });
    expect(res.statusCode).toBe(400);
    expect(res.body.success).toBeDefined();
    expect(res.body.success).toBe(false);
    expect(res.body.error).toBeDefined();
    expect(res.body.error).toBe('PasswordInvalidError');
  });

  it('Should not accept a password without numbers', async () => {
    const res = await request(app)
      .post('/api/register')
      .send({ email: 'password@test.com', password: 'Password!' });
    expect(res.statusCode).toBe(400);
    expect(res.body.success).toBeDefined();
    expect(res.body.success).toBe(false);
    expect(res.body.error).toBeDefined();
    expect(res.body.error).toBe('PasswordInvalidError');
  });

  it('Should not accept a password without uppercase letters', async () => {
    const res = await request(app)
      .post('/api/register')
      .send({ email: 'password@test.com', password: 'password1!' });
    expect(res.statusCode).toBe(400);
    expect(res.body.success).toBeDefined();
    expect(res.body.success).toBe(false);
    expect(res.body.error).toBeDefined();
    expect(res.body.error).toBe('PasswordInvalidError');
  });

  it('Should not accept a password without lowercase letters', async () => {
    const res = await request(app)
      .post('/api/register')
      .send({ email: 'password@test.com', password: 'PASSWORD1!' });
    expect(res.statusCode).toBe(400);
    expect(res.body.success).toBeDefined();
    expect(res.body.success).toBe(false);
    expect(res.body.error).toBeDefined();
    expect(res.body.error).toBe('PasswordInvalidError');
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
