var mongoose = require("mongoose");
//passport provides authentication + hashing of passwords
var passportLocalMongoose = require("passport-local-mongoose");

//user schema, info which we want to collect when a new user registers
var UserSchema = new mongoose.Schema({
    username: String,
    email: String,
    profileimage: {data: Buffer, contentType: String},
    password: String
});

UserSchema.plugin(passportLocalMongoose)

//multer is being used to record the users document they provide to us, please note: having issues getting this to work.

// app.use(multer({
//     dest: ‘./uploads/ ’,
//     rename: function (fieldname, filename) {
//         return filename;
//     },
// }));

module.exports = mongoose.model("User", UserSchema);