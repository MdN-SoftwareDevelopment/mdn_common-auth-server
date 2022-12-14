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
    const [admin] = await pool.query(
      'SELECT * FROM admin AS a WHERE a.email = ?',
      [req.params.email]
    );
    if (admin.length >= 1) {
      res.send({ message: 'Admin already registered' });
    } else {
      res.send({ message: 'Admin can be registered' });
    }
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

export const verifyCredentialsAdmin = async (req, res) => {
  try {
    const [admin] = await pool.query(
      'SELECT * FROM admin AS a WHERE a.email = ?',
      [req.params.email]
    );
    if (admin.length >= 1) {
      if (
        encrypt(Buffer.from(req.params.password, 'base64').toString()) ===
        admin[0].password
      ) {
        res.send({ message: 'User verified' });
      } else {
        res.send({ message: 'Invalid Password' });
      }
    } else {
      res.send({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

export const getAdminToken = async (req, res) => {
  try {
    const [user] = await pool.query(
      'SELECT a.id_admin FROM admin AS a WHERE a.email = ?',
      [req.params.email]
    );
    if (user.length >= 1) {
      res.send({ token: user[0].id_user });
    } else {
      res.send({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};
