import { query } from 'express-validator';
import { User } from '../../entity/User';
import { getPageData } from '../../util/request';
import { BaseValidationType } from '../../types/validators';
import { reqValidationResult } from '../../types/req-validation-result';

export const listValidator: BaseValidationType = [
  query('filter[email]')
    .optional()
    .isString(),
  query('filter[firstName]')
    .optional()
    .isString(),
  query('filter[lastName]')
    .optional()
    .isString(),
  reqValidationResult];

export async function list(req: any, res: any): Promise<void> {

  const data = await getPageData(req, User);
  res.send(data);
}

