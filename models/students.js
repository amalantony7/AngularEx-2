const mongoose = require('mongoose');

const schema = mongoose.Schema;
const studSchema = new schema({
    studName : String,
    address : String,
    dob : Date,
    email : String,
    password : String,
    phone : Number,
    studClass : String,
    place : String
})

module.exports = mongoose.model('user1' , studSchema , 'students');