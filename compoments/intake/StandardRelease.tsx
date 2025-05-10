import React, { useState } from "react";
import Formlist from "@/form";
import { useGetMyFormQuery } from "@/redux/services/form";
import TextInput from "./common/TextInput";
import HtmlRenderer from "./common/HtmlRenderer";
import Textarea from "./common/Textarea";
import CheckBox from "./common/CheckBox";

function StandardRelease() {
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

  const formName = "STANDARD RELEASE OF INFORMATION";

  const dataGet = data?.data?.find((items: any) => items?.title === formName);

  const question = dataGet?.questions
    ?.slice()
    ?.sort((a: any, b: any) => a.arrangement - b.arrangement)
    ?.map((items: any) => items?.question);

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
                  {items.type !== "html" && <HtmlRenderer items={items} />}
                  <TextInput
                    items={items}
                    index={index}
                    handleChange={handleChange}
                  />
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
                {items.type === "textarea" && (
                  <Textarea items={items} handleChange={handleChange} />
                )}

                {items?.type === "checkbox" && items.options?.length > 0 && (
                  <>
                    <div className="mb-2">
                      <HtmlRenderer items={items} />
                    </div>
                    <div className="row">
                      {items.options.map((option: any, i: number) => (
                        <CheckBox
                          key={i}
                          option={option}
                          optionIndex={i}
                          index={index}
                        />
                      ))}
                    </div>
                  </>
                )}

                {items.type === "html" && <HtmlRenderer items={items} />}
              </div>
            </div>
          </>
        ))}
      </div>
    </>
  );
}

export default StandardRelease;
