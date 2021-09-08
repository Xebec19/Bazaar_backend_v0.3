import logger from './logger.js'
import mongoose from 'mongoose'
import {dbUrl} from '../utils/environment.js'

const databaseConnect = async () => {
    try {
        await mongoose.connect(dbUrl,{ useNewUrlParser: true, useUnifiedTopology: true });
        logger.info(`--database connected at ${dbUrl}`);
    }
    catch (err) { logger.error('--error! database not connected ',err) }
}

export default databaseConnect;