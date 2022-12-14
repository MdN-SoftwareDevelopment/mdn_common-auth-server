import pool from '../utils/db.js';
import { encrypt } from '../utils/encript.js';
import { v4 as uuid } from 'uuid';

export const postAdmin = async (req, res) => {
  try {
    const admin = {
      id_admin: uuid(),
      email: req.body.email,
      password: encrypt(req.body.password)
    };
    await pool.query('INSERT INTO admin SET ?', [admin]);
    res.send({ message: 'Admin registered' });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};
