const mongoose = require('mongoose');

const contactSchema = mongoose.Schema({
    user_id : {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    name : {
        type: String,
        required: [true, 'Please add the name of the contact']
    },
    email : {
        type: String,
        required: [true, 'Please add the email of the contact']
    },
    phone : {
        type: String,
        required: [true, 'Please add the phone number of the contact']
    }, 
},{
    timestamps: true
});

module.exports = mongoose.model('Contact', contactSchema);