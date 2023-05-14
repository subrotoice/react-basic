import React from "react";
import { useState } from "react";
import ProductList from "./components/ProductList";

const App2 = () => {
  const [category, setCategory] = useState("");
  return (
    <div>
      <select name="" id="" onChange={(e) => setCategory(e.target.value)}>
        <option value=""></option>
        <option value="Clothing">Clothing</option>
        <option value="Household">Household</option>
      </select>
      <ProductList category={category} />
    </div>
  );
};

export default App2;
