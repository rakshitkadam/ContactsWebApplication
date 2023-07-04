const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Please add the username']
    },
    email: {
        type : String,
        required: [true, 'Please add the user email address'],
        unique: [true, 'Email address is already registered']
    },
    password: {
        type: String,
        required: [true, 'Please add the password']
    }
},
{
    timestamps: true
});

module.exports = mongoose.model('User', userSchema);