var express = require("express");
var router  = express.Router();
var Pet = require("../models/pet");
var middleware = require("../middleware");


//INDEX - show all the pets
router.get("/", function(req, res){
    // Getting Pets from DB
    Pet.find({}, function(err, allPets){
       if(err){
           console.log(err);
       } else {
          res.render("pets/index",{pets:allPets});
       }
    });
});

//CREATE - adding a pet to the DB
router.post("/", middleware.isLoggedIn, function(req, res){
    var name = req.body.name;
    var price = req.body.price;
    var image = req.body.image;
    var desc = req.body.description;
    var author = {
        id: req.user._id,
        username: req.user.username
    }
    var newPet = {name: name, price: price, image: image, description: desc, author:author}
    Pet.create(newPet, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
            //redirecting to all the Pets
            console.log(newlyCreated);
            res.redirect("/pets");
        }
    });
});

//NEW - Post
router.get("/new", middleware.isLoggedIn, function(req, res){
   res.render("pets/new"); 
});

// SHOW - Post
router.get("/:id", function(req, res){
    //finding the Pet Post
    Pet.findById(req.params.id).populate("pets").exec(function(err, foundPet){
        if(err){
            console.log(err);
        } else {
            console.log(foundPet)
            //render
            res.render("pets/show", {pet: foundPet});
        }
    });
});

// EDIT
router.get("/:id/edit", middleware.checkPetOwnership, function(req, res){
    Pet.findById(req.params.id, function(err, foundPet){
        res.render("pets/edit", {pet: foundPet});
    });
});

// UPDATE
router.put("/:id",middleware.checkPetOwnership, function(req, res){
    Pet.findByIdAndUpdate(req.params.id, req.body.pet, function(err, updatedPet){
       if(err){
           res.redirect("/pets");
       } else {
           //redirect somewhere(show page)
           res.redirect("/pets/" + req.params.id);
       }
    });
});

// DESTROY
router.delete("/:id",middleware.checkPetOwnership, function(req, res){
   Pet.findByIdAndRemove(req.params.id, function(err){
      if(err){
          res.redirect("/pets");
      } else {
          res.redirect("/pets");
      }
   });
});


module.exports = router;

