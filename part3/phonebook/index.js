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

app.get('/info', (req, res, next) => {
    PhoneBook.find({}).then(persons => {
        res.send(`<p>
        <p>Phonebook has info for ${persons.length} people</p>
        <p>${new Date()}</p>
    </p>`);
    }).catch(err => next(err))
})

app.get('/api/persons', (req, res, next) => {
    PhoneBook.find({}).then(persons => {
        res.json(persons);
    }).catch(err => next(err))
})

app.get('/api/persons/:id', (req, res, next) => {
    const id = req.params.id;
    PhoneBook.findById(id).then(person => {
        if(person) {
            res.json(person);
        } else {
            res.status(404).send('No such person');
        }
    }).catch(error => next(error));
})

app.delete('/api/persons/:id', (req, res, next) => {
    const id = req.params.id;
    PhoneBook.findByIdAndDelete(id).then(person => {
        res.status(204).end();
    }).catch(err => next(err))
})

app.post('/api/persons', (req, res, next) => {
    const newPerson = req.body;
    if (!newPerson.name) {
        return res.status(400).json({ error: 'name must not be empty' });
    }
    const person = new PhoneBook({
        name: newPerson.name,
        number: newPerson.number || '',
    });
    person.save().then(person => {
        res.json(person);
    }).catch(err => next(err))
});

app.put('/api/persons/:id', (req, res, next) => {
    const id = req.params.id;
    const person = {name: req.body.name, number: req.body.number};

    PhoneBook.findByIdAndUpdate(id, person, {new: true, runValidators: true, context: 'query'}).then(updatedPerson => {
        res.status(200).json(updatedPerson);
    }).catch(err => next(err))
})

const unknownEndpoint = (req, res) => {
    res.status(404).send({error: 'unknown endpoint'});
}
app.use(unknownEndpoint);

const errorHandler = (err, req, res, next) => {
    console.error(err.message);
    if (err.name === 'CastError') {
        return res.status(400).send({ error: 'malformatted id' })
    }
    if(err.name === 'ValidationError') {
        return res.status(400).send({ error: err.message });
    }
    next(err)
}
app.use(errorHandler)

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Listening on http://localhost:${PORT}`);
})