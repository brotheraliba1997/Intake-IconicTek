import React from "react";

function TextInput({ handleChange, items }: any) {
  console.log("items", items);
  return (
    <input
      type={items.type}
      className="form-control"
      placeholder="Enter..."
      onChange={(e: any) => handleChange(e, items?.id)}
    />
  );
}

export default TextInput;
