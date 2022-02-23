import Account from '../models/AccountModel.js';
import passport from 'passport';

/**
 * A function to register an account
 * @param {Object} req
 * @param {Object} res
 */
function register(req, res) {
  const user = new Account({
    email: req.body.email,
  });

  Account.register(user, req.body.password, function (err, user) {
    if (err) {
      res.status(422).json({
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
      passport.authenticate('local')(req, res, () => {
        res.sendStatus(201);
      });
    }
  });
}

export { register };
