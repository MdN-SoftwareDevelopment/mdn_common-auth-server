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
    const [admin] = await pool.query(
      'SELECT a.id_admin FROM admin AS a WHERE a.email = ?',
      [req.params.email]
    );
    if (admin.length >= 1) {
      res.send({ token: admin[0].id_admin });
    } else {
      res.send({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

export const getAllApps = async (req, res) => {
  try {
    let apps = {};
    const [tmpApps] = await pool.query(
      'SELECT a.id_app, a.name, a.description, a.redirect_url, ai.image_url, ' +
        'ai.id_image FROM admin AS ad JOIN app AS a ' +
        'ON ad.id_admin = a.id_admin JOIN app_image ' +
        'AS ai ON a.id_app = ai.id_app ' +
        'WHERE ad.id_admin = ?;',
      [req.params.id_admin]
    );
    tmpApps.map(async app => {
      const [roles] = await pool.query(
        'SELECT r.id_role, r.name, r.is_default ' +
          'FROM role AS r JOIN app AS a ON r.id_app = a.id_app ' +
          'WHERE a.id_app = ?',
        [app.id_app]
      );
      app = { ...app, roles };
      apps = { ...apps, app };
    });
    res.send(apps);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};
