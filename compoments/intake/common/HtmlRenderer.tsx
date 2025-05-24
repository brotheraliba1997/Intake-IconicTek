import React from "react";
import handleChange from "../../utlity/handleFormChange";

interface SubQuestion {
  type: string;
  title: string;
  id?: string;
}

interface HtmlRendererProps {
  formData: any[];
  setFormData: Function;
  items: {
    id: string;
    question: {
      title: string;
      SubQuestion: SubQuestion[];
    };
  };
}

const HtmlRenderer: React.FC<HtmlRendererProps> = ({
  formData,
  setFormData,
  items,
}) => {
  const subQuestions = items?.question?.SubQuestion || [];

  return (
    <>
      <div dangerouslySetInnerHTML={{ __html: items?.question?.title }} />
      <div className="row">
        {" "}
        {subQuestions.map((subQuestion, index) => {
          const label = subQuestion.title;
          const key = subQuestion.id || `subq-${index}`;
          const baseProps = {
            className: "form-control",
            onChange: (e: React.ChangeEvent<any>) =>
              handleChange(e, formData, setFormData, {
                questionId: items.id,
                optionId: subQuestion.id || null,
                isMultiple: true,
                type: subQuestion.type,
                subQuestionId: subQuestion.id || null,
              }),
          };

          switch (subQuestion.type) {
            case "text":
            case "signature":
              return (
                <div key={key} className="col-md-6 mb-3">
                  <label className="form-label">{label}</label>
                  <input
                    type="text"
                    placeholder={`Enter ${label.split(":")[0]}`}
                    {...baseProps}
                  />
                </div>
              );
            case "date":
              return (
                <div key={key} className="col-md-6 mb-3">
                  <label className="form-label">{label}</label>
                  <input type="date" {...baseProps} />
                </div>
              );
            case "checkbox":
              return (
                <div key={key} className="col-md-6 mb-3">
                  <label className="form-label">{label}</label>
                  <div className="form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      onChange={(e) => handleChange(e, items, index)}
                    />
                  </div>
                </div>
              );
            case "other":
            default:
              return (
                <div key={key} className="col-md-6 mb-3">
                  <label className="form-label">
                    {label}
                    <span className="text-muted">
                      (Unsupported type: {subQuestion.type})
                    </span>
                  </label>
                  <input
                    type="text"
                    placeholder={`Enter ${label.split(":")[0]}`}
                    {...baseProps}
                  />
                </div>
              );
          }
        })}
      </div>
    </>
  );
};

export default HtmlRenderer;
