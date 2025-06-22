export default function Interest({ data, setData, errors }) {
    const { interest } = data;
    function handleChange(e) {
        setData(prevState => ({
            ...prevState,
            interest: e.target.checked ? [...prevState.interest, e.target.id] : prevState.interest.filter(el => el !== e.target.id)
        }))
    }
    return (
        <div className="wrapper">
            <div>
                <input type="checkbox" id="coding" checked={interest.includes('coding')} onChange={handleChange} />
                <label htmlFor="coding">Coding</label>
            </div>
            <div>
                <input type="checkbox" id="gaming" checked={interest.includes('gaming')} onChange={handleChange} />
                <label htmlFor="gaming">Gaming</label>
            </div>
            <div>
                <input type="checkbox" id="music" checked={interest.includes('music')} onChange={handleChange} />
                <label htmlFor="music">Music</label>
            </div>
            {errors.interest && <span className="error">{errors.interest}</span>}
        </div>
    )
}