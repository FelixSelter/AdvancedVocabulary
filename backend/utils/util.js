import { validationResult } from 'express-validator';

/**
 * Express middleware to send are any express-validator errors when neccessary
 * @param {Object} req
 * @param {Object} res
 * @param {function} next
 */
export function sendValidationErrors(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ success: false, errors: errors.array() });
  } else next();
}

/**
 * Express middleware that sends 401 if no one is logged in
 * @param {Object} req
 * @param {Object} res
 * @param {function} next
 */
export function requireAuthentication(req, res, next) {
  if (req.user) {
    next();
  } else {
    res.sendStatus(401);
  }
}
