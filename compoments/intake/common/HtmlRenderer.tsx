import React from "react";

function HtmlRenderer({ handleChange, items, index }: any) {
  return (
    <>
      <div dangerouslySetInnerHTML={{ __html: items.title }} />
    </>
  );
}

export default HtmlRenderer;
