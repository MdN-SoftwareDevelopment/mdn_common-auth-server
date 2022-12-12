import { uploadImage } from '../utils/cloudinary.js';
import pool from '../utils/db.js';
import { decrypt, encrypt } from '../utils/encript.js';

export const postUser = async (req, res) => {
  try {
    const user = {
      id_user: encrypt(req.body.email),
      email: req.body.email,
      password: encrypt(req.body.password)
    };
    await pool.query('INSERT INTO user SET ?', [user]);

    let result;
    if (req.body.user_image !== '/src/assets/addImage.png') {
      result = await uploadImage(req.body.user_image);
    } else {
      result = {
        public_id: 'common_auth/default_user',
        secure_url:
          'https://res.cloudinary.com/drxe5f7aw/image/upload/\
v1670560975/common_auth/default_user_qsdqlf.png'
      };
    }

    const user_image = {
      id_image: result.public_id,
      image_url: result.secure_url,
      id_user: user.id_user
    };

    await pool.query('INSERT INTO user_image SET ?', [user_image]);

    await pool.query('INSERT INTO user_rol SET ?', [
      {
        id_user: user.id_user,
        id_rol: req.body.id_rol
      }
    ]);

    res.send({ message: 'User registered' });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

export const verifyUser = async (req, res) => {
  try {
    const [rest] = await pool.query(
      'SELECT u.email, u.password FROM rol AS r\
	      JOIN user_rol AS ur ON r.id_rol = ur.id_rol\
        JOIN user AS u ON ur.id_user = u.id_user\
      WHERE r.id_application = ? AND u.email = ?',
      [req.params.id_application, req.params.email]
    );
    const user = rest.find(rest => rest.email === req.params.email);
    if (rest.length >= 1) {
      res.send({
        email: user.email,
        password: decrypt(user.password)
      });
    } else {
      res.send({ message: 'User can be registered' });
    }
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

export const getToken = async (req, res) => {
  try {
    const [rest] = await pool.query(
      'SELECT u.id_user FROM rol AS r\
        JOIN user_rol AS ur ON r.id_rol = ur.id_rol\
        JOIN user AS u ON ur.id_user = u.id_user\
      WHERE r.id_application = ? AND u.email = ?',
      [req.params.id_application, req.params.email]
    );
    if (rest.length >= 1) {
      res.send({ token: rest[0].id_user });
    } else {
      res.send({ message: 'Invalid User' });
    }
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};
