const passport = require('passport');
const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
const User = require('../models/user');
const { ExtractJwt } = require('passport-jwt');

let opts = {
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'codeial' //encryption and decryption string
}

passport.use(new JWTStrategy(opts,function(jwtPayLoad,done){
    User.findById(jwtPayLoad._id).then(function(user,err){
        if(err){console.log('Error in finding user from JWT'); return;}
        if(user){
            return done(null,user);
        }else{
            return done(null,false);
        }
    })
}));

module.exports = passport;