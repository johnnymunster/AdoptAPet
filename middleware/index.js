var Pet = require("../models/pet");

var middlewareObj = {};

middlewareObj.checkPetOwnership = function(req, res, next) {
 if(req.isAuthenticated()){
        Pet.findById(req.params.id, function(err, foundPet){
           if(err){
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

middlewareObj.isLoggedIn = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error", "You need to be logged in to do that");
    res.redirect("/login");
}

module.exports = middlewareObj;