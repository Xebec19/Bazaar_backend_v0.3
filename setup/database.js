import logger from './logger.js'
import * as dotenv from 'dotenv'
import mongoose from 'mongoose'
dotenv.config();
const databaseConnect = async () => {
    try {
        await mongoose.connect(process.env.DB_URL,{ useNewUrlParser: true, useUnifiedTopology: true });
        logger.info('--database connected');
    }
    catch (err) { logger.error('--error! database not connected ',err) }
}

export default databaseConnect;