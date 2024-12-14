const express = require('express');
const morgan = require('morgan');
const app = express();
app.use(express.json());
morgan.token('req-body', (req) => {
    return JSON.stringify(req.body);
});
app.use(morgan(":method :url :status :res[content-length] - :response-time ms :req-body"));

const generateId = () => {
    return String(Math.floor(Math.random() * 1000000));
}

let persons = [
    {
        id: "1",
        name: "Arto Hellas",
        number: "040-123456"
    },
    {
        id: "2",
        name: "Ada Lovelace",
        number: "39-44-5323523"
    },
    {
        id: "3",
        name: "Dan Abramov",
        number: "12-43-234345"
    },
    {
        id: "4",
        name: "Mary Poppendieck",
        number: "39-23-6423122"
    }
];

app.get('/', (req, res) => {
    res.send('<a href="/api/persons">GET /api/persons</a>');
})

app.get('/info', (req, res) => {
    console.log(new Date());
    res.send(`<p>
        <p>Phonebook has info for ${persons.length} people</p>
        <p>${new Date()}</p>
    </p>`);
})

app.get('/api/persons', (req, res) => {
    res.json(persons);
})

app.get('/api/persons/:id', (req, res) => {
    const id = req.params.id;
    const person = persons.find(person => person.id === id);;
    if(person) {
        res.json(person);
    } else {
        res.status(404).send('No such person');
    }
})

app.delete('/api/persons/:id', (req, res) => {
    const id = req.params.id;
    const person = persons.find(person => person.id === id);
    persons = persons.filter(person => person.id !== id);
    res.status(204).end(person);
})

app.post('/api/persons', (req, res) => {
    const newPerson = req.body;
    if (!newPerson.name || persons.some(person => person.name.toLowerCase() === newPerson.name.toLowerCase())) {
        return res.status(400).json({ error: 'name must be unique' });
    }
    const person = {
        id: generateId(),
        name: newPerson.name,
        number: newPerson.number || '',
    };
    persons = [...persons, person];
    res.json(person);
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Listening on http://localhost:${PORT}`);
})