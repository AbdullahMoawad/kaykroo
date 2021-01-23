import { reqValidationResult } from '../../types/req-validation-result';
import { BaseValidationType } from '../../types/validators';
import { param } from 'express-validator';
import { getUserRepository } from '../../entity/User';
import { cleanData } from '../../util/string';

export const getValidator: BaseValidationType = [
  param('id')
    .notEmpty()
    .isString(),
  reqValidationResult];

export async function get(req: any, res: any) {
  const user = await getUserRepository().findOne({ id: req.params.id });

  if (!user) {
    res.status(404).json({ error: 'user not exist' });
  }

  const response = cleanData(user);
  res.json(response);

}




