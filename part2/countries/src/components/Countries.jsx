import CountryDetails from "./CountryDetails.jsx";
import CountryWrapper from "./CountryWrapper.jsx";

const Countries = ({ countries }) => {
    if(countries.length === 0) return 'No Countries found';
    if(countries.length > 10) return 'Too many matches, specify another filter';

    return (
        <div className="countries">
            {
                countries.length === 1
                ? (
                        <CountryDetails country={countries[0]} />
                    )
                    : (
                        <>
                            {
                                countries.map(country => (
                                    <div key={country.idd['suffixes']}>
                                        <CountryWrapper country={country} />
                                    </div>
                                ))
                            }
                        </>
                    )

            }
        </div>
    )
}
export default Countries;