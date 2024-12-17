require('dotenv').config();
const mongoose = require('mongoose');

mongoose.set('strictQuery', false);

const url = process.env.MONGODB_URI;

mongoose.connect(url).then(() => {
    console.log('MongoDB Connected');
}). catch(err => console.log("error connecting to MongoDB", err.message));

const phonebookSchema = new mongoose.Schema({
    name: String,
    number: String,
})

phonebookSchema.set("toJSON", {
    transform: function (doc, obj) {
        obj.id = obj._id.toString();
        delete obj._id;
        delete obj.__v;
    }
})

module.exports = mongoose.model('Phonebook', phonebookSchema);