import './App.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import ChildC from './ChildComponent';

function App() {
  const name = 'App';
  let [num1, setNum1] = useState(0);
  let [num2, setNum2] = useState(0);
  let [error, setError] = useState(null);

  const handleChange = (event) => {
    console.log("name", event.target.name);
    console.log(":- handleChange event", typeof event.target.value);

    if (event.target.name === "num1") {
      setNum1(+event.target.value);
    }
  };

  const handleNum2Change = (value) => {
    setNum2(+value); // Update num2 state from child component
  };


  return (
    <div style={{ backgroundColor: "lightgray" }}>
      <div>
        Num 1 : <input type="number" onChange={handleChange} name="num1" />
      </div>
      <ChildC
        data={["a", "b", "c"]}
        num2={num2}
        onNum2Change={handleNum2Change}
      />
      {/* {error ? <p>Error: {error}</p> : <p>No error found</p>} */}
      <div>
        Result: {num1 + num2}
      </div>
    </div>
  );
}

export default App;