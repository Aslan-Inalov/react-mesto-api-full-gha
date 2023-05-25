require('dotenv').config();
import { verify } from 'jsonwebtoken';

const { NODE_ENV, JWT_SECRET } = process.env;
import UnauthorizedError from '../errors/UnauthorizedError';

const auth = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    return next(new UnauthorizedError('Необходима авторизация'));
  }
  const token = authorization.replace('Bearer ', '');
  let payload;
  try {
    payload = verify(
      token,
      NODE_ENV === 'production' ? JWT_SECRET : 'JWT_SECRET',
    );
  } catch (err) {
    return next(new UnauthorizedError('Необходима авторизация'));
  }
  req.user = payload;
  next();
};
export default auth;
