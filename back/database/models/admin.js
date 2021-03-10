const Mongoose = require("mongoose"),
    passportLocalMongoose = require("passport-local-mongoose")

const Schema = Mongoose.Schema;

const UserDetail = new Mongoose.Schema({
  username: String,
  password: String
});

UserDetail.plugin(passportLocalMongoose);
const UserDetails = Mongoose.model('userInfo', UserDetail, 'userInfo');

// var Employee = mongoose.model("Employee", employeeSchema);
module.exports = UserDetails;