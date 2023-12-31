{
    //method to submit the form data for new post using AJAX
    let createPost =function(){   
       let newPostForm = $('#new-post-form');

       newPostForm.submit(function(e){
            e.preventDefault(); // prevent from submitting the form naturally

            //submitting manually
            $.ajax({
                type: 'post',
                url: '/posts/create',
                data: newPostForm.serialize(), //this convert the form data in the json
                success: function(data){
                    let newPost = newPostDom(data.data.post);
                    $('#posts-list-container>ul').prepend(newPost); //add the post in the list at front
                    deletePost($(' .delete-post-button',newPost));

                    //call the create comment class
                    // new PostComments(data.data.post._id);

                    //enable the functionality of the toggle like button on the new post
                    new ToggleLike($('.toggle-like-button', newPost));

                    // new notify({
                    //     theme: 'relax',
                    //     text: "Post Published!",
                    //     type: 'success',
                    //     layout: 'topRight',
                    //     timeout: 1500
                    // }).show();
                },error: function(error){
                    console.log(error.responseText);
                }
            });
       });
    }


    //method to create a post in DOM
    let newPostDom = function(post){
        // show the count of zero likes on this post
        return $(`<li id="post-${post._id}">
                    <p>
                        <small>
                            <a class="delete-post-button" href="/posts/destroy/${post._id}">X</a>
                        </small>
                    
                        ${ post.content }
                        <br>
                        <small>
                            ${ post.user.name }
                        </small>
                        <br>
                        <small>
                                <a class="toggle-like-button" data-likes="0" href="/likes/toggle/?id=${post._id}&type=Post">
                                    0 Likes 
                                </a>    
                        </small>
                    </p> 
                    <div class="post-comments">
                        
                            <form action="/comments/create" method="post">
                                <input type="text" name="content" placeholder="Type Here to add comment...." required>
                                <input type="hidden" name="post" value="${post._id}">
                                <input type="submit" value="Add Comment">
                            </form>
                        
                        <div class="post-comments-list">
                            <ul id="post-comments-${post._id}">
                                
                            </ul>
                        </div>
                    </div>
                </li>`)  //backticks are used to interpolate the strings
    }
    
    //method to delete a post form DOM
    let deletePost =function(deleteLink){
        $(deleteLink).click(function(e){
            e.preventDefault();
            //block the naturally behaviour of delete link send it via ajax parallelly
            $.ajax({
                type: 'get',
                url: $(deleteLink).prop('href'), //get the link of href in anchor tag
                success: function(data){
                    $(`#post-${data.data.post_id}`).remove();
                },error: function(error){
                    console.log(error.responseText);
                }
            })
        })
    }

    createPost();
}