
var express =require("express");
var app=express();
var bodyParser=require("body-parser");
var mobile=require("./models/mobile");
var seedDB=require("./seed");
var Comment=require("./models/comment");
var flash=require("connect-flash");
var methodOverride=require("method-override");
var mongoose=require("mongoose");
var passport=require("passport");
var LocalStrategy=require("passport-local");
var User=require("./models/user");

//required routes
var commentRoutes=require("./routes/comments");
var mobilesRoutes=require("./routes/mobiles");
var indexRoutes=require("./routes/index");
 
// mongoose.Promise=global.Promise;
// mongoose.connect("mongodb://Yash Jaiswal:1234@ds123146.mlab.com:23146/mobilestore",{ useNewUrlParser: true });

// const MongoClient = require('mongodb').MongoClient;
// const uri = "mongodb+srv://yash:1234@cluster0.9dc2m.mongodb.net/mobilestore?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true });
// client.connect(err => {
// //   const collection = client.db("mobilestore").collection("mobile");
// //   // perform actions on the collection object
// //   client.close();
// });


mongoose.connect("mongodb://localhost:27017/mobilestore"
    ,
    {
    useNewUrlParser: true ,
    useUnifiedTopology:true
   }
);
const db=mongoose.connection;
db.once("open",()=>{console.log("server started")});

// mongoose.connect('mongodb://localhost/mobilestore',{ useNewUrlParser: true });
// mongoose.Promise = require('bluebird');
// assert.equal(query.exec().constructor, require('bluebird'));


app.use(bodyParser.urlencoded({extended:true}));

app.use(express.static("design"));
var currentUser;

// seedDB();

app.use(methodOverride("_method)"));

app.use(require("express-session")({
    secret:"Redmi Note 4 is the best",
    resave:false,
    saveUninitialized:false

}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function (req,res,next) {
    res.locals.currentUser=req.user;
    next();
});
app.use(flash());
// app.use('/', express.static('public',{extensions: ['htm', 'html']}));

app.use(indexRoutes);
app.use(mobilesRoutes);
app.use(commentRoutes);

app.listen(process.env.PORT||8000);
