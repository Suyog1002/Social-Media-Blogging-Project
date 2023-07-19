const nodeMailer = require('../config/nodemailer');

//this is another way of exporting a method
exports.newComment = (comment) => {
    // console.log('inside new comment mailer');
    // console.log(comment.user.email);

    let htmlString = nodeMailer.renderTemplate({comment: comment},'/comments/new_comment.ejs');
    nodeMailer.transporter.sendMail({
        from: 'suyogambadare1003@gmail.com',
        to: comment.user.email,
        subject: 'New Comment Publish',
        html: htmlString
    },(err,info) => {
        if(err){
            console.log('Error in sending mail',err);
            return;
        }

        // console.log('Message sent',info);
        return;
    });
}