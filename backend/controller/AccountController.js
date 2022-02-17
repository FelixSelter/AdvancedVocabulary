import Account from '../models/AccountModel.js';

/**
 * A function to register an account
 * @param {String} req
 * @param {String} res
 */
function register(req, res) {
  // email validation
  if (!isEmailValid(req.body.email)) {
    res.status(400).json({
      success: false,
      error: 'EmailInvalidError',
    });
    return;
  }

  // password validation
  if (!isPasswordValid(req.body.password)) {
    res.status(400).json({
      success: false,
      error: 'PasswordInvalidError',
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
 * @param {String} email
 * @return {Boolean} email validity
 */
function isEmailValid(email) {
  return /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i.test(
    email
  );
}

/**
 * Checks if the provided string matches the requirements of a strong password
 * 8 characters min length
 * Uppercase and lowercase letters
 * Numbers
 * Special characters
 * @param {String} password
 * @return {Boolean} password validity#
 */
function isPasswordValid(password) {
  return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
    password
  );
}

export { register, isEmailValid, isPasswordValid };
