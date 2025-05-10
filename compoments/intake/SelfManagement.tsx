import React, { useState } from "react";
import Formlist from "@/form";
import SubquestionChecbox from "./common/Subquestion-Checbox";
import HtmlRenderer from "./common/HtmlRenderer";
import TextInput from "./common/TextInput";
import { useGetMyFormQuery } from "@/redux/services/form";

function SELFMANAGEMENT() {
  const [formData, setFormData] = useState(
    Formlist?.SELFMANAGEMENT?.questions?.map((itms) => ({
      questionId: itms?.id,
      value: "",
      multipleValue: [],
      type: itms?.type,
    }))
  );

  const { data, isLoading, error } = useGetMyFormQuery({});
  const formName = "SELF-MANAGEMENT ASSESSMENT";
  const dataGet = data?.data?.find((items: any) => items?.title === formName);
  console.log(dataGet, "dataGet");
  const question = dataGet?.questions
    ?.slice()
    ?.sort((a: any, b: any) => a.arrangement - b.arrangement)
    ?.map((items: any) => items?.question);

  return (
    <>
      <div className="card p-5">
        <h3 className="card-title text-center">
          {Formlist?.SELFMANAGEMENT?.title}
        </h3>

        <div className="row pt-3">
          {question?.map((items: any, index: any) => {
            if (items.type === "text" || items.type === "date") {
              return (
                <div key={index} className="col-lg-6 my-3">
                  {items.type !== "html" && <HtmlRenderer items={items} />}
                  <TextInput
                    items={items}
                    index={index}
                    // handleChange={handleChange}
                  />
                </div>
              );
            }

            return null;
          })}
        </div>

        {question?.map((items: any, index: any) => (
          <div
            key={index}
            className="d-flex mb-2 justify-content-between w-100 align-items-center"
          >
            <div>
              {items.type === "html" && (
                <>
                  <HtmlRenderer items={items} />
                </>
              )}

              {items?.SubQuestion && items.SubQuestion.length > 0 && (
                <div className="row">
                  {items.SubQuestion.map((subquestion: any, i: any) => (
                    <SubquestionChecbox
                      subquestion={subquestion}
                      index={i}
                      key={i}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default SELFMANAGEMENT;
