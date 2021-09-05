import logger from './logger.js'
import mongoose from 'mongoose'

const databaseConnect = async (connectionString) => {
    try {
        await mongoose.connect(connectionString,{ useNewUrlParser: true, useUnifiedTopology: true });
        logger.info('--database connected');
    }
    catch (err) { logger.error('--error! database not connected ',err) }
}

export default databaseConnect;