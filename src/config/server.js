import dotenv from 'dotenv';

dotenv.config();

export const PORT = process.env.PORT;
export const ENCRYPT_KEY = process.env.ENCRYPT_KEY;
export const ENCRYPT_IV = process.env.ENCRYPT_IV;
