import fs from 'fs-extra';
import { uploadImage } from '../utils/cloudinary.js';
import pool from '../utils/db.js';
import { encrypt } from '../utils/encript.js';

export const postUser = async (req, res) => {
  try {
    const user = {
      id_user: encrypt(req.body.email),
      email: req.body.email,
      password: encrypt(req.body.password)
    };
    await pool.query('INSERT INTO user SET ?', [user]);

    let image;
    if (req.files?.user_image) {
      const result = await uploadImage(req.files.user_image.tempFilePath);
      image = {
        id_user_image: result.public_id,
        image_url: result.secure_url,
        id_user: user.id_user
      };
      await fs.unlink(req.files.user_image.tempFilePath);
    } else {
      image = {
        id_user_image: 'common_auth/default_user_qsdqlf',
        image_url:
          'https://res.cloudinary.com/drxe5f7aw/image/upload/\
v1670560975/common_auth/default_user_qsdqlf.png',
        id_user: user.id_user
      };
    }
    await pool.query('INSERT INTO user_image SET ?', [image]);

    const [rol] = await pool.query(
      'SELECT id_rol FROM rol WHERE id_application = ? AND is_default = ?;',
      [req.params.id_application, 1]
    );

    await pool.query('INSERT INTO user_rol(id_user, id_rol) VALUES (?, ?)', [
      user.id_user,
      rol[0].id_rol
    ]);
    res.send({ message: 'User registered' });
  } catch (error) {
    if (req.files?.user_image) {
      await fs.unlink(req.files.user_image.tempFilePath);
    }
    res.status(500).send({ message: error.message });
  }
};
