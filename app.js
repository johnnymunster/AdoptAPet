var express     = require("express"),
    app         = express(),
    bodyParser  = require("body-parser"),
    mongoose    = require("mongoose"),
    flash       = require("connect-flash"),
    passport    = require("passport"),
    multer      = require("multer");
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
 
var url = process.env.DATABASEURL || 'mongodb://localhost:27017/mydb';
mongoose.connect(url);

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());
// seedDB(); //seeding

//Passport
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

app.use("/", indexRoutes);
app.use("/pets", petsRoutes);

app.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});

//multer

// app.use(multer({
//     destination: function (req, file, cb) {
//         cb(null, './upload');
//     },
//     filename: function (req, file, cb) {
//         cb(null, file.originalname);
//     }
// });

// app.post(‘/api/photo’, function (req, res) {
//     var userSchema = new Item();
//     userSchema.profileimage.data = fs.readFileSync(req.files.userPhoto.path)
//     userSchema.profileimage.contentType = ‘image / png’;
//     userSchema.save();
// });