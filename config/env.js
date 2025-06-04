// filepath: d:\Projects\getMyIndia\subcription-tracker\config\env.js
import { config } from 'dotenv';

config({ path: `.env.${process.env.NODE_ENV || 'development'}.local` });

export const PORT = process.env.PORT || 3000; // Default to 3000 if undefined
export const NODE_ENV = process.env.NODE_ENV || 'development';
export const DB_URI = process.env.DB_URI;