import React, { useEffect, useState } from "react";
import Formlist from "@/form";
import { useGetMyFormQuery } from "@/redux/services/form";
import HtmlRenderer from "./common/HtmlRenderer";
import Textarea from "./common/Textarea";
import CheckBox from "./common/CheckBox";
import ESignature from "../E-Signature/E-signature";

function ResidencyAgreement({ handleBack, handleNext, currentStep }: any) {
  const [formData, setFormData] = useState();

  const { data, isLoading, error } = useGetMyFormQuery({});

  const formName =
    "Residency Agreement Template for Foster Care and Supported Living Services (SLS) under the BI, CAC, CADI and DD waivers";

  const dataGet = data?.data?.find((items: any) => items?.title === formName);
  console.log(dataGet, "NEwDAta");

  useEffect(() => {
    if (dataGet)
      setFormData(
        dataGet?.formQuestions?.map((items: any) => ({
          questionId: items?.id,
          value: "",
          multipleValue: [],
          type: items?.question.type,
        }))
      );
  }, [dataGet]);


  const [signature, setSignature] = useState<any> ()

  const signatureValue = (val: any) => {
    if (val) return setSignature(signature);
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
      if (quest?.questionId === questionId) {
        if (isMultiple) {
          let multipleValue = quest.multipleValue;
          const optionFound = multipleValue?.find(
            (option: any) => option === optionId
          );
          if (optionFound) {
            multipleValue = multipleValue.filter(
              (val: any) => val !== optionId
            );
          } else {
            multipleValue.push(optionId);
          }
          return {
            ...quest,
            multipleValue,
          };
        } 
        
        else {
          return { ...quest, value };
        }
       

        
      } else {
        return quest;
      }
    });
  

    setFormData(arrayfound);
  };

 

  console.log(formData, "formData");

  const question = dataGet?.formQuestions
    ?.slice()
    ?.sort((a: any, b: any) => a.arrangement - b.arrangement);

 

  const handleSubmit = async () => {
    const payload = { formId: dataGet?.id, answers: formData };

    console.log(payload, "handleSubmit");
    // handleNext();
    // try {
    //   const response = await createAnswersMutation(payload).unwrap();
    //   if (response) {

    //   }
    //   console.log("Response:", response);
    // } catch (error) {
    //   console.error("Error:", error);
    // }
  };


  
 


 

  return (
    <div className="card p-5">
      <h3 className="card-title text-center">
        {data?.data?.find((items: any) => items?.title === formName)?.title}
      </h3>
      <div className="row pt-3">
        {question?.map((items: any, index: number) => {
          if (
            items?.question?.type === "text" ||
            items?.question?.type === "date" ||
            items?.question?.type === "Signature"
          ) {
            {
              console.log(items?.id, "itemsitemsitems");
            }
            return (
              <div key={index} className="col-lg-6 mb-4">
                {items?.question?.type !== "html" && (
                  <HtmlRenderer items={items} />
                )}

                {items?.question?.type === "Signature" ? (
                  <ESignature signatureValue={signatureValue} />
                ) : (
                  <input
                    type={items?.question?.type}
                    className="form-control"
                    placeholder="Enter..."
                    onChange={(e: any) => handleChange(e, items?.id)}
                  />
                )}
              </div>
            );
          }

          return null;
        })}
      </div>

      {question?.map((items: any, index: any) => (
        <>
          <div
            key={index}
            className="d-flex justify-content-between w-100 align-items-center mb-2"
          >
            <div className="d-flex flex-column gap-2  w-100 my-2">
              {items.question?.type === "textarea" && (
                <Textarea items={items} handleChange={handleChange} />
              )}

              {items.question?.type === "checkbox" &&
                items?.question?.options?.length > 0 && (
                  <>
                    <div className="mb-2">
                      <HtmlRenderer items={items} />
                    </div>
                    <div className="row">
                      {items?.question?.options.map(
                        (option: any, i: number) => (
                          <CheckBox
                            key={i}
                            option={option}
                            optionIndex={i}
                            index={index}
                            handleChange={handleChange}
                            items={items}
                          />
                        )
                      )}
                    </div>
                  </>
                )}

              {items?.question?.type === "html" && (
                <HtmlRenderer items={items} />
              )}
            </div>
          </div>
        </>
      ))}

      <div className="d-flex justify-content-between mt-4 pb-5">
        <button
          className="btn btn-secondary"
          onClick={handleBack}
          disabled={currentStep === 0}
        >
          Back
        </button>
        {currentStep <= 8 ? (
          <button className="btn btn-primary" onClick={handleSubmit}>
            Next
          </button>
        ) : (
          <button
            className="btn btn-success"
            onClick={() => alert("Form Submitted!")}
          >
            Submit
          </button>
        )}
      </div>
    </div>
  );
}

export default ResidencyAgreement;
