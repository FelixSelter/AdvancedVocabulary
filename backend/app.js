// dependencies
import dotenv from 'dotenv';
dotenv.config(); // load environment variables
import express from 'express';
import passport from 'passport';
import session from 'express-session';
import cors from 'cors';

// local imports
import AccountModel from './models/AccountModel.js';
import AccountRouter from './routes/AccountRouter.js';

// constants
const PORT = process.env.PORT || 3000;

// configure express
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// express-session
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: !(process.env.NODE_ENV != 'production'),
    },
  })
);

// configure passport
app.use(passport.initialize());
app.use(passport.session());
passport.serializeUser(AccountModel.serializeUser());
passport.deserializeUser(AccountModel.deserializeUser());
passport.use(AccountModel.createStrategy());

// cors
const CORS_WHITELIST = JSON.parse(process.env.CORS_WHITELIST);
app.use(
  cors({
    origin: (origin, callback) =>
      callback(null, CORS_WHITELIST.includes(origin)),
    credentials: true,
  })
);

app.use('/api/', AccountRouter);

export default app;
