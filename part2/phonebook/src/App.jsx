import { useState } from 'react'

const App = () => {
    const [persons, setPersons] = useState([
        { name: 'Arto Hellas', number: '040-1234567' }
    ])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')

    const handleClick = (e) => {
        e.preventDefault();
        if(persons.map(person => person.name).includes(newName)) {
            alert(`${newName} is already added to phonebook`);
            return;
        }
        setPersons([...persons, {name: newName, number: newNumber }]);
        setNewName('');
        setNewNumber('');
    }

    return (
        <div>
            <h2>Phonebook</h2>
            <form>
                <div>
                    name: <input value={newName} onChange={e => setNewName(e.target.value)}/>
                </div>
                <div>number: <input value={newNumber} onChange={(e) => setNewNumber(e.target.value)}/></div>
                <div>
                    <button type="submit" onClick={handleClick}>add</button>
                </div>
            </form>
            <h2>Numbers</h2>
            <div>
                {
                    persons.map((person) => (<p key={person.name}>{person.name} {person.number}</p>))
                }
            </div>
        </div>
    )
}

export default App