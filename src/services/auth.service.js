// src/services/auth.service.js
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { findUserByEmail, createUser } from '../models/user.model.js';
import InvariantError from '../exceptions/InvariantError.js';
import AuthenticationError from '../exceptions/AuthenticationError.js';

export const registerUser = async (name, email, password) => {
  const existingUser = await findUserByEmail(email);
  if (existingUser) {
    throw new InvariantError('Email sudah terdaftar. Silakan gunakan email lain.');
  }

  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  const newUser = await createUser(name, email, hashedPassword);
  return newUser;
};

export const loginUser = async (email, password) => {
  const user = await findUserByEmail(email);
  if (!user) {
    throw new AuthenticationError('Kredensial yang Anda berikan salah.');
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new AuthenticationError('Kredensial yang Anda berikan salah.');
  }

  const payload = {
    id: user.id,
    email: user.email,
  };
  
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: '7d',
  });

  return token;
};