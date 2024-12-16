import axios from "axios";

const BASE_URL = '/api'

export const getAll = async () => {
    const res = await axios.get(`${BASE_URL}/persons`);
    return res.data;
}

export const create = async (object) => {
    const res = await axios.post(`${BASE_URL}/persons`, object);
    return res.data;
}

export const update = async (id, object) => {
    const res = await axios.put(`${BASE_URL}/persons/${id}`, object);
    return res.data;
}

export const deletePerson = async (id) => {
    const res = await axios.delete(`${BASE_URL}/persons/${id}`);
    return res.data;
}