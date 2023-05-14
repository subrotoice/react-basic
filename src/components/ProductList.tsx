import { useState, useEffect, useRef } from "react";

// inline Interface here
const ProductList = ({ category }: { category: string }) => {
  const ref = useRef<HTMLInputElement>(null);
  const [product, setProduct] = useState("");
  // afterRender should be the name
  useEffect(() => {
    console.log("Fetching Products in " + category);
    // setProduct(["Clothing", "Household"]); // infinity loop create
  }, [category]);
  useEffect(() => {
    document.title = "my app";
  });
  return (
    <div>
      <input ref={ref} type="text" name="name" id="" className="form-control" />
    </div>
  );
};

export default ProductList;
