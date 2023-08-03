import React, { useState } from "react";

const BackEndConnection = () => {
  const [mod, setMod] = useState(["Happy", "Joy"]);
  const Add = () => {
    setMod([...mod, "Sub"]);
    console.log("My Dear " + mod);
  };
  const Update = () => {};
  const Delete = () => {};

  return (
    <div>
      <button onClick={Add}>Add</button>
      <button onClick={Update}>Update</button>
      <button onClick={Delete}>Delete</button>
    </div>
  );
};

export default BackEndConnection;
