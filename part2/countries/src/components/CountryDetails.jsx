const CountryDetails = ({ country }) => {
    return (
        <div className="country-details">
            <h2>{country.name.common}</h2>
            <p>capital {country.capital.join(', ')}</p>
            <p>area {country.area}</p>

            <h3>languages:</h3>
                <ul>
                    {Object.values(country.languages).map(langName => <li key={langName}>{langName}</li>)}
                </ul>
            <img alt={'flag image'} src={country.flags.svg}/>
        </div>
    )
}
export default CountryDetails;