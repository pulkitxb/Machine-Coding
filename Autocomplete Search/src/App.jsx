import { useState, useEffect } from 'react'
import './App.css'
import SearchBar from './components/SearchBar'
import { Suggestion } from './components/Suggestion'

function App() {
  const [input, setInput] = useState('');
  const [searchSuggestion, setSearchSuggestion] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [cache, setCache] = useState({});

  const fetchSuggestion = async (input) => {
    if (cache[input]) {
      setSearchSuggestion(cache[input]);
      return;
    }
    console.log("Input: ", input)
    const response = await fetch(`https://dummyjson.com/recipes/search?q=${input}`);
    const suggestion = await response.json();
    setCache(prevCache => ({
      ...prevCache,
      [input]: suggestion?.recipes
    }))
    setSearchSuggestion(suggestion?.recipes);
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchSuggestion(input);
    }, 300)

    return () => {
      clearTimeout(timer);
    }
  }, [input])

  return (
    <div className='search-container'>
      <SearchBar input={input} setInput={setInput} setShowResult={setShowResult} />
      {showResult && searchSuggestion.length > 0 && <Suggestion searchSuggestion={searchSuggestion} />}
    </div>
  )
}

export default App
