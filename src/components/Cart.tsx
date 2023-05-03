import React from "react";
interface Props {
  cartItems: string[];
  onClear: () => void;
}
const Cart = ({ cartItems, onClear }: Props) => {
  return (
    <>
      {cartItems.map((cartItem, indexa) => (
        <p key={indexa}>{cartItem}</p>
      ))}
      <button onClick={onClear}>Clear</button>
    </>
  );
};

export default Cart;
