import bcrypt from 'bcrypt';

const saltRounds = 10;

export const generateRandomString = (length: number) => {
  let result = '';
  const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

export const cleanData = (model, data = []) => {
  const isSingleRecord = !data || data.length == 0;
  if (isSingleRecord) {
    // @ts-ignore
    data = [model];
  }

  let unsafeFields = model.unsafeFields();

  data.map((row: object) => {
    unsafeFields.forEach((key: string | number) => delete row[key]);
    return row;
  });

  const response = isSingleRecord ? data[0] : data;
  return response;
};

export const hashPassword = (password: string) => {
  return bcrypt.hashSync(password, saltRounds);
};

export const comparePasswords = (password: string, hash: string) => {
  return bcrypt.compareSync(password, hash);
};

