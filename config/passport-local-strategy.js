const passport =require ('passport');

const LocalStrategy= require('passport-local').Strategy;

const User =require('../models/user');


//authentication using passport
passport.use(new LocalStrategy({
    usernameField: 'email'
    },function(email,password,done){
        //find a user and establish the identity
        User.findOne({email: email}).then(function(user,err){
            if(err){
                console.log('Error in finding user --> Passport');
                return done(err);
            }
            //if user not found and password do not match 
            if(!user || user.password != password){
                console.log('Invalid Username/Password');
                return done(null,false); //no authentication
            }

            return done(null,user); //authenticate
        });
    }
));

//serializing the user to decide which key is to be kept in the cookies
passport.serializeUser(function(user,done){
    done(null,user.id);
});

// deserializing the user from the key in the cookies
passport.deserializeUser(function(id,done){
    //find the user by id if it exist in the database
    User.findById(id).then(function(user,err){
        if(err){
            console.log('Error in finding user --> Passport');
            return done(err);
        }
        // user id found 
        return done(null,user);
    });
});

module.exports=passport;