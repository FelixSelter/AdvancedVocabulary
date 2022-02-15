import express from 'express';
import { register } from '../controller/AccountController.js';

// eslint-disable-next-line new-cap
const Router = express.Router();
Router.post('/register', register);

export default Router;
