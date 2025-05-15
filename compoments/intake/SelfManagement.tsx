import React, { useEffect, useState } from "react";
import Formlist from "@/form";
import SubquestionChecbox from "./common/Subquestion-Checbox";
import HtmlRenderer from "./common/HtmlRenderer";
import TextInput from "./common/TextInput";
import { useGetMyFormQuery } from "@/redux/services/form";
import ESignature from "../E-Signature/E-signature";

function SELFMANAGEMENT() {
  const [formData, setFormData] = useState();

  const { data, isLoading, error } = useGetMyFormQuery({});
  const formName = "SELF-MANAGEMENT ASSESSMENT";
  const dataGet = data?.data?.find((items: any) => items?.title === formName);

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

  const question = dataGet?.formQuestions
    ?.slice()
    ?.sort((a: any, b: any) => a.arrangement - b.arrangement);

  const subQuestion = (question || [])
    .map((item: any) => item?.question?.SubQuestion || [])
    .flat()
    .filter((sub: any) => sub.type === "date" || sub.type === "Signature")
    .sort((a: any, b: any) => a.arrangement - b.arrangement);


     const coloum = (question || [])
    .map((item: any) => item?.question?.coloum || [])
    .flat()
    
    .sort((a: any, b: any) => a.arrangement - b.arrangement);

  console.log(subQuestion, "subQuestion");

  return (
    <>
      <div className="card p-5">
        <h3 className="card-title text-center">{dataGet?.title}</h3>

        <div className="row pt-3">
          {question?.map((items: any, index: any) => {
            if (
              items?.question?.type === "text" ||
              items?.question?.type === "date"
            ) {
              return (
                <div key={index} className="col-lg-6 my-3">
                  {items?.question?.type !== "html" && (
                    <HtmlRenderer items={items} />
                  )}
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
              {items?.question?.type === "html" && (
                <>
                  <HtmlRenderer items={items} />
                </>
              )}

              {items?.question?.type === "table" && (
                <>
                  {/* Table Title */}
                  {items?.title && (
                    <p className="text-left">{items?.question.title}</p>
                  )}

                  <table className="table table-bordered my-5">
                    <thead>
                      <tr>
                        {/* Column Headers */}
                        {coloum?.map(
                          (coloum: any, index: number) => (
                            <th key={index}>
                              <p
                                style={{
                                  textWrap: "wrap",
                                  width: "350px",
                                  padding: "0 20px",
                                }}
                              >
                                {coloum?.title}
                              </p>
                            </th>
                          )
                        )}
                      </tr>
                    </thead>

                    <tbody>
                      {/* SubQuestion as rows */}
                      {items?.question?.SubQuestion &&
                        items?.question?.SubQuestion.length > 0 &&
                        items?.question?.SubQuestion.map(
                          (subquestion: any, i: number) => (
                            <tr key={i}>
                              <td colSpan={items?.coloum?.length || 1}>
                                <SubquestionChecbox
                                  subquestion={subquestion}
                                  index={i}
                                />
                              </td>
                            </tr>
                          )
                        )}
                    </tbody>
                  </table>
                </>
              )}

              {items?.SubQuestion && items.SubQuestion.length > 0 && (
                <div className="row my-2">
                  {items.SubQuestion.map((sub: any, i: number) => (
                    <div className="col-lg-6" key={i}>
                      {(sub?.type === "Signature" || sub?.type === "date") && (
                        <>
                          <label className="form-label">{sub.title}</label>
                          <input
                            type={sub?.type}
                            className="form-control mb-3"
                            placeholder="Enter..."
                          />
                        </>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}

        <div className="mt-5 d-flex flex-column gap-4">
          <h3>Signature:</h3>
          {subQuestion && subQuestion.length > 0 && (
            <div className="row">
              {subQuestion.map((sub: any, i: number) => (
                <div className="col-lg-6 mb-4 " key={i}>
                  {(sub?.type === "Signature" || sub?.type === "date") && (
                    <>
                      <h6 className=" ">{sub.title}</h6>
                    </>
                  )}

                  {sub?.type === "Signature" ? (
                    <ESignature />
                  ) : sub?.type === "date" ? (
                    <input
                      type={sub.type}
                      className="form-control mb-3"
                      placeholder="Enter..."
                    />
                  ) : null}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default SELFMANAGEMENT;
