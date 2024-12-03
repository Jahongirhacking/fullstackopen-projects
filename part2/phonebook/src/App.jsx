import { useState } from 'react'

const App = () => {
    const [persons, setPersons] = useState([
        { name: 'Arto Hellas' }
    ])
    const [newName, setNewName] = useState('')

    const handleClick = (e) => {
        e.preventDefault();
        setPersons([...persons, {name: newName }]);
        setNewName('');
    }

    return (
        <div>
            <h2>Phonebook</h2>
            <form>
                <div>
                    name: <input value={newName} onChange={e => setNewName(e.target.value)}  />
                </div>
                <div>
                    <button type="submit" onClick={handleClick}>add</button>
                </div>
            </form>
            <h2>Numbers</h2>
            <div>
                {
                    persons.map((person) => (<p key={person.name}>{person.name}</p>))
                }
            </div>
        </div>
    )
}

export default App