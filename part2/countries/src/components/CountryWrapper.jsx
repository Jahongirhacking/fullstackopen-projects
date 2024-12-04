import {useState} from "react";
import CountryDetails from "./CountryDetails.jsx";

const CountryWrapper = ({ country }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    return (
        <div className="country-wrapper">
            {
                isExpanded
                ? (
                    <div className="country-details">
                        <CountryDetails country={country} />
                        <button onClick={() => setIsExpanded(false)}>less</button>
                    </div>
                    )
                    : (
                            <div className="country-name">
                                {country.name.common} <button onClick={() => setIsExpanded(true)}>show</button>
                            </div>
                        )
            }
        </div>
    )
}
export default CountryWrapper