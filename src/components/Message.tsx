import React from "react";

let count = 0;
const Message = () => {
  console.log("Message " + count);
  count++;
  return <div>Message {count}</div>;
};

export default Message;
