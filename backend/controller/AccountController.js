import Account from '../models/AccountModel.js';
import { validationResult } from 'express-validator';

/**
 * A function to register an account
 * @param {String} req
 * @param {String} res
 */
function register(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ success: false, errors: errors.array() });
    return;
  }

  const user = new Account({
    email: req.body.email,
  });

  Account.register(user, req.body.password, function (err, user) {
    if (err) {
      res.status(422).json({
        success: false,
        errors: [
          {
            value: req.body.email,
            msg: 'Username taken',
            param: 'email',
            location: 'body',
          },
        ],
      });
    } else {
      res.status(201).json({
        success: true,
      });
    }
  });
}

export { register };
