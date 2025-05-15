import React, { useState } from "react";
import Formlist from "@/form";
import { useGetMyFormQuery } from "@/redux/services/form";

function IndividualAbuse() {
  const [formData, setFormData] = useState(
    Formlist?.IndividualAbuse?.formQuestions?.map((itms) => ({
      questionId: itms?.id,
      value: "",
      multipleValue: [],
      type: itms?.type,
    }))
  );

  const [selectedValues, setSelectedValues] = useState<string[]>([]);

  const handleCheckboxChange = (e: any, option: any, index: any) => {
    const isChecked = e.target.checked;

    if (option.title === "Other:") {
      if (isChecked) {
        setSelectedValues((prev: any) => {
          const alreadyExists = prev.some(
            (item: any) => item.index === index && item.title === option.title
          );
          if (!alreadyExists) {
            return [...prev, { index, title: option.title }];
          }
          return prev;
        });
      } else {
        setSelectedValues((prev) =>
          prev.filter(
            (item: any) =>
              !(item.index === index && item.title === option.title)
          )
        );
      }
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    questionId: string,
    optionId: string | null,
    isMultiple: boolean,
    type: string
  ) => {
    const { value, checked } = e.target;

    const arrayfound = formData?.map((quest: any) => {
      if (quest.questionId === questionId) {
        let multipleValue = quest.multipleValue;
        const optionFound = multipleValue?.find(
          (option: any) => option === optionId
        );
        if (optionFound) {
          multipleValue = multipleValue.filter((val: any) => val !== optionId);
        } else {
          multipleValue.push(optionId);
        }

        if (isMultiple) {
          return { ...quest, multipleValue };
        } else {
          return { ...quest, value };
        }
      } else {
        return quest;
      }
    });

    setFormData(arrayfound);
  };

  const formName = "Individual Abuse";
  const { data, isLoading, error } = useGetMyFormQuery({});

  const dataGet = data?.data?.find((items: any) => items?.title === formName);
  console.log(data, "dataGet");

  const question = dataGet?.formQuestions
    ?.slice()
    ?.sort((a: any, b: any) => a.arrangement - b.arrangement)
    ?.map((items: any) => items?.question);

  console.log(question, "selectedValues");

  return (
    <>
      <div className="card p-5">
        <h3 className="card-title text-center">
          {Formlist?.IndividualAbuse?.title}
        </h3>
        {question?.map((items: any, index: any) => (
          <div
            key={index}
            className="d-flex justify-content-between w-100 align-items-center"
          >
            <div className="d-flex flex-column gap-2 my-2 w-100">
              {/* <h4 className="card-title">{items.title}</h4> */}

          

              <div>
                {items.type === "textarea" && (
                  <textarea className="form-control" id="" rows={3}></textarea>
                )}

                {items?.SubQuestion && items.SubQuestion.length > 0 && (
                  <div className="row">
                    {items.SubQuestion.map((sub: any, i: number) => (
                      <div className="col-lg-6" key={i}>
                        {sub?.title && (
                          <label className="form-label">{sub.title}</label>
                        )}
                        {sub?.type !== "Signature"  && (
                          <input
                            type={sub?.type} // ✅ Use option.type instead of items.type
                            className="form-control mb-3"
                            placeholder="Enter..."
                          />
                        )}
                      </div>
                    ))}
                  </div>
                )}

                {items.type === "checkbox" &&
                  items?.options &&
                  items.options.length > 0 && (
                    <div className="row">
                      {items.options.map((option: any, i: number) => {
                        const matched = selectedValues?.find(
                          (item: any) =>
                            item.index === index && item.title === option.title
                        );

                        return (
                          <div className="col-lg-12" key={i}>
                            <div className="form-check mb-2">
                              {option.show ? (
                                <>
                                  <input
                                    type="checkbox"
                                    value={option.title}
                                    className="form-check-input"
                                    id={`option-${index}-${i}`}
                                    onChange={(e) =>
                                      handleCheckboxChange(e, option, index)
                                    }
                                  />

                                  {matched && (
                                    <textarea
                                      className="form-control mb-2"
                                      placeholder={`Details for question ${
                                        matched.index + 1
                                      }`}
                                    ></textarea>
                                  )}

                                  <label
                                    className="form-check-label"
                                    htmlFor={`option-${index}-${i}`}
                                  >
                                    {option.title}
                                  </label>
                                </>
                              ) : (
                                <p className="fw-bold">{option.title}</p>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}

                {items.type === "html" && (
                  <>
                    <div dangerouslySetInnerHTML={{ __html: items.title }} />
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default IndividualAbuse;
