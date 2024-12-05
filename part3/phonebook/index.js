const express = require('express');
const app = express();
app.use(express.json());

const persons = [
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

app.get('/api/persons', (req, res) => {
    res.json(persons);
})

app.get('/info', (req, res) => {
    console.log(new Date());
    res.send(`<p>
        <p>Phonebook has info for ${persons.length} people</p>
        <p>${new Date()}</p>
    </p>`);
})

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Listening on http://localhost:${PORT}`);
})