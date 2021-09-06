import * as dotenv from 'dotenv'
if (dotenv.error) { logger.error('--error occurred while setting env files'); }
dotenv.config();

export const dbUrl = process.env.DB_URL;
export const jwtSecret = process.env.JWT_SECRET;