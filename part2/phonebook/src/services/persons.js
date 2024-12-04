import axios from "axios";

export const getAll = async () => {
    const res = await axios.get('http://localhost:3001/persons');
    return res.data;
}

export const create = async (object) => {
    const res = await axios.post('http://localhost:3001/persons', object);
    return res.data;
}

export const update = async (id, object) => {
    const res = await axios.put(`http://localhost:3001/persons/${id}`, object);
    return res.data;
}

export const deletePerson = async (id) => {
    const res = await axios.delete(`http://localhost:3001/persons/${id}`);
    return res.data;
}