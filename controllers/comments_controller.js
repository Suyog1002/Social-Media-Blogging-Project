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

module.exports.destroy = function(req,res){
    Comment.findById(req.params.id).then(function(comment,err){
        
        if(comment.user==req.user.id ){   
            let postId=comment.post;                                      
            comment.deleteOne();
            Post.findByIdAndUpdate(postId,{$pull: {comments: req.params.id}}).then(function(post,err){
                return res.redirect('back');
            })
        }else{
            return res.redirect('back');
        }
    })
}