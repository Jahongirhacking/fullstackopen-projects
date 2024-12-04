import {useEffect, useState} from "react";
import {getAll} from "./services/countries.js";
import Countries from "./components/Countries.jsx";

function App() {
    const [countries, setCountries] = useState(null);
    const [searchValue, setSearchValue] = useState("");

    useEffect(() => {
        (async () => {
            const response = await getAll();
            setCountries(response);
        })()
    }, [])

    useEffect(() => {
        handleSearch(searchValue);
    }, [searchValue]);

    const handleSearch = (value) => {
        setSearchValue(value);
    }

    if(!countries) return null;

  return (
    <div>
        <p>
            find countries
            <input
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
            />
        </p>
        <Countries countries={countries.filter(country => country.name.common.toLowerCase().includes(searchValue.toLowerCase()))} setCountries={setCountries} />
    </div>
  )
}

export default App
