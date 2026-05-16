import Joi from 'joi';

export const registerSchema = Joi.object({
  name: Joi.string().min(3).max(100).required().messages({
    'string.empty': 'Nama tidak boleh kosong',
    'string.min': 'Nama minimal harus 3 karakter',
    'string.max': 'Nama maksimal 100 karakter',
    'any.required': 'Nama wajib diisi'
  }),
  email: Joi.string().email().required().messages({
    'string.email': 'Format email tidak valid (contoh: budi@mail.com)',
    'string.empty': 'Email tidak boleh kosong',
    'any.required': 'Email wajib diisi'
  }),
  password: Joi.string().min(8).required().messages({
    'string.min': 'Password minimal harus 8 karakter untuk keamanan',
    'string.empty': 'Password tidak boleh kosong',
    'any.required': 'Password wajib diisi'
  })
});

export const loginSchema = Joi.object({
  email: Joi.string().email().required().messages({
    'string.email': 'Format email tidak valid',
    'string.empty': 'Email tidak boleh kosong',
    'any.required': 'Email wajib diisi'
  }),
  password: Joi.string().required().messages({
    'string.empty': 'Password wajib diisi',
    'any.required': 'Password wajib diisi'
  })
});