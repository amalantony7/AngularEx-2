const mongoose = require('mongoose');

const schema = mongoose.Schema
const userSchema = new schema({
    username : String,
    address : String,
    image : String,
    dob : Date,
    place : String,
    email : String,
    password : String,
    empDep : String,
    phone : Number
})

module.exports = mongoose.model('user',userSchema,'users'); 
//model from schema.. user = model_name(can be any name),
// users = collection in database