import React from "react";
import handleChange from "../../utlity/handleFormChange";


type MyComponentProps = {
  items: any; // ya specific type
};

const HtmlRenderer = ({ items }: MyComponentProps) => {
  return (
    <>
      <div dangerouslySetInnerHTML={{ __html: items?.question?.title }} />
    </>
  );
};

export default HtmlRenderer;
