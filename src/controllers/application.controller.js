import { uploadImage } from '../utils/cloudinary.js';
import pool from '../utils/db.js';
import { encrypt } from '../utils/encript.js';

export const postApplication = async (req, res) => {
  try {
    const application = {
      id_application: encrypt(req.body.name),
      name: req.body.name,
      description: req.body.description,
      manager_password: encrypt(req.body.manager_password),
      redirect_url: req.body.redirect_url,
      id_admin: req.body.id_admin
    };
    await pool.query('INSERT INTO application SET ?', [application]);

    let result;
    if (req.body.application_image !== '/assets/appImage.png') {
      result = await uploadImage(req.body.application_image);
    } else {
      result = {
        public_id: 'common_auth/default_user',
        secure_url:
          'https://res.cloudinary.com/drxe5f7aw/image/upload/\
v1670560975/common_auth/default_user_qsdqlf.png'
      };
    }

    const image = {
      id_image: result.public_id,
      image_url: result.secure_url,
      id_application: application.id_application
    };

    await pool.query('INSERT INTO application_image SET ?', [image]);

    const roles = req.body.roles;
    roles.map(async rol => {
      const new_rol = {
        name: rol.rol,
        is_default: rol.useDefault ? 1 : 0,
        id_application: application.id_application
      };
      await pool.query('INSERT INTO rol SET ?', [new_rol]);
    });

    res.send({ message: 'Application registered' });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

export const getApplication = async (req, res) => {
  try {
    const [application] = await pool.query(
      'SELECT * FROM application WHERE id_application = ?',
      [req.params.id_application]
    );
    const [image] = await pool.query(
      'SELECT * FROM application_image WHERE id_application = ?',
      [req.params.id_application]
    );
    const [roles] = await pool.query(
      'SELECT * FROM rol WHERE id_application = ?',
      [req.params.id_application]
    );
    const rol = roles.find(rol => rol.is_default === 1);
    res.send({
      name: application[0].name,
      description: application[0].description,
      redirect_url: application[0].redirect_url,
      image_url: image[0].image_url,
      id_default_user: rol.id_rol,
      name_default_user: rol.name
    });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};
