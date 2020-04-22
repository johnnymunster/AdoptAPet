require('dotenv').config()

var express     = require("express"),
    app         = express(),
    bodyParser  = require("body-parser"),
    mongoose    = require("mongoose"),
    flash       = require("connect-flash"),
    passport    = require("passport"),
    fs          = require('fs');
    LocalStrategy = require("passport-local"),
    methodOverride = require("method-override"),
    Pet  = require("./models/pet"),
    User        = require("./models/user"),
    Schema   = mongoose.Schema,
    seedDB       = require("./seeds")

const port = process.env.PORT || 27017;
    
//requiring routes
var petsRoutes = require("./routes/pets"),
    indexRoutes      = require("./routes/index")
 
// // MongoDB server local
// mongoose.connect("mongodb://localhost:27017/db", {
//     useNewUrlParser: true
// });

// Production 
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/db');

//formatting of the code using ejs engine, note - DON'T UPDATE
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());
// seedDB(); //seeding

//Passport - controlling of authentication, hashing of passwords.
app.use(require("express-session")({
    secret: "pets",
    resave: false,
    saveUninitialized: false

}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
   res.locals.currentUser = req.user;
   res.locals.error = req.flash("error");
   res.locals.success = req.flash("success");
   next();
});

// landing route
app.use("/", indexRoutes);
// pet route 
app.use("/pets", petsRoutes);

// // local port - 27017
// app.listen(port, () => {
//     console.log(`Server is up on port ${port}`);
// });

// Production Port 
app.listen(port);

// multer - unable to get it functioning, tried several resources but no luck.
const multer = require('multer');

const storage = multer.diskStorage({
destination: function (req, file, cb) {
        cb(null, './uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + file.originalname);
    }
});

