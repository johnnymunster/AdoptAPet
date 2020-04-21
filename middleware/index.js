var Pet = require("../models/pet");

var middlewareObj = {};

//this middleware is controlling ownership of the posts which are added by the users. 
//controlling so a different user can't edit what they don't own.

middlewareObj.checkPetOwnership = function(req, res, next) {
 if(req.isAuthenticated()){
        Pet.findById(req.params.id, function(err, foundPet){
           if(err){
               //this is to ensure the user doens't try login while on the pet page
               req.flash("error", "Post not found");
               res.redirect("back");
           }  else {
               // does user own the post?
            if(foundPet.author.id.equals(req.user._id)) {
                next();
            } else {
                req.flash("error", "You don't have permission to do that");
                res.redirect("back");
            }
           }
        });
    } else {
        req.flash("error", "You need to be logged in to do that");
        res.redirect("back");
    }
}
//middleware to show options which are only available to a logged in user for example, to add a post you need to be logged in
middlewareObj.isLoggedIn = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error", "You need to be logged in to do that");
    res.redirect("/login");
}

module.exports = middlewareObj;