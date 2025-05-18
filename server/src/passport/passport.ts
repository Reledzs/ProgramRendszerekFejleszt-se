import { PassportStatic } from 'passport';
import { Strategy } from 'passport-local';
import { User } from '../model/User';
import bcrypt from 'bcrypt';
export const configurePassport = (passport: PassportStatic): PassportStatic => {

    passport.serializeUser((user: Express.User, done) => {
        done(null, user);
    });

    passport.deserializeUser((user: Express.User, done) => {
        console.log('user is deserialized.');
        done(null, user);
    });

    passport.use('local', new Strategy(async(username, password, done) => {
        try {
            const user = await User.findOne({ email: username });
            if (!user) {
                return done(null, false, { message: 'User not found' });
            }
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return done(null, false, { message: 'Incorrect password' });
            }
            return done(null, user);
        } catch (err) {
            return done(err);
        }
    }));

    return passport;
}