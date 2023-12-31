const Comment=require('../models/comment');
const Post=require('../models/post');
const commentsMailer = require('../mailers/comments_mailer');
const commentEmailWorker = require('../workers/comment_email_worker');
const queue = require('../config/kue');
const Like = require('../models/like');

module.exports.create= async function(req,res){
    try{
        //find the post and create comment
        let post = await Post.findById(req.body.post);

        if(post){
            let comment = await Comment.create({
                content: req.body.content,
                post: req.body.post,
                user: req.user._id
            });
            
            post.comments.push(comment);
            post.save();

            comment = await comment.populate('user','name email');
            // console.log(comment);
            // commentsMailer.newComment(comment);
            let job=queue.create('emails',comment).save(function(err){
                if(err){
                    console.log('Error in sending to the queue',err);
                }
                console.log('Job queued',job.id);
            });
            req.flash('success','Comment published!');    
            res.redirect('/');
        }
    }catch(err){
        console.log('error in creating a comment',err);
        return;
    }
    
}

module.exports.destroy = async function(req,res){
    try{
        let comment =await Comment.findById(req.params.id).populate('post','user'); //fetch the id of post user
        
        if(comment.user==req.user.id || comment.post.user == req.user.id){   
            let postId=comment.post;                                      
            comment.deleteOne();
            let post= await Post.findByIdAndUpdate(postId,{$pull: {comments: req.params.id}});
            //destroy the associated likes for this comment
            await Like.deleteMany({likeable: comment._id,onModel: 'Comment'});
            req.flash('success','Comments deleted');
            return res.redirect('back');
        }else{
            return res.redirect('back');
        }
        
    }catch(err){
        console.log('Error in deleting a comment', err);
        return;
    }
}