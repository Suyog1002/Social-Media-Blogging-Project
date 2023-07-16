const express=require('express');
const cookieParser=require('cookie-parser');
const app=express();
const port=8000;
// const expressLayouts=require('express-ejs-layout');
const db=require('./config/mongoose');
//used for session cookie
const session =require('express-session');
const passport=require('passport');
const passportLocal=require('./config/passport-local-strategy');
const passportJWT = require('./config/passport-jwt-strategy');
const MongoStore = require('connect-mongo');
const flash = require('connect-flash');
const customMware =require('./config/middleware');
// const sassMiddleware=require('sass-middleware');

// app.use(sassMiddleware({
//     src:'./assets/scss',
//     dest: './assets/css',
//     debug: true, //shows error in terminal mode
//     outputStyle: 'extended',
//     prefix: '/css' //where should my server lookout for css files
// })
// );


app.use(express.urlencoded());

app.use(cookieParser());

app.use(express.static('./assets'));
// make the uploads path available to the browser
app.use('/uploads',express.static(__dirname + '/uploads'));

// app.use(expressLayouts);



//set up the view engine
app.set('view engine','ejs');
app.set('views','./views');

//mongo store is used tostore the session cookie in the db
app.use(session({
    name: 'codeial',
    //TODO change the secret before deployment in production mode
    secret: 'blahsomething', //key for encryption
    saveUninitialized: false,
    resave: false,
    cookie: {
         maxAge: (1000 * 60 * 100)
    },
    store: new MongoStore(
        {
            mongoUrl: 'mongodb://127.0.0.1/codeial_db',
            autoRemove: 'disabled'
        },
        function(err){
            console.log(err || 'connect-mongodb setip ok');
        }
    )
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

app.use(flash()); //set up after session is over as it uses session cookie
app.use(customMware.setFlash);
//use express router
app.use('/',require('./routes/index'));

app.listen(port,function(err){
    if(err){
        console.log(`Error in running the server : ${err}`)
    }
    console.log(`Server is running on port : ${port}`);
});