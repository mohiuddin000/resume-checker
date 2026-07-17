import jwt from 'jsonwebtoken';
import AppError from './AppError.js';

function generateToken(userId) {
  if (!process.env.JWT_SECRET) {
    throw new AppError('JWT_SECRET is not configured.', 500);
  }

  return jwt.sign({ sub: userId }, process.env.JWT_SECRET, { expiresIn: '7d' });
}

export default generateToken;
