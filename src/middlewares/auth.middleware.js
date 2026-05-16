// src/middlewares/auth.middleware.js
import jwt from 'jsonwebtoken';
import AuthenticationError from '../exceptions/AuthenticationError.js';

const requireAuth = (req, res, next) => {
  try {
    const authHeader = req.header('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new AuthenticationError('Akses ditolak. Token tidak ditemukan atau format salah.');
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;

    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return next(new AuthenticationError('Sesi Anda telah berakhir. Silakan login kembali.'));
    }
    if (error.name === 'JsonWebTokenError') {
      return next(new AuthenticationError('Token tidak valid atau telah dimodifikasi.'));
    }
    
    next(new AuthenticationError(error.message));
  }
};

export default requireAuth;