import React, { useState } from "react";
import Formlist from "@/form";
import { useGetMyFormQuery } from "@/redux/services/form";

function ResidencyAgreement() {

  const [formData, setFormData] = useState(
      Formlist?.STANDARDRELEASEOFINFORMATION?.questions?.map((itms) => ({
        questionId: itms?.id,
        value: "",
        multipleValue: [],
        type: itms?.type,
      }))
    );


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
      
        const formName = "Residency Agreement Template for Foster Care and Supported Living Services (SLS) under the BI, CAC, CADI and DD waivers";
      
        const dataGet = data?.data?.find((items: any) => items?.title === formName);
      
        const question = dataGet?.questions
          ?.slice()
          ?.sort((a: any, b: any) => a.arrangement - b.arrangement)
          ?.map((items: any) => items?.question);


          console.log(question, "question");


  return (
    <div className="card p-5">
      <h3 className="card-title text-center">
        {Formlist?.ResidencyAgreement?.title}
      </h3>
      {question?.map((items, index) => (
        <div
          key={index}
          className="d-flex justify-content-between w-100 align-items-center"
        >
          <div className="d-flex flex-column gap-2 my-2 w-100">
            {items.type !== "html" && (
              <>
                <div dangerouslySetInnerHTML={{ __html: items.title }} />
              </>
            )}

            <div>
              {items.type === "textarea" && (
                <textarea className="form-control" id="" rows={3}></textarea>
              )}

              {(items.type === "text" || items.type === "date") && (
                <>
                  {items?.options && items.options.length > 0 ? (
                    <div className="row">
                      {items.options.map((option: any, i: number) => (
                        <div className="col-lg-6 " key={i}>
                          {option?.title && (
                            <label className="form-label">{option.title}</label>
                          )}
                          {option?.show ? (
                            <input
                              type="text"
                              className="form-control mb-4"
                              placeholder="Enter..."
                            />
                          ) : (
                            <input
                              type="date"
                              className="form-control mb-4"
                              placeholder="Enter..."
                            />
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <input
                      type={items.type}
                      className="form-control mb-4"
                      placeholder="Enter..."
                    />
                  )}
                </>
              )}

              {items.type === "checkbox" &&
                items?.options &&
                items.options.length > 0 && (
                  <div className="row">
                    {items.options.map((option: any, i) => (
                      <div className="col-lg-12" key={i}>
                        <div className="form-check mb-2">
                          {option.show ? (
                            <>
                              <input
                                type="checkbox"
                                className="form-check-input"
                                id={`option-${index}-${i}`}
                              />
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
        </div>
      ))}
    </div>
  );
}

export default ResidencyAgreement;
