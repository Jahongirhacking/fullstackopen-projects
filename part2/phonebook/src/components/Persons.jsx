import {deletePerson} from "../services/persons.js";

const Persons = ({persons, filterName, setPersons}) => {
    const handleRemove = async (person) => {
        if(!window.confirm(`Delete ${person.name}?`)) return;
        const res = await deletePerson(person.id);
        setPersons(prev => prev.filter(person => person.id !== res.id));
    }

    return (
        <div>
            {
                persons.filter(person => person.name.toLowerCase().includes(filterName.toLowerCase())).map((person) => (
                    <p key={person.name}>{person.name} {person.number} <button onClick={() => handleRemove(person)}>delete</button></p>))
            }
        </div>
    );
}
export default Persons;