const jwtStrategy = require('passport-jwt').Strategy;

const ExtractJwt = require('passport-jwt').ExtractJwt;
const keys = require('../config/keys')
const connection = require('../config/requestsConf');
const option = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: keys.jwtKey
}

module.exports = passport => {
    passport.use(new jwtStrategy(option, async (payload, done) =>{
        const connect = new connection()
        connect.connect()

        const user = await connect.userPassportAuth(payload.userId )

        try {
            if (!!user.length ) {
                done( null, user)
            }  else {
                done( null, false)
            }
        }
        catch (e) {
            console.log(e)
        }
    }))
}