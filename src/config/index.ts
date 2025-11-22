const PORT = process.env.PORT;
const JWT_SECRET = process.env.JWT_SECRET ?? 'default_secret';
const ACCOUNT_USERNAME = process.env.ACCOUNT_USERNAME ?? 'default_username';
const ACCOUNT_PASSWORD = process.env.ACCOUNT_PASSWORD ?? 'default_password';

export { PORT, JWT_SECRET, ACCOUNT_PASSWORD, ACCOUNT_USERNAME };
