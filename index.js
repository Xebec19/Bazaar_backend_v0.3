import express from 'express'
import databaseConnect from './setup/database.js'
import logger from './setup/logger.js'
import cors from 'cors'
import passport from 'passport'
import './setup/passport-strategy.js'
import publicApi from './routes/public.js'
import privateApi from './routes/api.js'

const app = express()
const port = process.env.PORT || 3000

databaseConnect();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
app.use(passport.initialize());

app.use('/public', publicApi);
app.use('/api',passport.authenticate("jwt",{session: false}),privateApi);

app.listen(port, () => {
  logger.info(`Server listening at http://localhost:${port}`)
});
