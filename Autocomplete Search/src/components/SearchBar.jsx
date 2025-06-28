export default function SearchBar({ input, setInput, setShowResult }) {
    return (
        <input type="text" className="searchBar" value={input} onChange={(e) => setInput(e.target.value)} onBlur={() => setShowResult(false)} onFocus={() => setShowResult(true)} />
    )
}