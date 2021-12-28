const mongoose = require('mongoose');

/* provient du package mongoose-unique-validator */
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = mongoose.Schema({
    firstname: {type: String, required: true},
    lastname: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true}
});

/* permet a un model de ne pas avoir des donnees identiques */
userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);