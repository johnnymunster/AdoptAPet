var mongoose = require("mongoose");
var Pet = require("./models/pet");

var data = [
    {
        name: "", 
        image: "",
        description: ""
    }
]

function seedDB(){
   //Remove all pets
   Pet.remove({}, function(err){
        if(err){
            console.log(err);
        }
        console.log("remove the pet");
        //  //add a few pets
        // data.forEach(function(seed){
        //     pet.create(seed, function(err, pet){
        //         if(err){
        //             console.log(err)
        //         } else {
        //             console.log("added a pet");
        //  
        //                     }
        //                 });
        //         }
        //     });
        // });
    }); 

}

module.exports = seedDB;
