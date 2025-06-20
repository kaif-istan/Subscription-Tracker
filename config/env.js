// filepath: d:\Projects\getMyIndia\subcription-tracker\config\env.js
import { config } from 'dotenv';

config({ path: `.env.${process.env.NODE_ENV || 'development'}.local` });

export const PORT = process.env.PORT || 3000; // Default to 3000 if undefined
export const NODE_ENV = process.env.NODE_ENV || 'development';
export const DB_URI = process.env.DB_URI;
export const JWT_SECRET = process.env.JWT_SECRET;
export const JWT_EXPIRATION_IN = process.env.JWT_EXPIRATION_IN;
export const ARCJET_KEY = process.env.ARCJET_KEY;
export const ARCJET_ENV = process.env.ARCJET_ENV;
export const QSTASH_TOKEN = process.env.QSTASH_TOKEN;
export const QSTASH_URL = process.env.QSTASH_URL;
export const SERVER_URL = process.env.SERVER_URL;