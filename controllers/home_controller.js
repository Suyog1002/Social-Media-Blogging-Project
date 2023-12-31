const Post=require('../models/post');
const User=require('../models/user');
const Like = require('../models/like');

module.exports.home=async function(req,res){
    // console.log(req.cookies);
    // res.cookie('user_id',25);
    try{
        //populate the likes of each post and comment
        //populate the user of each post
        let posts=await Post.find({})
        .sort('-createdAt') //to store in order in which it is created (new post will be shown first)
        .populate('user')
        .populate({
            path: 'comments',
            populate: {
                path: 'user'
            },
            populate: {
                path: 'likes'
            }
        }).populate('likes');
        
        let users = await User.find({});
        
        return res.render('home',{
            title: "Codeial | Home",
            posts: posts,
            all_users: users
        });

    }catch(err){
        console.log('Error', err);
        return;
    }
           
}

//modules.export.actionName=function(req,res){}