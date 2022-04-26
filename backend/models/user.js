const mongoose = require('mongoose');
const userSchema = mongoose.Schema({
    name: {
        type: String
    },
    email: {
        type: String
    },
    role: {
        type: String
    },
    phone: {
        type: Number
    },
    imagePath: {
        type: String
    }
})

const userModel = mongoose.model('users', userSchema);
module.exports = userModel;