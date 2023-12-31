const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const User = require('../models/user');
const env = require('./environment');

// //tell passport to use a new strategy for google login
// passport.use(new googleStrategy({
//         clientID: "579612879049-be3j4ucol5dm5nphek9j40gdp39dgib1.apps.googleusercontent.com",
//         clientSecret: "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",
//         callbackURL: "http://localhost:8000/users/auth/google/callback"
//     },(function(accessToken,refreshToken,profile,done){
//         //find a user
//         User.findOne({email: profile.emails[0].value}).then(function(user,err){
//             if(err){
//                 console.log('Error in Google Strategy-passport',err);
//                 return;
//             }
//             console.log(profile);
//             if(user){
//                 //if found set this user as req.user
//                 return done(null,user);
//             }else{
//                 //if not found, create the user and set it as req.user
//                 User.create({
//                     name: profile.displayName,
//                     email: profile.emails[0].value,
//                     password: crypto.randomBytes(20).toString('hex')
//                 }.then(function(user,err){
//                     if(err){
//                         console.log('Error in creating user Google Strategy-passport',err);
//                         return;
//                     }
//                     return done(null,user);
//                 }))
//             }
//         });
//     })
// ));

passport.use(new googleStrategy({
    clientID: env.google_client_id,
    clientSecret: env.google_client_secret,
    callbackURL: env.google_call_back_url
}, (accessToken, refreshToken, profile, done) => {
    //find a user
    User.findOne({ email: profile.emails[0].value }).then((user) => {
        console.log(accessToken,refreshToken);
        console.log(profile);
        if (user) {
            //if found set this user as req.user
            return done(null, user);
        } else {
            //if not found, create the user and set it as req.user
            User.create({
                name: profile.displayName,
                email: profile.emails[0].value,
                password: crypto.randomBytes(20).toString('hex')
            }).then((user) => {
                return done(null, user);
            }).catch((err) => {
                console.log('Error in creating user Google Strategy-passport', err);
                return done(err, null);
            });
        }
    }).catch((err) => {
        console.log('Error in Google Strategy-passport', err);
        return done(err, null);
    });
}));

module.exports = passport;


