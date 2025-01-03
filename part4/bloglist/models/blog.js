const mongoose = require("mongoose");
const {MONGODB_URI} = require("../utils/config");

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        default: ""
    },
    url: {
        type: String,
        default: '',
        required: true,
    },
    likes: {
        type: Number,
        default: 0,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    }
})

blogSchema.set("toJSON", {
    transform: (doc, obj) => {
        obj.id = obj._id.toString();
        delete obj._id;
        delete obj.__v;
    }
})

module.exports = mongoose.model('Blog', blogSchema)