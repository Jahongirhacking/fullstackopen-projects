import {useEffect, useState} from 'react'
import Filter from "./components/Filter.jsx";
import PersonForm from "./components/PersonForm.jsx";
import Persons from "./components/Persons.jsx";
import axios from "axios";

const App = () => {
    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [filterName, setFilterName] = useState('');

    useEffect(() => {
        (async () => {
            const result = await axios.get('http://localhost:3001/persons');
            setPersons(result.data);
        })()
    }, []);

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
            <Filter filterName={filterName} setFilterName={setFilterName}/>
            <h3>Add a new</h3>
            <PersonForm
                newName={newName}
                newNumber={newNumber}
                setNewName={setNewName}
                setNewNumber={setNewNumber}
                handleClick={handleClick}
            />
            <h2>Numbers</h2>
            <Persons
                persons={persons}
                filterName={filterName}
            />
        </div>
    )
}

export default App