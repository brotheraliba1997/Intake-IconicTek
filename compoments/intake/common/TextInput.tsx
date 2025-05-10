import React from "react";

function TextInput({ handleChange, items, index }: any) {
  return (
    <input
      type={items.type}
      className="form-control"
      placeholder="Enter..."
      onChange={(e: any) => handleChange(e, items.id, index)}
    />
  );
}

export default TextInput;
