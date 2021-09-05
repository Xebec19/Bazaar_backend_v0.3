import express from 'express'
import databaseConnect from './setup/database.js'
import logger from './setup/logger.js'
import cors from 'cors'
import * as dotenv from 'dotenv'
import publicApi from './routes/public.js'
import privateApi from './routes/api.js'
const app = express()
const port = process.env.PORT || 3000

if (dotenv.error) { logger.error('--error occurred while setting env files'); }
dotenv.config();
databaseConnect(process.env.DB_URL);
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

app.use('/public', publicApi);
app.use('/api',privateApi);

app.listen(port, () => {
  logger.info(`Server listening at http://localhost:${port}`)
});
