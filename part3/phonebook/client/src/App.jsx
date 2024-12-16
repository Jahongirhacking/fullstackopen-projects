import {useEffect, useState} from 'react'
import Filter from "./components/Filter.jsx";
import PersonForm from "./components/PersonForm.jsx";
import Persons from "./components/Persons.jsx";
import {create, getAll, update} from "./services/persons.js";
import Notification from "./components/Notification.jsx";
import './style.scss';

const App = () => {
    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [filterName, setFilterName] = useState('');
    const [message, setMessage] = useState('');
    const [isSuccess, setIsSuccess] = useState(true);

    useEffect(() => {
        (async () => {
            const result = await getAll();
            setPersons(result);
        })()
    }, []);

    const clearInputs = () => {
        setNewName('');
        setNewNumber('');
    }

    const showMessage = (message, isSuccess) => {
        setMessage(message);
        setIsSuccess(isSuccess);
        setTimeout(() => {
            setMessage('');
            setIsSuccess(true);
        }, 3000)
    }

    const handleClick = async (e) => {
        try {
            e.preventDefault();
            if(persons.map(person => person.name).includes(newName)) {
                if(window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
                    const oldPerson = persons.find(person => person.name === newName);
                    const res = await update(
                        oldPerson.id,
                        {...oldPerson, number: newNumber},
                    );
                    setPersons(prev => prev.map(person => person.id !== res.id ? person : res));
                }
                clearInputs();
                showMessage(`${newName}'s number changed successfully.`, true);
                return;
            }
            const newPersons = await create({name: newName, number: newNumber });
            setPersons((prev) => [...prev, newPersons]);
            clearInputs();
            showMessage(`Added ${newName}`, true);
        } catch (err) {
            console.log(err);
            showMessage('Something went wrong. Please try again.', false);
        }

    }

    if(!persons) return null;

    return (
        <div>
            <h2>Phonebook</h2>
            <Notification message={message} isSuccess={isSuccess} />
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
                setPersons={setPersons}
                showMessage={showMessage}
            />
        </div>
    )
}

export default App