import React from "react";

function HtmlRenderer({ handleChange, items, index }: any) {
  return (
    <>
      <div dangerouslySetInnerHTML={{ __html: items?.question?.title }} />
    </>
  );
}

export default HtmlRenderer;
