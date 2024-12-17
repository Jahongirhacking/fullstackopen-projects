require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const app = express();
const PhoneBook = require('./models/phonebook');

app.use(express.json());
app.use(express.static('dist'));
morgan.token('req-body', (req) => {
    return JSON.stringify(req.body);
});
app.use(morgan(":method :url :status :res[content-length] - :response-time ms :req-body"));

app.get('/', (req, res) => {
    res.send('<a href="/api/persons">GET /api/persons</a>');
})

app.get('/info', (req, res) => {
    PhoneBook.find({}).then(persons => {
        res.send(`<p>
        <p>Phonebook has info for ${persons.length} people</p>
        <p>${new Date()}</p>
    </p>`);
    }).catch(err => {
        console.log("Error happened in fetching from database", err);
    })
})

app.get('/api/persons', (req, res) => {
    PhoneBook.find({}).then(persons => {
        res.json(persons);
    }).catch(err => {
        console.log("Error happened in fetching from database", err);
    })
})

app.get('/api/persons/:id', (req, res) => {
    const id = req.params.id;
    PhoneBook.findById(id).then(person => {
        if(person) {
            res.json(person);
        } else {
            res.status(404).send('No such person');
        }
    }).catch(error => {
        console.log(error)
        res.status(500).end()
    });
})

app.delete('/api/persons/:id', (req, res) => {
    const id = req.params.id;
    PhoneBook.deleteOne({_id: id}).then(person => {
        res.json({id});
    }).catch(err => res.status(404).end())
})

app.post('/api/persons', (req, res) => {
    const newPerson = req.body;
    if (!newPerson.name) {
        return res.status(400).json({ error: 'name must be unique' });
    }
    const person = new PhoneBook({
        name: newPerson.name,
        number: newPerson.number || '',
    });
    person.save().then(person => {
        res.json(person);
    }).catch(err => {
        console.log("Error on adding person to phonebook", err);
    })
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Listening on http://localhost:${PORT}`);
})