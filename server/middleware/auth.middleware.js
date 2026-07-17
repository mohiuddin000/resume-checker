import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';
import AppError from '../utils/AppError.js';
import asyncHandler from '../utils/asyncHandler.js';

export const protect = asyncHandler(async (req, res, next) => {
  const authorization = req.headers.authorization;

  if (!authorization?.startsWith('Bearer ')) {
    throw new AppError('Authentication is required.', 401);
  }

  if (!process.env.JWT_SECRET) {
    throw new AppError('JWT_SECRET is not configured.', 500);
  }

  const token = authorization.slice(7).trim();

  if (!token) {
    throw new AppError('Authentication is required.', 401);
  }

  let payload;

  try {
    payload = jwt.verify(token, process.env.JWT_SECRET);
  } catch {
    throw new AppError('Invalid or expired token.', 401);
  }

  const user = await User.findById(payload.sub);

  if (!user) {
    throw new AppError('The account associated with this token no longer exists.', 401);
  }

  req.user = user;
  next();
});
