import * as userModel from '../models/user.model.js';
import NotFoundError from '../exceptions/NotFoundError.js';
import { supabase } from '../config/supabase.js';
import fs from 'fs/promises';
import path from 'path';

export const getProfile = async (req, res, next) => {
  try {
    const userId = req.user.id; 
    const user = await userModel.findUserById(userId);

    if (!user) throw new NotFoundError('User tidak ditemukan');

    res.status(200).json({
      status: 'success',
      data: { user },
    });
  } catch (error) {
    next(error);
  }
};

export const updateProfile = async (req, res, next) => {
  try {
    console.log("Cek file masuk:", req.file);
    const userId = req.user.id;
    const { name } = req.body;
    const oldUser = await userModel.findUserById(userId);
    let avatarUrl = null;

    if (req.file) {
      if (oldUser?.avatar_url) {
        const oldFileName = oldUser.avatar_url.split('/').pop();
        await supabase.storage.from('avatars').remove([oldFileName]);
      }
      const ext = path.extname(req.file.originalname);
      const fileName = `user-${userId}-${Date.now()}${ext}`;
      const { data, error } = await supabase.storage
        .from('avatars') 
        .upload(fileName, req.file.buffer, {
          contentType: req.file.mimetype,
          upsert: true
        });

      if (error) throw error;
      const { data: publicData } = supabase.storage
        .from('avatars')
        .getPublicUrl(fileName);

      avatarUrl = publicData.publicUrl;
    }

    const updatedUser = await userModel.updateUserProfile(userId, name, avatarUrl);
    res.status(200).json({
      status: 'success',
      message: 'Profil berhasil diperbarui!',
      data: { user: updatedUser }
    });
  } catch (error) {
    next(error);
  }
};