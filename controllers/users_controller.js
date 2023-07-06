const User=require('../models/user');

module.exports.profile=function(req,res){
    User.findById(req.params.id).then(function(user,err){
        return res.render('user_profile',{
            title: "User Profile",
            profile_user: user
        });
    });
    
}

module.exports.update=function(req,res){
    //no logged in user should be able to update user profile (id)
    if(req.user.id==req.params.id){
        User.findByIdAndUpdate(req.params.id,req.body).then(function(user,err){
            return res.redirect('back');
        });
    }else{
        return res.status(401).send('Unauthorized');
    }
}

//render the sign up page
module.exports.signUp=function(req,res){
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }
    return res.render('user_sign_up',{
        title: "Codeial | Sign Up"
    });
}

//render the sign in page
module.exports.signIn=function(req,res){
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }
    return res.render('user_sign_in',{
        title: "Codeial | Sign In"
    });
}

//get the sign up data
module.exports.create=function(req,res){
    if(req.body.password!=req.body.confirm_password){
        return res.redirect('back');
    }
    User.findOne({email: req.body.email}).then(function(user,err){
        if(err){
            console.log('error in finding user in signing up');
            return;
        }
        if(!user){
            var mydata=new User(req.body);
            mydata.save();
                if(err){
                    console.log('error in creating user while signing up');
                    return;
                }
                return res.redirect('/users/sign-in');

        }else{
            return res.redirect('back');
        }
    });
}

//sign in and create a session for the user
module.exports.createSession=function(req,res){
    return res.redirect('/');
}

module.exports.destroySession=function(req,res){
    req.logout(function(err) {
        if (err) {
          console.log('Error in logging out:', err);
          return;
        }
        return res.redirect('/');
});
}