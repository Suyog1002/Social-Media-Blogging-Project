const nodeMailer = require('../config/nodemailer');

//this is another way of exporting a method
exports.newComment = (comment) => {
    console.log('inside new comment mailer');
    // console.log(comment.user.email);
    nodeMailer.transporter.sendMail({
        from: 'suyogambadare1003@gmail.com',
        to: comment.user.email,
        subject: 'New Comment Publish',
        html: '<h1>Yup, your comment is now publish!</h1>'
    },(err,info) => {
        if(err){
            console.log('Error in sending mail',err);
            return;
        }

        console.log('Message sent',info);
        return;
    });
}