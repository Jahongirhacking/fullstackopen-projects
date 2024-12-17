const mongoose = require('mongoose');

const [password, name, number] = process.argv.slice(2);

if(!password) {
    console.log('Enter Mongo Password');
    process.exit(1);
}

mongoose.set('strictQuery', false);

const url = `mongodb+srv://jahongirhacking:${password}@cluster0.tckkwuj.mongodb.net/phoneBook?retryWrites=true&w=majority&appName=Cluster0`

mongoose.connect(url);

const phonebookSchema = new mongoose.Schema({
    name: String,
    number: Number,
})
const Phonebook = mongoose.model('Phonebook', phonebookSchema);

if(name && number){
    const phonebook = new Phonebook({name, number});
    phonebook.save().then(() => {
        console.log(`added ${name} number ${number} to phonebook`);
        mongoose.connection.close();
    });
} else {
    const phonebookList = Phonebook.find({}).then(result => {
        console.log(`phonebook:\n${result.map(person => `${person.name} ${person.number}`).join('\n')}`);
        mongoose.connection.close();
    });
}