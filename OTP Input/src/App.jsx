import { useState, useRef, useEffect } from 'react';

const OTP_LENGTH = 5;

function App() {
  const [inputArr, setInputArr] = useState(new Array(OTP_LENGTH).fill(""));
  const inputRef = useRef([]);

  useEffect(() => {
    inputRef.current[0].focus();
  }, [])

  const onChangeHandler = function (value, index) {
    if (isNaN(value)) return;

    const newArr = [...inputArr];
    newArr[index] = value.trim().slice(-1);
    setInputArr(newArr);
    value.trim() && index < OTP_LENGTH && inputRef.current[index + 1].focus();
  }

  const onKeyDownHandler = function (e, index) {
    if (!e.target.value && index > 0 && e.key === "Backspace") {
      inputRef.current[index - 1].focus();
    }
  }

  return (
    <div className="otp-container">
      <h1>OTP Input</h1>
      {inputArr.map((inputVal, index) => {
        return <input key={index} id={index} ref={(el) => inputRef.current[index] = el} value={inputVal} onChange={(e) => onChangeHandler(e.target.value, index)} onKeyDown={(e) => onKeyDownHandler(e, index)} className="otp-input" />
      })}
    </div>
  )
}

export default App
