import React from "react";

export default function ChildComponent({ data, num2, onNum2Change }) {
  const handleClick = () => {
    console.log("handleClick");
  };

  const handleInputChange = (event) => {
    onNum2Change(event.target.value); // Call parent handler with new value
  };

  return (
    <div style={{ backgroundColor: "lightblue" }}>
      <div>
        Num 2: <input type="number" value={num2} onChange={handleInputChange} />
      </div>
    </div>
  );
}