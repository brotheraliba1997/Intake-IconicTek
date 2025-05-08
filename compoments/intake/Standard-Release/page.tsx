import React, { useState } from "react";
import Formlist from "@/form";
import { useGetMyFormQuery } from "@/redux/services/form";

function StandardRelease() {
  const [getValue, setValue] = useState([]);
  const [formData, setFormData] = useState(
    Formlist?.STANDARDRELEASEOFINFORMATION?.questions?.map((itms) => ({
      questionId: itms?.id,
      value: "",
      multipleValue: [],
      type: itms?.type,
    }))
  );

  console.log(formData, "formData");
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

  const { data, isLoading, error } = useGetMyFormQuery({});
  console.log(data?.data, "datadata");

  const formName = "STANDARD RELEASE OF INFORMATION";

  const dataGet = data?.data?.find((items: any) => items?.title === formName);
  console.log(dataGet, "datadatassssss");

  const question = dataGet?.questions
    ?.slice()
    ?.sort((a, b) => a.arrangement - b.arrangement)
    ?.map((items) => items?.question);

  return (
    <>
      <div className="card p-5">
        <h3 className="card-title text-center">
          {data?.data?.find((items: any) => items?.title === formName)?.title}
        </h3>
        <div className="row pt-3">
          {question?.map((items: any, index: number) => {
            if (items.type === "text" || items.type === "date") {
              return (
                <div key={index} className="col-lg-6">
                  {items.type !== "html" && (
                    <div
                      className="pb-2"
                      dangerouslySetInnerHTML={{ __html: items.title }}
                    />
                  )}
                  <input
                    type={items.type}
                    className="form-control"
                    placeholder="Enter..."
                    // onChange={(e: any) => handleChange(e, items.id, index)}
                  />
                </div>
              );
            }

            return null;
          })}
        </div>

        {question?.map((items, index) => (
          <>
            <div
              key={index}
              className="d-flex justify-content-between w-100 align-items-center"
            >
              <div className="d-flex flex-column gap-4  w-100">
                {items.type !== "html" &&
                  items.type !== "text" &&
                  items.type !== "date" && (
                    <>
                      <div dangerouslySetInnerHTML={{ __html: items.title }} />
                    </>
                  )}

                {items.type === "textarea" && (
                  <textarea
                    className="form-control mb-2"
                    id=""
                    rows={3}
                    onChange={(e: any) => handleChange(e, items.id, index)}
                  ></textarea>
                )}

                {items?.options && items.options.length > 0 && (
                  <div className="row ">
                    {items.options?.map((option, i) => (
                      <div className="col-lg-6" key={i}>
                        <div className="form-check mb-2">
                          <input
                            type="checkbox"
                            className="form-check-input"
                            id={`option-${index}-${i}`}
                            value={option?.id}
                            onChange={(e) =>
                              handleChange(e, items?.id, option?.id, null, true)
                            }
                          />
                          <label
                            className="form-check-label"
                            htmlFor={`option-${index}-${i}`}
                          >
                            {option.title}
                          </label>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {items.type === "html" && (
                  <>
                    <div dangerouslySetInnerHTML={{ __html: items.title }} />
                  </>
                )}
              </div>
            </div>
          </>
        ))}
      </div>
    </>
  );
}

export default StandardRelease;
