const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        minlength: 5,
        unique: true,
        lowercase: true,
    },
    name: {
        type: String,
        required: true,
        minlength: 1,
    },
    passwordHash: {
        type: String,
        required: true,
    }
})

userSchema.set('toJSON', {
    transform(doc, obj) {
        obj.id = obj._id;
        delete obj._id;
        delete obj.__v;
        delete obj.passwordHash;
    }
})

module.exports = mongoose.model("User", userSchema)