import { v4 as uuid } from 'uuid';
import { uploadImage } from '../utils/cloudinary.js';
import pool from '../utils/db.js';
import { encrypt } from '../utils/encript.js';

export const postApplication = async (req, res) => {
  try {
    const app = {
      id_app: uuid(),
      name: req.body.name,
      description: req.body.description,
      password: encrypt(req.body.password),
      redirect_url:
        req.body.redirect_url[req.body.redirect_url.length - 1] !== '/'
          ? req.body.redirect_url + '/'
          : req.body.redirect_url,
      id_admin: req.body.id_admin
    };

    let result;

    if (req.body.app_image !== '/assets/appImage.png') {
      result = await uploadImage(req.body.app_image);
    } else {
      result = {
        public_id: 'common_auth/default_user',
        secure_url:
          'https://res.cloudinary.com/drxe5f7aw/image/upload/' +
          'v1670560975/common_auth/default_user_qsdqlf.png'
      };
    }

    const image = {
      id_image: result.public_id,
      image_url: result.secure_url,
      id_app: app.id_app
    };

    await pool.query('INSERT INTO app SET ?', [app]);
    await pool.query('INSERT INTO app_image SET ?', [image]);

    const roles = req.body.roles;
    roles.map(async role => {
      const newRole = {
        name: role.name,
        is_default: role.isDefault ? 1 : 0,
        id_app: app.id_app
      };
      await pool.query('INSERT INTO role SET ?', [newRole]);
    });

    res.send({ message: 'Application registered' });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

export const getApplication = async (req, res) => {
  try {
    const [app] = await pool.query(
      'SELECT a.name, a.description, a.redirect_url,' +
        'i.image_url, r.id_role, r.name ' +
        'FROM app AS a JOIN app_image AS i ON a.id_app = i.id_app ' +
        'JOIN role AS r ON a.id_app = r.id_app ' +
        'WHERE a.id_app = ? AND r.is_default = 1',
      [req.params.id_app]
    );
    res.send({
      name: app[0].name,
      description: app[0].description,
      redirect_url: app[0].redirect_url,
      image_url: app[0].image_url,
      id_default_user: app[0].id_role,
      name_default_user: app[0].name
    });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};
