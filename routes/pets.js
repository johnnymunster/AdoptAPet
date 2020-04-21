var express = require("express");
var router  = express.Router();
var Pet = require("../models/pet");
var middleware = require("../middleware");


//INDEX - show all the pets - this will grab all pets from the MongoDB, put them on the pet page for display
router.get("/", function(req, res){
    // Getting Pets from DB, find() gets all pets
    Pet.find({}, function(err, allPets){
       if(err){
           console.log(err);
       } else {
           // if successful, then return pet page
          res.render("pets/index",{pets:allPets});
       }
    });
});

//CREATE - adding a pet to the DB - the below info which is what we want to collect.
//storing a link for the image instead of a file, user will have to upload the image online and provide the link.
router.post("/", middleware.isLoggedIn, function(req, res){
    var name = req.body.name;
    var type = req.body.type;
    var image = req.body.image;
    var description = req.body.description;
    var location = req.body.location;
    var site = req.body.site;
    var author = {
        id: req.user._id,
        username: req.user.username
    }
    var newPet = {name: name, type: type, image: image, description: description, location: location, site: site, author:author}

    Pet.create(newPet, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
            //redirecting to all the Pets if successful
            console.log(newlyCreated);
            res.redirect("/pets");
        }
    });
});

//NEW - Post - returns the creating of a new post for a pet
router.get("/new", middleware.isLoggedIn, function(req, res){
   res.render("pets/new"); 
});

// SHOW - Post
router.get("/:id", function(req, res){
    //finding the Pet Post by ID
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

// EDIT - edit page so the user (owner) can make any changes to the post then just created.
router.get("/:id/edit", middleware.checkPetOwnership, function(req, res){
    Pet.findById(req.params.id, function(err, foundPet){
        res.render("pets/edit", {pet: foundPet});
    });
});

// UPDATE - updating is when the editing is complete. if successful and no errors, the pet page is returned.
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

// DESTROY - if the user (owner) wants to destroy the post they can but must be the owner. Returns to pet page
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

