import { body } from 'express-validator';
import { reqValidationResult } from '../../types/req-validation-result';
import { BaseValidationType } from '../../types/validators';
import { getUserRepository } from '../../entity/User';
import { hashPassword } from '../../util/string';

export const updateValidator: BaseValidationType = [
  body('username')
    .optional()
    .isString()
    .trim()
    .escape(),
  body('firstName')
    .optional()
    .isString()
    .trim()
    .escape(),
  body('lastName')
    .optional()
    .isString(),
  body('email')
    .notEmpty()
    .isEmail()
    .normalizeEmail()
    .isString(),
  body('password')
    .notEmpty()
    .isString()
    .isLength({ min: 8, max: 255 }),
  reqValidationResult
];

export async function update(req: any, res: any): Promise<void> {
  const { body } = req;

  const user = await getUserRepository().findOne({ id: req.params.id });
  if (!user) {
    return res.json(404, 'error user doesn\'t exists');
  }

  // check if another user using this email
  if (user['email'] != body.email) {
    const userExist = await getUserRepository().findOne({ email: body.email });
    if (userExist && userExist.id !== user.id) {
      res.status(400).json('email', 'This is email already registered');
      return;
    }
  }

  Object.keys(body).map((key) => {
    user[key] = body.hasOwnProperty(key) ? body[key] : user[key];
  });

  user.password = hashPassword(body.password);

  try {
    const saveUser = await getUserRepository().save(user);
    res.json(saveUser);
  } catch (e) {
    console.log(e);
    res.status(500).json({ 'error': e.message });
  }
}

