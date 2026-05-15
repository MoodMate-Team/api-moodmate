// src/models/user.model.js
import pool from '../config/database.js';

export const findUserByEmail = async (email) => {
  const query = `
    SELECT * FROM users 
    WHERE email = $1;
  `;
  const result = await pool.query(query, [email]);
  return result.rows[0]; 
};

export const createUser = async (name, email, hashedPassword) => {
  const query = `
    INSERT INTO users (name, email, password) 
    VALUES ($1, $2, $3) 
    RETURNING id, name, email, current_streak, created_at;
  `;

  const result = await pool.query(query, [name, email, hashedPassword]);
  return result.rows[0];
};


export const findUserById = async (id) => {
  const query = `
    SELECT id, name, email, current_streak, last_checkin_date, created_at, updated_at 
    FROM users 
    WHERE id = $1;
  `;
  const result = await pool.query(query, [id]);
  return result.rows[0];
};