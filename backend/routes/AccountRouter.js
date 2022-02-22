import express from 'express';
import { body } from 'express-validator';
import { register } from '../controller/AccountController.js';

// eslint-disable-next-line new-cap
const Router = express.Router();

Router.post(
  '/register',
  body('email').isEmail().withMessage('Please provide a valid email address'),
  body('password')
    .isStrongPassword({
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
      returnScore: false,
    })
    .withMessage(
      'The password must be at least 8 characters long, contain upper and lowercase letters as well as numbers and symbols'
    ),
  register
);

export default Router;
