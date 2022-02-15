import Account from '../models/AccountModel.js';

/**
 * A function to register an account
 * @param {String} req
 * @param {String} res
 */
function register(req, res) {
  // TODO: validate the password
  if (!isEmailValid(req.body.email)) {
    res.status(400).json({
      success: false,
      error: 'EmailInvalidError',
    });
    return;
  }

  const user = new Account({
    email: req.body.email,
  });

  Account.register(user, req.body.password, function (err, user) {
    if (err) {
      res.status(422).json({
        success: false,
        error: err.name,
      });
    } else {
      res.status(201).json({
        success: true,
      });
    }
  });
}

/**
 * Checks if the provided string is an actual email address
 * @param {String} email The email adress
 * @return {Boolean} email validity
 */
function isEmailValid(email) {
  return /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i.test(
    email
  );
}

export { register, isEmailValid };
