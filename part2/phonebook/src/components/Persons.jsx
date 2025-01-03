import {deletePerson, getAll} from "../services/persons.js";

const Persons = ({persons, filterName, setPersons, showMessage}) => {
    const handleRemove = async (person) => {
        try {
            if(!window.confirm(`Delete ${person.name}?`)) return;
            const res = await deletePerson(person.id);
            setPersons(prev => prev.filter(person => person.id !== res.id));
            showMessage(`Deleted ${person.name}`, true);
        } catch (err) {
            console.error(err);
            showMessage(`Information of ${person.name} has already been removed from server`, false);
            const res = await getAll();
            setPersons(res);
        }
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