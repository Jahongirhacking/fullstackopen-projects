require('dotenv').config();
const mongoose = require('mongoose');

mongoose.set('strictQuery', false);

const url = process.env.MONGODB_URI;

mongoose.connect(url).then(() => {
    console.log('MongoDB Connected');
}). catch(err => console.log("error connecting to MongoDB", err.message));

const phonebookSchema = new mongoose.Schema({
    name: {
        type: String,
        minlength: 3,
        required: true,
    },
    number: {
        type: String,
        validate: {
            validator: (v) => {
                return /^\d{2,3}-\d+$/.test(v);
            },
            message: 'Please enter correct number, XX-... or XXX-...',
        },
        minlength: 8,
        required: [true, 'User phone number required']
    },
})

phonebookSchema.set("toJSON", {
    transform: function (doc, obj) {
        obj.id = obj._id.toString();
        delete obj._id;
        delete obj.__v;
    }
})

module.exports = mongoose.model('Phonebook', phonebookSchema);