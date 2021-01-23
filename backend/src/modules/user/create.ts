import { body } from 'express-validator';
import { BaseValidationType } from '../../types/validators';
import { reqValidationResult } from '../../types/req-validation-result';
import { ServerError, ValidationError } from '../../util/request';
import { hashPassword } from '../../util/string';
import { getUserRepository, User } from '../../entity/User';

const createValidator: BaseValidationType = [
  body('username').notEmpty().isString().toLowerCase().trim().escape(),
  body('firstName').notEmpty().isString().trim().escape(),
  body('lastName').isString().isLength({ min: 1, max: 25 }).trim().escape(),
  body('email').notEmpty().isEmail().normalizeEmail(),
  body('password'),
  reqValidationResult
];

async function create(req: any, res: any): Promise<void> {
  const { body } = req;
  const hashedPassword = hashPassword(body.password);
  const userRow = new User();
  userRow.username = body.username;
  userRow.firstName = body.firstName;
  userRow.lastName = body.lastName;
  userRow.email = body.email;
  userRow.password = hashedPassword;
  userRow.isActive = true;

  const existUser = await getUserRepository().findOne({ email: body.email });
  if (existUser) {
    res.status(400).json(ValidationError('email', 'This is email already registered'));
    return;
  }

  const existUsername = await getUserRepository().findOne({ username: body.username });
  if (existUsername) {
    res.status(400).json(ValidationError('username', 'This is username already exist'));
    return;
  }

  try {
    await getUserRepository().save(userRow);
    res.json(userRow);
  } catch (e) {
    res.status(500).json(ServerError(e.message));
  }
}

export { create, createValidator };
