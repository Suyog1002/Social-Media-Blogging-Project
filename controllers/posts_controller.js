const Post = require('../models/post');
const Comment = require('../models/comment');
const Like = require('../models/like');


module.exports.create = async function(req,res){
    try{
        let post= await Post.create({
            content: req.body.content,
            user: req.user._id
        });

        if(req.xhr){
            return res.status(200).json({
                data: {
                    post: post
                },
                message: "Post Created!"
            });
        }

        req.flash('success','Post published!');
        return res.redirect('back');
    }catch(err){
        req.flash('error',err);
        // req.flash('error','Error in creating a post');
        return;
    }
    
}

module.exports.destroy = async function(req,res){
    
    try{
        let post = await Post.findById(req.params.id);
            //.id means converting the object id into string
        if(post.user == req.user.id){

            //delete the associated likes for the post and all its comments likes too
            await Like.deleteMany({likeable: post,onModel: 'Post'});
            await Like.deleteMany({_id: {$in: post.comments}});

            post.deleteOne();
            //deleting all comments related to the post deleted
            await Comment.deleteMany({post: req.params.id});

            if(req.xhr){
                return res.status(200).json({
                    data: {
                        post_id : req.params.id
                    },
                    message: "Post Deleted"
                })
            }

            req.flash('success','Post and association comments deleted');
            return res.redirect('back');
        }else{
            req.flash('error','You cannot delete this post!');
            return res.redirect('back'); //if current user and post user doesn't match
        }
    }catch(err){
        req.flash('error',err);
        // console.log('Error in deleting a post', err);
        return;
    }
}