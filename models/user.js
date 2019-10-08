const mongoose = require('mongoose');

const schema = mongoose.Schema
const userSchema = new schema({
    username : String,
    place : String,
    email : String,
    password : String,
    phone : Number
})

module.exports = mongoose.model('user',userSchema,'users'); //model from schema.. user = model_name,
                                                            // users = collection in database