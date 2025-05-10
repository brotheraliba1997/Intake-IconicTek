import React from "react";

function Textarea({ items, handleChange }: any) {
  return (
    <>
      <div>
        <div dangerouslySetInnerHTML={{ __html: items.title }} />
      </div>
      <div>

      
      <textarea
        className="form-control mb-2"
        rows={3}
        // onChange={(e: any) => handleChange(e, items.id, index)}
      ></textarea>
      </div>
    </>
  );
}

export default Textarea;
