const Post=require('../models/post');
const User=require('../models/user');
module.exports.home=function(req,res){
    // console.log(req.cookies);
    // res.cookie('user_id',25);


    // Post.find({}).then(function(posts,err){
    //     return res.render('home',{
    //         title: "Codeial | Home",
    //         posts: posts
    //     });
    // });

    //populate the user of each post
    Post.find({})
    .populate('user')
    .populate({
        path: 'comments',
        populate: {
            path: 'user'
        }
    })
    .then(function(posts,err){
        User.find({}).then(function(users,err){
            return res.render('home',{
                title: "Codeial | Home",
                posts: posts,
                all_users: users
            });
        });
        
    })
}

//modules.export.actionName=function(req,res){}