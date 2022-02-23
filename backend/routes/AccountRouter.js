import express from 'express';
import passport from 'passport';
import { body } from 'express-validator';
import { register } from '../controller/AccountController.js';
import { sendValidationErrors, requireAuthentication } from '../utils/util.js';

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
  sendValidationErrors,
  register
);

Router.post(
  '/login',
  body('email').isEmail().withMessage('Please provide a valid email address'),
  body('password').exists().withMessage('Please specify the password'),
  sendValidationErrors,
  passport.authenticate('local'),
  (req, res) => {
    res.sendStatus(200);
  }
);

Router.get('/AuthCheck', requireAuthentication, (req, res) => {
  res.sendStatus(200);
});

export default Router;
