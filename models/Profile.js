const mongoose = require('mongoose');

//create the profile schema
const Profile = new mongoose.Schema({

    //set the varname, type, trim whitespace, and set the default
    firstname: { type:String, trim:true, default:''},
    lastname: {  type:String, trim:true, default:''},
    age: {type:Number, default: 0},
    team: { type:String, trim:true, default:''},
    position: { type:String, trim:true, default:''}
});

//export the profile object schema called 'Profile'
module.exports = mongoose.model('Profile', Profile);