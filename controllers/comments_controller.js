const Comment=require('../models/comment');
const Post=require('../models/post');

module.exports.create=function(req,res){
    //find the post and create comment
    Post.findById(req.body.post).then(function(post,err){
        if(post){
            Comment.create({
                content: req.body.content,
                post: req.body.post,
                user: req.user._id
            }).then(function(comment,err){
                //handle error
                if(err){
                    console.log('error in creating a comment');
                    return;
                }
                post.comments.push(comment);
                post.save();
                res.redirect('/');
            });
        }
    });
}