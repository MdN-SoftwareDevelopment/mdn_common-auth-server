import crypto from 'crypto';
import { ENCRYPT_IV, ENCRYPT_KEY } from '../config/server.js';

export const encrypt = password => {
  const cipher = crypto.createCipheriv(
    'aes-256-cbc',
    Buffer.from(ENCRYPT_KEY, 'base64'),
    Buffer.from(ENCRYPT_IV, 'base64')
  );
  let encrypted = cipher.update(password, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  return encrypted;
};

export const decrypt = password => {
  const decipher = crypto.createDecipheriv(
    'aes-256-cbc',
    Buffer.from(ENCRYPT_KEY, 'base64'),
    Buffer.from(ENCRYPT_IV, 'base64')
  );
  let decrypted = decipher.update(password, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
};
