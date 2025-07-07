import { useState } from 'react'
import './App.css'
import { useEffect } from 'react';

function App() {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setWidth(prev => prev + 1);
    }, 10)

    return () => {
      clearInterval(timer);
    }
  }, [])

  return (
    <div className='outer-container'>
      <div className='inner-container' style={{ width: `${width}%` }}>
        {width}%
      </div>
    </div>
  )
}

export default App
