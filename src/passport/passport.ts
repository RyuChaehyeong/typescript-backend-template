import passport from 'passport';
import passportJwt from 'passport-jwt';
import { ExtractJwt } from 'passport-jwt';
import { UserEntity } from '../entities/users.entity';

const JwtStrategy = passportJwt.Strategy;

class Passport {
    public config() {

        passport.use(new JwtStrategy({
            jwtFromRequest : ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey : 'jwt-secret-key'
        }, async (payload, done) => {
            try {
                let user = await UserEntity.findOne({ where : { id : payload.id } });
                console.log(user);
                console.log('****')
                if(!user) {
                    return done(null, false);
                } else {
                    return done(null, user);
                }
            } catch (error) {
                console.error(error);
            }
                
            }
        ));

    }
}

export default Passport;