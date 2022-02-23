import Account from '../models/AccountModel.js';

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
