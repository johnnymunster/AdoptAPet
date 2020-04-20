var mongoose = require("mongoose");


var petSchema = new mongoose.Schema({
   name: String,
   type: String,
   image: String,
   description: String,
   location: String,
   author: {
      id: {
         type: mongoose.Schema.Types.ObjectId,
         ref: "User"
      },
      username: String
   },
});

module.exports = mongoose.model("Pet", petSchema);