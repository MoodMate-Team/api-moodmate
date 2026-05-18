import multer from 'multer';
import ClientError from '../exceptions/ClientError.js';

const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new ClientError('Hanya file gambar yang diperbolehkan!', 400), false);
  }
};

export const uploadAvatar = multer({ 
  storage, 
  fileFilter,
  limits: { fileSize: 2 * 1024 * 1024 } 
});