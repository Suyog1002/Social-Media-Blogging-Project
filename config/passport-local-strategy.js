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

//sending sign-in data to current views
//check if user is authenticated
passport.checkAuthentication=function(req,res,next){ //used as middleware
    //if the user is signed in,then pass on the request to the next function(controller's action)
    if(req.isAuthenticated()){
        return next();
    }
    //if the user is not signed in
    return res.redirect('/users/sign-in');
}

//set the user for views
passport.setAuthenticatedUser=function(req,res,next){ //middleware to check if user is sign-in or not
    if(req.isAuthenticated()){
        //req.user contains the current signed in user from the session cookie and we are just sending this to the locals for the views
        res.locals.user=req.user;
    }
    next();
}

module.exports=passport;