var mongoose = require('mongoose');

var Student = mongoose.model('Student', {
    id: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },
    name: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },
    address: {
        type: String,
        default: null
    },
    contact: {
        type: Number,
        default: null
    },
    score: {
        type: Number,
        default: 00
    },
});

module.exports = { Student };
