const Post = require('../models/post');
const Comment = require('../models/comment');

module.exports.create = function(req,res){
    Post.create({
        content: req.body.content,
        user: req.user._id
    }).then(function(post,err){
        if(err){
            console.log('error in creating a post');
            return;
        }
        return res.redirect('back');
    });
}

module.exports.destroy = function(req,res){
    Post.findById(req.params.id).then(function(post,err){
        //.id means converting the object id into string
        if(post.user == req.user.id){
            post.deleteOne();
            //deleting all comments related to the post deleted
            Comment.deleteMany({post: req.params.id}).then(function(err){
                return res.redirect('back');
            });
        }else{
            return res.redirect('back'); //if current user and post user doesn't match
        }
        
    });
}