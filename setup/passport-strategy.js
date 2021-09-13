import pkg from 'passport-jwt'
import passport from 'passport';
import BazaarUser from '../models/bazaarUsers.js'
import { jwtSecret } from '../utils/environment.js'
import logger from './logger.js';
const { Strategy, ExtractJwt } = pkg;
var opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken('JWT');
opts.secretOrKey = jwtSecret;

passport.use(new Strategy(opts, (jwt_payload, done) => {
    try {
        const user = BazaarUser.findById(jwt_payload.payload.id);
        if (user.hasOwnProperty(email)) return done(null, user);
        else throw new Error('No user found');
    }
    catch (error) {
        logger.error(error.message);
        return done(null, false);
    }
}))

export default passport;