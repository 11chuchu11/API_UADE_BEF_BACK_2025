import { object, string, email } from 'zod';

import { passwordRegex, usernameRegex } from '../utils/regex';

const loginSchema = object({
  body: object({
    username: string().min(3).max(50).regex(usernameRegex),
    password: string().min(6).max(100).regex(passwordRegex),
  }).required(),
});

const registerSchema = object({
  body: object({
    email: email(),
    username: string().min(3).max(50).regex(usernameRegex),
    password: string().min(6).max(100).regex(passwordRegex),
  }).required(),
});

export { loginSchema, registerSchema };
