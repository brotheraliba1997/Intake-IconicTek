import React, { useEffect, useState } from "react";
import HtmlRenderer from "./common/HtmlRenderer";
import SubquestionChecbox from "./common/Subquestion-Checbox";
import ESignature from "../E-Signature/E-signature";
import { useGetMyFormQuery } from "@/redux/services/form";

interface FormField {
  questionId: string;
  value: string | boolean;
  multipleValue: string[];
  type: string;
  parentQuestionId?: string;
}

function SELFMANAGEMENT() {
  const [formData, setFormData] = useState<FormField[]>([]);
  const { data, isLoading, error } = useGetMyFormQuery({});
  const formName = "SELF-MANAGEMENT ASSESSMENT";
  const dataGet = data?.data?.find((items: any) => items?.title === formName);

  useEffect(() => {
    if (dataGet) {
      const initialData = dataGet.formQuestions.flatMap((q: any) => {
        const base = {
          questionId: q.id,
          value: "",
          multipleValue: [],
          type: q.question.type,
        };

        if (q.question.SubQuestion) {
          return q.question.SubQuestion.map((sub: any) => ({
            questionId: sub.id,
            value: "",
            multipleValue: [],
            type: sub.type,
            parentQuestionId: q.id,
          }));
        }
        return [base];
      });
      setFormData(initialData);
    }
  }, [dataGet]);

  const sortedQuestions = dataGet?.formQuestions?.sort(
    (a: any, b: any) => a.arrangement - b.arrangement
  );

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    questionId: string,
    optionId?: string,
    isCheckboxGroup?: boolean
  ) => {
    const { value, checked, type } = e.target;

    setFormData((prev) =>
      prev.map((item) => {
        if (item.questionId === questionId) {
          if (isCheckboxGroup && optionId) {
            const newValue = checked
              ? [...item.multipleValue, optionId]
              : item.multipleValue.filter((v: string) => v !== optionId);
            return { ...item, multipleValue: newValue };
          }
          return { ...item, value: type === "checkbox" ? checked : value };
        }
        return item;
      })
    );
  };

  const handleSignatureChange = (signature: string, questionId: string) => {
    setFormData((prev) =>
      prev.map((item) =>
        item.questionId === questionId ? { ...item, value: signature } : item
      )
    );
  };

  const getFieldValue = (questionId: string) => {
    return formData.find((fd) => fd.questionId === questionId)?.value || "";
  };

  const getMultipleValues = (questionId: string) => {
    return (
      formData.find((fd) => fd.questionId === questionId)?.multipleValue || []
    );
  };

  return (
    <div className="card p-5">
      <h3 className="card-title text-center">{dataGet?.title}</h3>

      <div className="row pt-3">
        {sortedQuestions?.map((question: any) => {
          if (question.question.type === "html") {
            return (
              <div key={question.id} className="col-12 my-3">
                <HtmlRenderer items={question} />
              </div>
            );
          }

          if (["text", "date"].includes(question.question.type)) {
            return (
              <div key={question.id} className="col-lg-6 my-3">
                <label className="form-label">{question.question.title}</label>
                <input
                  type={question.question.type}
                  value={getFieldValue(question.id) as string}
                  onChange={(e) => handleChange(e, question.id)}
                  className="form-control"
                />
              </div>
            );
          }

          if (question.question.type === "table") {
            return (
              <div key={question.id} className="col-12 my-5">
                <h5>{question.question.title}</h5>
                <table className="table table-bordered">
                  <thead>
                    <tr>
                      {question.question.coloum
                        ?.sort(
                          (a: any, b: any) => a.arrangement - b.arrangement
                        )
                        .map((col: any) => (
                          <th key={col.id}>{col.title}</th>
                        ))}
                    </tr>
                  </thead>
                  <tbody>
                    {question.question.SubQuestion?.map((subq: any) => (
                      <tr key={subq.id}>
                        <td>
                          {subq.title}
                          {subq.options?.map((option: any) => (
                            <div key={option.id} className="form-check">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                checked={getMultipleValues(subq.id).includes(
                                  option.id
                                )}
                                onChange={(e) =>
                                  handleChange(e, subq.id, option.id, true)
                                }
                              />
                              <label className="form-check-label">
                                {option.title}
                              </label>
                            </div>
                          ))}
                        </td>
                        <td>
                          <textarea
                            className="form-control"
                            value={getFieldValue(subq.id) as string}
                            onChange={(e) => handleChange(e, subq.id)}
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );
          }

          return null;
        })}
      </div>

      <div className="mt-5">
        <h3>Signatures</h3>
        <div className="row">
          {sortedQuestions
            ?.flatMap((q: any) => q.question.SubQuestion || [])
            ?.filter((subq: any) => ["date", "Signature"].includes(subq.type))
            ?.sort((a: any, b: any) => a.arrangement - b.arrangement)
            ?.map((subq: any) => (
              <div key={subq.id} className="col-lg-6 mb-4">
                <label className="form-label">{subq.title}</label>
                {subq.type === "Signature" ? (
                  <ESignature
                    onSave={(sig) => handleSignatureChange(sig, subq.id)}
                    signature={getFieldValue(subq.id) as string}
                  />
                ) : (
                  <input
                    type="date"
                    className="form-control"
                    value={getFieldValue(subq.id) as string}
                    onChange={(e) => handleChange(e, subq.id)}
                  />
                )}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default SELFMANAGEMENT;
