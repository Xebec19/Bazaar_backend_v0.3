import express from 'express'
import {register} from '../controllers/authorization.js'

const router = express.Router();

router.get('/register',(req,res) =>  register(req,res));

export default router;