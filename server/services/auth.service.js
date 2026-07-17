import User from '../models/user.model.js';
import AppError from '../utils/AppError.js';
import generateToken from '../utils/generateToken.js';

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validateRegistrationInput({ name, email, password }) {
  if (!name || !email || !password) {
    throw new AppError('Name, email, and password are required.', 400);
  }

  if (typeof name !== 'string' || name.trim().length < 2) {
    throw new AppError('Name must be at least 2 characters long.', 400);
  }

  if (typeof email !== 'string' || !emailPattern.test(email.trim())) {
    throw new AppError('Provide a valid email address.', 400);
  }

  if (typeof password !== 'string' || password.length < 8) {
    throw new AppError('Password must be at least 8 characters long.', 400);
  }
}

function toSafeUser(user) {
  return {
    id: user._id.toString(),
    name: user.name,
    email: user.email,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };
}

export async function registerUser(input = {}) {
  const registrationInput = input ?? {};
  validateRegistrationInput(registrationInput);

  const email = registrationInput.email.trim().toLowerCase();
  const existingUser = await User.findOne({ email });

  if (existingUser) {
    throw new AppError('An account with this email already exists.', 409);
  }

  const user = await User.create({
    name: registrationInput.name.trim(),
    email,
    password: registrationInput.password,
  });

  return {
    user: toSafeUser(user),
    token: generateToken(user._id.toString()),
  };
}

export async function loginUser(input = {}) {
  const { email, password } = input ?? {};

  if (!email || !password) {
    throw new AppError('Email and password are required.', 400);
  }

  if (typeof email !== 'string' || typeof password !== 'string') {
    throw new AppError('Invalid credentials.', 401);
  }

  const user = await User.findOne({ email: email.trim().toLowerCase() }).select('+password');

  if (!user || !(await user.comparePassword(password))) {
    throw new AppError('Invalid credentials.', 401);
  }

  return {
    user: toSafeUser(user),
    token: generateToken(user._id.toString()),
  };
}

export function getSafeUser(user) {
  return toSafeUser(user);
}
