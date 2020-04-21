var mongoose = require("mongoose");

//pet schema, info which we want to collect when a new pet is being posted.
var petSchema = new mongoose.Schema({
   name: String,
   type: String,
   image: String,
   description: String,
   location: String,
   site: String,
   //the author is to control who has added each post.
   author: {
      id: {
         type: mongoose.Schema.Types.ObjectId,
         ref: "User"
      },
      username: String
   },
});

module.exports = mongoose.model("Pet", petSchema);