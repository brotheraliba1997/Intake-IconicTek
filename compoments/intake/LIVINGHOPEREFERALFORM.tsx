"use client";
import React, { useEffect, useCallback } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Formlist from "@/form";
import SubquestionChecbox from "./common/Subquestion-Checbox";
import HtmlRenderer from "./common/HtmlRenderer";
import TextInput from "./common/TextInput";
import { useGetMyFormQuery } from "@/redux/services/form";
import ESignature from "../E-Signature/E-signature";
import { useCreateAnswersMutation } from "@/redux/services/answer";
import SignatureCompoment from "../E-Signature/signature";
import HospitalLogo from "./common/HospitalLogo";
import handleChange from "../utlity/handleFormChange";
import StepperButtons from "../common/StepperButtons";
import Image from "next/image";
// Define the validation schema
const formSchema = z.object({
  answers: z.array(
    z
      .object({
        questionId: z.any(),
        value: z.string().optional(),
        multipleValue: z.array(z.any()),
        type: z.string(),
        title: z.string().optional(),
        subQuestion: z
          .array(
            z
              .object({
                value: z.string(),
                multipleValue: z.array(z.any()).optional(),
                type: z.string(),
                id: z.any(),
                signatureLink: z.string().optional(),
              })
              .superRefine((data, ctx) => {
                console.log(data, "ccccdata");
                if (data.type === "radio" && data.value == "")
                  ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    message: `${data?.id}`,
                    path: ["value"],
                  });
                else if (data.type === "text" && data.value == "") {
                  ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    message: "value is required",
                    path: ["value"],
                  });
                } else if (data.type === "number" && data.value == "") {
                  ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    message: "value is required",
                    path: ["value"],
                  });
                } else if (data.type === "date" && !data.value) {
                  ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    message: "Date is required",
                    path: ["value"],
                  });
                } else if (data.type === "html" && !data.value) {
                  return;
                }
              })
          )
          .optional(),
      })
      .superRefine((data, ctx) => {
        if (data.type === "text" && !data.value) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "This field is required",
            path: ["value"],
          });
        } else if (data.type === "date" && !data.value) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Date is required",
            path: ["value"],
          });
        } else if (data.type === "radio") {
          const hasChecked = Array.isArray(data.subQuestion)
            ? data.subQuestion.some((sq) => sq.value && sq.value !== "")
            : false;
          if (!hasChecked) {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              message: "Please select an option",
              path: ["value"],
            });
          }
        } else if (data.type === "html" && !data.value) {
          return;
        }
      })
  ),
});

function LIVINGHOPEREFERALFORM({ handleBack, handleNext, currentStep }: any) {
  const {
    control,
    handleSubmit: handleFormSubmit,
    setValue,
    watch,
    getValues,
    formState: { errors, isSubmitted, isDirty },
  } = useForm({
    defaultValues: {
      answers: [],
    },
    resolver: zodResolver(formSchema),
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const { data, error } = useGetMyFormQuery({});
  const formName = "LIVING HOPE REFERAL FORM";

  console.log(watch(), errors, "asssas");

  const dataGet = data?.data?.find((items: any) => items?.title === formName);

  useEffect(() => {
    if (dataGet) {
      // First sort the main questions
      const sortedQuestions = [...(dataGet?.formQuestions || [])].sort(
        (a: any, b: any) => a.arrangement - b.arrangement
      );

      const initialFormData = sortedQuestions.map((items: any, idx: number) => {
        const sortedSubQuestions = items?.question?.SubQuestion
          ? [...items.question.SubQuestion].sort(
              (a: any, b: any) => a.arrangement - b.arrangement
            )
          : [];

        return {
          questionId: items?.id,
          value: "",
          multipleValue: [],
          type: items?.question.type,
          title: items?.question?.title,
          subQuestion: sortedSubQuestions.map((sub: any) => ({
            value: "",
            multipleValue: [],
            type: sub?.type,
            id: sub?.id,
          })),
        };
      });

      setValue("answers", initialFormData);
    }
  }, [dataGet, setValue]);

  const question = dataGet?.formQuestions;
  const [createAnswersMutation, { isLoading }] = useCreateAnswersMutation();

  const onSubmit = async (data: any) => {
    try {
      const payload = { formId: dataGet?.id, answers: data.answers };
      const response = await createAnswersMutation(payload).unwrap();
      if (response) {
        handleNext();
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleFormChange = useCallback(
    (
      e: any,
      config: {
        questionId: any;
        type: string;
        subQuestionId?: any;
        optionId?: any;
        isMultiple?: boolean;
      }
    ) => {
      const { questionId, type, subQuestionId, optionId, isMultiple } = config;
      const value = e?.target?.value;

      if (subQuestionId) {
        const answers = getValues("answers");
        const questionIndex = answers.findIndex(
          (q) => q.questionId === questionId
        );
        if (questionIndex !== -1) {
          const subQuestionIndex = answers[
            questionIndex
          ].subQuestion?.findIndex((sq: any) => sq.id === subQuestionId);
          if (subQuestionIndex !== -1) {
            setValue(
              `answers.${questionIndex}.subQuestion.${subQuestionIndex}.value` as any,
              value,
              {
                shouldDirty: true,
                shouldTouch: true,
                shouldValidate: true,
              }
            );
          }
        }
      } else {
        const answers = getValues("answers");
        const questionIndex = answers.findIndex(
          (q) => q.questionId === questionId
        );
        if (questionIndex !== -1) {
          if (isMultiple) {
            const currentValues = answers[questionIndex].multipleValue || [];
            const newValues = currentValues.includes(optionId)
              ? currentValues.filter((v) => v !== optionId)
              : [...currentValues, optionId];
            setValue(`answers.${questionIndex}.multipleValue`, newValues, {
              shouldDirty: true,
              shouldTouch: true,
              shouldValidate: true,
            });
          } else {
            setValue(
              `answers.${questionIndex}.value`,
              value || optionId || "",
              {
                shouldDirty: true,
                shouldTouch: true,
                shouldValidate: true,
              }
            );
          }
        }
      }
    },
    [setValue, getValues]
  );
  const signatureValue = (val:any, items:any) => {
    const answers = watch("answers");
    const updatedAnswers = answers.map((quest: any) => {
      if (Array.isArray(quest.subQuestion)) {
        const subIndex = quest.subQuestion.findIndex(
          (sq: any) => sq.id === items
        );

        console.log(subIndex, "findIndex");
        if (subIndex !== -1) {
          const updatedSubQuestions = [...quest.subQuestion];
          updatedSubQuestions[subIndex] = {
            ...updatedSubQuestions[subIndex],
            signatureLink: val,
            value: " ", // Set a space to satisfy non-empty validation
          };
          return { ...quest, subQuestion: updatedSubQuestions };
        }
      }
      return quest;
    });

    setValue("answers", updatedAnswers, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
  };

  const signatureUrlFind = watch()?.answers?.flatMap(
    (ques: any) =>
      ques?.subQuestion
        ?.filter((sub: any) => sub?.type === "Signature")
        .map((item: any) => ({
          id: item?.id,
          url: item?.signatureLink || null,
        })) || []
  );

  const getComponent = ({
    type,
    items,
    signatureValue,
    index,
  }: {
    type: string;
    items: any;
    signatureValue: any;
    index: number;
  }) => {
    switch (type) {
      case "html":
        return (
          <>
            {type === "html" && <HtmlRenderer items={items} />}

            <div className="row mt-5">
              {items?.question?.SubQuestion?.slice()
                ?.sort((a: any, b: any) => a.arrangement - b.arrangement)
                ?.map((sub: any, subIndex: any) => (
                  <div key={sub.id} className="col-lg-6 mb-4">
                    {sub?.type === "text" && (
                      <>
                        <div>{sub?.title}</div>{" "}
                        <Controller
                          name={`answers.${index}.subQuestion.${subIndex}.value`}
                          control={control}
                          rules={{ required: "This field is required" }}
                          render={({ field }) => (
                            <div>
                              <input
                                type="text"
                                className={`form-control ${
                                  errors?.answers?.[index]?.value
                                    ? "is-invalid"
                                    : ""
                                }`}
                                placeholder={`Enter ${
                                  items?.question?.title || "text"
                                }...`}
                                {...field}
                                onChange={(e) => {
                                  field.onChange(e);
                                  handleFormChange(e, {
                                    questionId: items?.id,
                                    subQuestionId: sub?.id,
                                    type: "text",
                                  });
                                }}
                              />
                              {errors?.answers?.[index]?.subQuestion?.[subIndex]
                                ?.value && (
                                <div className="invalid-feedback d-block">
                                  {
                                    errors.answers[index].subQuestion[subIndex]
                                      .value.message
                                  }
                                </div>
                              )}
                            </div>
                          )}
                        />
                      </>
                    )}

                    {sub?.type === "date" && (
                      <>
                        <div>{sub?.title}</div>
                        <Controller
                          name={`answers.${index}.subQuestion.${subIndex}.value`}
                          control={control}
                          rules={{ required: "This field is required" }}
                          render={({ field }) => (
                            <div>
                              <input
                                type="date"
                                className={`form-control ${
                                  errors?.answers?.[index]?.subQuestion?.[
                                    subIndex
                                  ]?.value
                                    ? "is-invalid"
                                    : ""
                                }`}
                                {...field}
                                onChange={(e) => {
                                  field.onChange(e);
                                  handleFormChange(e, {
                                    questionId: items?.id,
                                    subQuestionId: sub?.id,
                                    type: "date",
                                  });
                                }}
                              />
                              {errors?.answers?.[index]?.subQuestion?.[subIndex]
                                ?.value && (
                                <div className="invalid-feedback d-block">
                                  {
                                    errors.answers[index].subQuestion[subIndex]
                                      .value.message
                                  }
                                </div>
                              )}
                            </div>
                          )}
                        />
                      </>
                    )}

                    {sub?.type === "number" && (
                      <>
                        <div>{sub?.title}</div>{" "}
                        <Controller
                          name={`answers.${index}.subQuestion.${subIndex}.value`}
                          control={control}
                          rules={{ required: "This field is required" }}
                          render={({ field }) => (
                            <div>
                              <input
                                type="number"
                                className={`form-control ${
                                  errors?.answers?.[index]?.value
                                    ? "is-invalid"
                                    : ""
                                }`}
                                placeholder={`Enter ${
                                  items?.question?.title || "text"
                                }...`}
                                {...field}
                                onChange={(e) => {
                                  field.onChange(e);
                                  handleFormChange(e, {
                                    questionId: items?.id,
                                    subQuestionId: sub?.id,
                                    type: "number",
                                  });
                                }}
                              />
                              {errors?.answers?.[index]?.subQuestion?.[subIndex]
                                ?.value && (
                                <div className="invalid-feedback d-block">
                                  {
                                    errors.answers[index].subQuestion[subIndex]
                                      .value.message
                                  }
                                </div>
                              )}
                            </div>
                          )}
                        />
                      </>
                    )}

                    {sub?.type === "email" && (
                      <>
                        <div>{sub?.title}</div>{" "}
                        <Controller
                          name={`answers.${index}.subQuestion.${subIndex}.value`}
                          control={control}
                          rules={{ required: "This field is required" }}
                          render={({ field }) => (
                            <div>
                              <input
                                type="email"
                                className={`form-control ${
                                  errors?.answers?.[index]?.value
                                    ? "is-invalid"
                                    : ""
                                }`}
                                placeholder={`Enter ${
                                  items?.question?.title || "text"
                                }...`}
                                {...field}
                                onChange={(e) => {
                                  field.onChange(e);
                                  handleFormChange(e, {
                                    questionId: items?.id,
                                    subQuestionId: sub?.id,
                                    type: "email",
                                  });
                                }}
                              />
                              {errors?.answers?.[index]?.subQuestion?.[subIndex]
                                ?.value && (
                                <div className="invalid-feedback d-block">
                                  {
                                    errors.answers[index].subQuestion[subIndex]
                                      .value.message
                                  }
                                </div>
                              )}
                            </div>
                          )}
                        />
                      </>
                    )}
                  </div>
                ))}
            </div>
          </>
        );

      case "text":
      case "date":
      case "number":
        return (
          <>
            {(type === "text" || type === "date" || type === "number") && (
              <div className="col-lg-12 my-3">
                <HtmlRenderer items={items} />
                {type === "text" && (
                  <Controller
                    name={`answers.${index}.value`}
                    control={control}
                    rules={{ required: "This field is required" }}
                    render={({ field }) => (
                      <div>
                        <input
                          type="text"
                          className={`form-control ${
                            errors?.answers?.[index]?.value ? "is-invalid" : ""
                          }`}
                          placeholder={`Enter ${
                            items?.question?.title || "text"
                          }...`}
                          {...field}
                          onChange={(e) => {
                            field.onChange(e);
                            handleFormChange(e, {
                              questionId: items?.id,
                              type: "text",
                            });
                          }}
                        />
                        {errors?.answers?.[index]?.value && (
                          <div className="invalid-feedback d-block">
                            {errors.answers[index].value.message}
                          </div>
                        )}
                      </div>
                    )}
                  />
                )}
                {type === "date" && (
                  <Controller
                    name={`answers.${index}.value`}
                    control={control}
                    rules={{ required: "This field is required" }}
                    render={({ field }) => (
                      <div>
                        <input
                          type="date"
                          className={`form-control ${
                            errors?.answers?.[index]?.value ? "is-invalid" : ""
                          }`}
                          {...field}
                          onChange={(e) => {
                            field.onChange(e);
                            handleFormChange(e, {
                              questionId: items?.id,
                              type: "date",
                            });
                          }}
                        />
                        {errors?.answers?.[index]?.value && (
                          <div className="invalid-feedback d-block">
                            {errors.answers[index].value.message}
                          </div>
                        )}
                      </div>
                    )}
                  />
                )}

                {type === "number" && (
                  <Controller
                    name={`answers.${index}.value`}
                    control={control}
                    rules={{ required: "This field is required" }}
                    render={({ field }) => (
                      <div>
                        <input
                          type="date"
                          className={`form-control ${
                            errors?.answers?.[index]?.value ? "is-invalid" : ""
                          }`}
                          {...field}
                          onChange={(e) => {
                            field.onChange(e);
                            handleFormChange(e, {
                              questionId: items?.id,
                              type: "number",
                            });
                          }}
                        />
                        {errors?.answers?.[index]?.value && (
                          <div className="invalid-feedback d-block">
                            {errors.answers[index].value.message}
                          </div>
                        )}
                      </div>
                    )}
                  />
                )}
              </div>
            )}
          </>
        );

      case "radio":
        return (
          <>
            {items?.question?.type === "radio" && (
              <div className="my-5">
                {items?.question?.title && (
                  <p className="text-left">{items?.question?.title}</p>
                )}

                {items?.question?.SubQuestion?.map(
                  (subquestion: any, subIndex: number) => (
                    <>
                     
                        <div key={subquestion.id} className="mb-3">
                          <SubquestionChecbox
                            subquestion={subquestion}
                            index={index} // This is the index from the main questions map
                            errors={errors}
                            subIndex={subIndex}
                            onChange={(e, optionId, isMultiple) => {
                              handleFormChange(e, {
                                questionId: items?.id,
                                optionId: optionId,
                                isMultiple: isMultiple,
                                type: "radio",
                                subQuestionId: subquestion?.id,
                              });
                              // Clear error state when an option is selected
                              setValue(`answers.${index}.value`, optionId, {
                                shouldValidate: true,
                              });
                            }}
                          />
                        </div>
                     

                      {subquestion?.type === "text" && (
                        <>
                          {/* <div>{subquestion?.title}</div>{" "} */}
                          <Controller
                            name={`answers.${index}.subQuestion.${subIndex}.value`}
                            control={control}
                            rules={{ required: "This field is required" }}
                            render={({ field }) => (
                              <div>
                                <input
                                  type="text"
                                  className={`form-control ${
                                    errors?.answers?.[index]?.value
                                      ? "is-invalid"
                                      : ""
                                  }`}
                                  placeholder={`Enter ${
                                    items?.question?.title || "text"
                                  }...`}
                                  {...field}
                                  onChange={(e) => {
                                    field.onChange(e);
                                    handleFormChange(e, {
                                      questionId: items?.id,
                                      subQuestionId: subquestion?.id,
                                      type: "text",
                                    });
                                  }}
                                />
                                {errors?.answers?.[index]?.subQuestion?.[
                                  subIndex
                                ]?.value && (
                                  <div className="invalid-feedback d-block">
                                    {
                                      errors.answers[index].subQuestion[
                                        subIndex
                                      ].value.message
                                    }
                                  </div>
                                )}
                              </div>
                            )}
                          />
                        </>
                      )}

                      {subquestion?.type === "number" && (
                        <>
                          {/* <div>{subquestion?.title}</div>{" "} */}
                          <Controller
                            name={`answers.${index}.subQuestion.${subIndex}.value`}
                            control={control}
                            rules={{ required: "This field is required" }}
                            render={({ field }) => (
                              <div>
                                <input
                                  type="text"
                                  className={`form-control ${
                                    errors?.answers?.[index]?.value
                                      ? "is-invalid"
                                      : ""
                                  }`}
                                  placeholder={`Enter ${
                                    items?.question?.title || "text"
                                  }...`}
                                  {...field}
                                  onChange={(e) => {
                                    field.onChange(e);
                                    handleFormChange(e, {
                                      questionId: items?.id,
                                      subQuestionId: subquestion?.id,
                                      type: "text",
                                    });
                                  }}
                                />
                                {errors?.answers?.[index]?.subQuestion?.[
                                  subIndex
                                ]?.value && (
                                  <div className="invalid-feedback d-block">
                                    {
                                      errors.answers[index].subQuestion[
                                        subIndex
                                      ].value.message
                                    }
                                  </div>
                                )}
                              </div>
                            )}
                          />
                        </>
                      )}

                      {subquestion?.type === "date" && (
                        <>
                          {/* <div>{subquestion?.title}</div>{" "} */}
                          <Controller
                            name={`answers.${index}.subQuestion.${subIndex}.value`}
                            control={control}
                            rules={{ required: "This field is required" }}
                            render={({ field }) => (
                              <div>
                                <input
                                  type="date"
                                  className={`form-control ${
                                    errors?.answers?.[index]?.value
                                      ? "is-invalid"
                                      : ""
                                  }`}
                                  placeholder={`Enter ${
                                    items?.question?.title || "text"
                                  }...`}
                                  {...field}
                                  onChange={(e) => {
                                    field.onChange(e);
                                    handleFormChange(e, {
                                      questionId: items?.id,
                                      subQuestionId: subquestion?.id,
                                      type: "date",
                                    });
                                  }}
                                />
                                {errors?.answers?.[index]?.subQuestion?.[
                                  subIndex
                                ]?.value && (
                                  <div className="invalid-feedback d-block">
                                    {
                                      errors.answers[index].subQuestion[
                                        subIndex
                                      ].value.message
                                    }
                                  </div>
                                )}
                              </div>
                            )}
                          />
                        </>
                      )}

                    
                    </>
                  )
                )}
              </div>
            )}
          </>
        );

      default:
        return null;
    }
  };

  return (
    <>
      <div className="card px-5 pb-5 pt-3">
        <HospitalLogo />

        <h3 className="card-title text-center">{dataGet?.title}</h3>
        <form onSubmit={handleFormSubmit(onSubmit)}>
          <div className="row pt-3 ">
            {question
              ?.slice()
              ?.sort((a: any, b: any) => a.arrangement - b.arrangement)
              ?.map((items: any, index: any) => (
                <React.Fragment key={items.id}>
                  {getComponent({
                    type: items?.question?.type,
                    items,
                    signatureValue,
                    index,
                  })}
                </React.Fragment>
              ))}
          </div>

          <StepperButtons
            isLoading={isLoading}
            currentStep={currentStep}
            totalSteps={8}
            onNavigate={(direction) => {
              if (direction === "back") handleBack();
              else if (direction === "next") return;
              else if (direction === "submit") handleFormSubmit(onSubmit)();
            }}
          />
        </form>
      </div>
    </>
  );
}

export default LIVINGHOPEREFERALFORM;
