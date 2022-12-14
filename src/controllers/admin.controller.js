import pool from '../utils/db.js';
import { encrypt } from '../utils/encript.js';

export const postAdmin = async (req, res) => {
  try {
    const admin = {
      id_admin: req.body.id_admin,
      email: req.body.email,
      password: encrypt(req.body.password)
    };
    await pool.query('INSERT INTO admin SET ?', [admin]);
    res.send({ message: 'Admin registered' });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

export const verifyExistsAdmin = async (req, res) => {
  try {
    const [user] = await pool.query(
      'SELECT * FROM admin AS a WHERE a.email = ?',
      [req.params.email]
    );
    if (user.length >= 1) {
      res.send({ message: 'Admin already registered' });
    } else {
      res.send({ message: 'Admin can be registered' });
    }
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};
