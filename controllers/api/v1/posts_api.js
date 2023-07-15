const Post =require('../../../models/post');
const Comment = require('../../../models/comment');

module.exports.index= async function(req,res){
    let posts=await Post.find({})
        .sort('-createdAt') //to store in order in which it is created (new post will be shown first)
        .populate('user')
        .populate({
            path: 'comments',
            populate: {
                path: 'user'
            }
    });

    return res.json(200,{
        message: "List of posts",
        posts: posts
    })
}

module.exports.destroy = async function(req,res){
    
    try{
        let post = await Post.findById(req.params.id);
            //.id means converting the object id into string
        // if(post.user == req.user.id){
            post.deleteOne();
            //deleting all comments related to the post deleted
            await Comment.deleteMany({post: req.params.id});

            
            // req.flash('success','Post and association comments deleted');
            return res.json(200,{
                message: "Post and Associated comments deleted successfully!"
            });
        // }else{
        //     req.flash('error','You cannot delete this post!');
        //     return res.redirect('back'); //if current user and post user doesn't match
        // }
    }catch(err){
        console.log('*********',err);
        return res.json(500,{
            message: "Internal Server Error"
        });
    }
}