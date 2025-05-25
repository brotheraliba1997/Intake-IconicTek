import React from "react";
import handleChange from "../../utlity/handleFormChange";

const HtmlRenderer: React.FC = ({ items }: any) => {
  return (
    <>
      <div dangerouslySetInnerHTML={{ __html: items?.question?.title }} />
    </>
  );
};

export default HtmlRenderer;
