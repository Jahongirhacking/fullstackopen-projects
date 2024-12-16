const Filter = ({ filterName, setFilterName }) => {
    return (
        <div className="filter">
            filter shown with: <input value={filterName} onChange={(e) => setFilterName(e.target.value)} />
        </div>
    )
}

export default Filter;