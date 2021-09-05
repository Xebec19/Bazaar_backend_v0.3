import express from 'express'
import databaseConnect from './setup/database.js'
import logger from './setup/logger.js'

const app = express()
const port = process.env.PORT || 3000

databaseConnect();

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  logger.info(`Server listening at http://localhost:${port}`)
})