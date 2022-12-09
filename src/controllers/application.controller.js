import fs from 'fs-extra';
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

    let image;
    if (req.files?.application_image) {
      const result = await uploadImage(
        req.files.application_image.tempFilePath
      );
      image = {
        id_application_image: result.public_id,
        image_url: result.secure_url,
        id_application: application.id_application
      };
      await fs.unlink(req.files.application_image.tempFilePath);
    } else {
      image = {
        id_application_image: 'common_auth/default_user_qsdqlf',
        image_url:
          'https://res.cloudinary.com/drxe5f7aw/image/upload/\
v1670560975/common_auth/default_user_qsdqlf.png',
        id_application: application.id_application
      };
    }
    await pool.query('INSERT INTO application_image SET ?', [image]);

    res.send({ message: 'Application registered' });
  } catch (error) {
    if (req.files?.application_image) {
      await fs.unlink(req.files.application_image.tempFilePath);
    }
    res.status(500).send({ message: error.message });
  }
};

export const postRoles = async (req, res) => {
  try {
    const roles = req.body.roles;
    roles.map(async rol => {
      const new_rol = {
        name: rol.name,
        is_default: rol.is_default ? 1 : 0,
        id_application: req.params.id_application
      };
      await pool.query('INSERT INTO rol SET ?', [new_rol]);
    });
    res.send({ message: 'Roles registered' });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};
