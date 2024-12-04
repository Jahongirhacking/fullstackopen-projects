import axios from "axios";

export const getAll = async () => {
    try{
        const res = await axios.get('https://studies.cs.helsinki.fi/restcountries/api/all');
        return res.data;
    } catch (err) {
        console.log(err);
    }
}