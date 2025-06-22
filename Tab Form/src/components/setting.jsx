export default function Setting({ data, setData }) {
    const { theme } = data;
    function handleChange(e) {
        setData(prevState => ({
            ...prevState,
            theme: e.target.id
        }))
    }
    return (
        <div className="wrapper">
            <div>
                <input type="radio" id="dark" checked={theme === 'dark'} onChange={handleChange} />
                <label htmlFor="dark">Dark</label>
            </div>
            <div>
                <input type="radio" id="light" checked={theme === 'light'} onChange={handleChange} />
                <label htmlFor="light">Light</label>
            </div>
        </div>
    )
}