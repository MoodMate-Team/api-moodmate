// server.js
import app from './app.js';
import pool from './config/database.js';
import { connectRedis } from './services/redis.service.js';
import 'dotenv/config';

const PORT = process.env.PORT || 3000;

pool.connect()
  .then(() => {
    console.log('Berhasil terhubung ke database PostgreSQL (MoodMate)');
    connectRedis().catch(() => {}); // Redis optional
    app.listen(PORT, () => {
      console.log(`Server berjalan di http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Gagal terhubung:', err.message);
    process.exit(1); 
  });

export default app;