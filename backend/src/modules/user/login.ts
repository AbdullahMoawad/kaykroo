import {BaseValidationType} from '../../types/validators';
import {body} from 'express-validator';
import {reqValidationResult} from '../../types/req-validation-result';
import {ServerError, ValidationError} from '../../util/request';
import {cleanData, comparePasswords} from '../../util/string';
import {getUserRepository} from '../../entity/User';

export const loginValidator: BaseValidationType = [
  body('username')
    .notEmpty()
    .isLength({min: 1, max: 255}),
  body('password')
    .notEmpty()
    .isString()
    .isLength({min: 5, max: 255}),
  reqValidationResult
];

export async function login(req: any, res: any): Promise<void> {
  const {body} = req;

  let user = await getUserRepository().findOne({username: body.username});

  if (!user || !comparePasswords(body.password, user.password)) {
    res.status(400).json(ValidationError('password', 'Wrong username or password'));
    return;
  }

  try {
    const session = await user.generateSession();
    res.json({
      user: cleanData(user),
      token: session.token
    });
  } catch (e) {
    console.log(e);
    res.status(500).json(ServerError(e.message));
  }

}
