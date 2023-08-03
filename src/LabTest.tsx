import React, { useState } from "react";

const LabTest = () => {
  function getFormData(e) {
    e.preventDefault();
    console.log(name, car, confirmation);
  }
  const [name, setName] = useState("");
  const [car, setCar] = useState("");
  const [confirmation, setConfirmation] = useState(false);
  return (
    <div className="App">
      <form onSubmit={getFormData}>
        <input type="text" onChange={(evt) => setName(evt.target.value)} />{" "}
        <br />
        <select onChange={(e) => setCar(e.target.value)}>
          <option>Select Option</option>
          <option value="bmw">BMW</option>
          <option value="tata">Tata</option>
        </select>
        <br />
        <input
          type="checkbox"
          id="confirmed"
          onChange={(myEvent) => setConfirmation(myEvent.target.checked)}
        />
        <label htmlFor="confirmed"> Confirmed</label> <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default LabTest;
