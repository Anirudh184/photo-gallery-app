const mongoose = require('mongoose');
const UserShema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Please enter the name of the user'],
        trim: true
    },
    image:  [
        {
            type: String
        }  // DONE 
    ]
});

// Ashit code


const User = mongoose.model('user', UserShema);

module.exports = User;