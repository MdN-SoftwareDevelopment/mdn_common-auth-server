import { v4 as uuid } from 'uuid';
import { uploadImage } from '../utils/cloudinary.js';
import pool from '../utils/db.js';
import { decrypt, encrypt } from '../utils/encript.js';

export const postUser = async (req, res) => {
  try {
    const user = {
      id_user: uuid(),
      email: req.body.email,
      password: encrypt(req.body.password)
    };

    let result;

    if (req.body.user_image !== '/assets/addImage.png') {
      result = await uploadImage(req.body.user_image);
    } else {
      result = {
        public_id: 'common_auth/default_user',
        secure_url:
          'https://res.cloudinary.com/drxe5f7aw/image/upload/' +
          'v1670560975/common_auth/default_user_qsdqlf.png'
      };
    }

    const user_image = {
      id_image: result.public_id,
      image_url: result.secure_url,
      id_user: user.id_user
    };

    await pool.query('INSERT INTO user SET ?', [user]);
    await pool.query('INSERT INTO user_image SET ?', [user_image]);
    await pool.query('INSERT INTO user_role SET ?', [
      {
        id_user: user.id_user,
        id_role: req.body.id_role
      }
    ]);

    res.send({ message: 'User registered' });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

export const verifyExistsUser = async (req, res) => {
  try {
    const [user] = await pool.query(
      'SELECT u.email, u.password FROM role AS r ' +
        'JOIN user_role AS ur ON r.id_role = ur.id_role ' +
        'JOIN user AS u ON ur.id_user = u.id_user ' +
        'WHERE r.id_app = ? AND u.email = ?',
      [req.params.id_app, req.params.email]
    );
    if (user.length >= 1) {
      res.send({ message: 'User already registered' });
    } else {
      res.send({ message: 'User can be registered' });
    }
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

export const verifyCredentialsUser = async (req, res) => {
  try {
    const [user] = await pool.query(
      'SELECT u.email, u.password FROM role AS r ' +
        'JOIN user_role AS ur ON r.id_role = ur.id_role ' +
        'JOIN user AS u ON ur.id_user = u.id_user ' +
        'WHERE r.id_app = ? AND u.email = ?',
      [req.params.id_app, req.params.email]
    );
    if (user.length >= 1) {
      if (req.params.password === decrypt(user[0].password)) {
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

export const getUserToken = async (req, res) => {
  try {
    const [user] = await pool.query(
      'SELECT u.id_user FROM role AS r ' +
        'JOIN user_role AS ur ON r.id_role = ur.id_role ' +
        'JOIN user AS u ON ur.id_user = u.id_user ' +
        'WHERE r.id_app = ? AND u.email = ?',
      [req.params.id_app, req.params.email]
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

export const getUser = async (req, res) => {
  try {
    const [user] = await pool.query(
      'SELECT u.id_user, u.email, r.name, ui.image_url FROM role AS r ' +
        'JOIN user_role AS ur ON r.id_role = ur.id_role ' +
        'JOIN user AS u ON ur.id_user = u.id_user ' +
        'JOIN user_image AS ui ON u.id_user = ui.id_user ' +
        'WHERE u.id_user = ?',
      [req.params.token]
    );
    res.send({
      token: user[0].id_user,
      email: user[0].email,
      rol: user[0].name,
      user_image: user[0].image_url
    });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};
