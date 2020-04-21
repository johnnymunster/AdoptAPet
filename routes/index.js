var express = require("express");
var router  = express.Router();
var passport = require("passport");
var User = require("../models/user");

//root route
router.get("/", function(req, res){
    res.render("landing");
});

// show contact page
router.get("/contact", function (req, res) {
    res.render("contact");
});

// show about page
router.get("/about", function (req, res) {
    res.render("about");
});

// show register form
router.get("/register", function(req, res){
   res.render("register"); 
});

//handle sign up logic
router.post("/register", function(req, res){
    var username = req.body.username;
    var email = req.body.email;
    var profileimage = req.body.profileimage;
    
    //info we're storing in DB
    var newUser = new User({username: username, email: email, profileimage: profileimage});
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            req.flash("error", err.message);
            return res.render("register");
        }
        passport.authenticate("local")(req, res, function(){
           req.flash("success", "Welcome to Adopt A Pet, " + user.username);
           res.redirect("/pets"); 
        });
    });
});

// logout route
router.get("/logout", function (req, res) {
    req.logout();
    req.flash("success", "Logged you out!");
    res.redirect("/pets");
});

//show login form
router.get("/login", function(req, res){
   res.render("login"); 
});

//handling login logic
router.post("/login", passport.authenticate("local", 
    {
        successRedirect: "/pets",
        failureRedirect: "/login"
    }), function(req, res){
});

module.exports = router;