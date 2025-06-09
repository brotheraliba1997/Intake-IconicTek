"use client";
import React, { useCallback, useEffect, useState } from "react";
import Formlist from "@/form";
import { useGetMyFormQuery } from "@/redux/services/form";
import { useCreateAnswersMutation } from "@/redux/services/answer";
import HtmlRenderer from "./common/HtmlRenderer";
import Image from "next/image";
import HospitalLogo from "./common/HospitalLogo";
import StepperButtons from "../common/StepperButtons";
import SubquestionChecbox from "./common/Subquestion-Checbox";
import handleChange from "../utlity/handleFormChange";
import * as z from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import CheckBox from "./common/CheckBox";
import SignatureCompoment from "../E-Signature/signature";

const formSchema = z.object({
  answers: z.array(
    z
      .object({
        questionId: z.any(),
        value: z.string().optional(),
        multipleValue: z.array(z.string()).optional(),
        type: z.string(),
        title: z.string().optional(),
        signatureLink: z.string().optional(),
      })
      .superRefine((data, ctx) => {
        console.log(data, "radioGot");
        if (data.type === "radio" && data.value == "") {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Please select an option",
            path: ["value"],
          });
        } else if (data.type === "html") {
          // No validation needed
        }

        if (data.type === "Signature" && !data.signatureLink) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Signature is required",
            path: ["signatureLink"],
          });
        }

        if (data.type === "date" && data.value == "") {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "date is required",
            path: ["date"],
          });
        }
      })
  ),
});

interface AuthorizationForMedicationProps {
  handleBack: () => void;
  handleNext: () => void;
  currentStep: number;
}

function RIGHTSOFPERSONSSERVED({
  handleBack,
  handleNext,
  currentStep,
}: AuthorizationForMedicationProps) {
  const {
    control,
    handleSubmit: handleFormSubmit,
    setValue,
    watch,
    getValues,
    formState: { errors, isSubmitted, isDirty },
    register,
  } = useForm({
    defaultValues: {
      answers: [],
    },
    resolver: zodResolver(formSchema),
    mode: "onChange",
    reValidateMode: "onChange",
  });
  const { data, error } = useGetMyFormQuery({});

  const formName = "RIGHTS OF PERSONS SERVED";

  const dataGet = data?.data?.find((items: any) => items?.title === formName);
  const question = dataGet?.formQuestions
    ?.slice()
    ?.sort((a: any, b: any) => a.arrangement - b.arrangement);
  const [formData, setFormData] = useState();

  useEffect(() => {
    if (dataGet) {
      const sortedQuestions = [...(dataGet?.formQuestions || [])].sort(
        (a: any, b: any) => a.arrangement - b.arrangement
      );

      const initialFormData = sortedQuestions.map((items: any, idx: number) => {
        // Sort subquestions if they exist
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
      console.log(optionId, "config");

      const value = e?.target?.value;

      if (subQuestionId) {
        const answers = getValues("answers");

        const questionIndex = answers.findIndex(
          (q) => q.questionId === questionId
        );
        if (questionIndex !== -1) {
          const subQuestionIndex = (
            answers[questionIndex] as any
          ).subQuestion?.findIndex((sq: any) => sq.id === subQuestionId);
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

  console.log(watch("answers"), errors, "errorsval");

  const signatureValue = (val: string, questionId: string) => {
    const answers = watch("answers");
    const updatedAnswers = answers.map((quest: any) => {
      if (quest.questionId === questionId) {
        return {
          ...quest,
          signatureLink: val,
          value: val, // Set a space to satisfy non-empty validation
        };
      }
      return quest;
    });
    setValue("answers", updatedAnswers, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
  };

  const signatureUrlFind =
    watch("answers")
      ?.filter((item: any) => item?.type === "Signature")
      ?.map((item: any) => ({
        id: item?.questionId,
        url: item?.signatureLink || null,
      })) || [];

  const getComponent = ({
    type,
    items,
    index,
    signatureValue,
  }: {
    type: string;
    items: any;
    index: number;
    signatureValue: any;
  }) => {
    switch (type) {
      case "html":
        return (
          <>
            <style>
              {`
      ul li {
        margin-bottom: 1rem;
      }
    `}
            </style>
            {/* {type === "html" && <HtmlRenderer items={items} />} */}
            {type === "html" && (
              <div
                style={{
                  marginTop: items?.question?.title?.includes(
                    "I understand the following:"
                  )
                    ? "2rem"
                    : "0",
                }}
              >
                <HtmlRenderer items={items} />
              </div>
            )}
          </>
        );

      case "text":
      case "date":
        return (
          <>
            {(type === "text" || type === "date") && (
              <div className="col-lg-6 my-3">
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
              </div>
            )}
          </>
        );

      case "radio":
        return (
          <>
            {type == "radio" && (
              <>
                <div className="mb-2">
                  <HtmlRenderer items={items} />
                </div>
                <div className="row">
                  {items.question.options.map((option: any, i: number) => {
                    // const isOther = option.title
                    //   .toLowerCase()
                    //   .includes("other");
                    return (
                      <div className="col-lg-6" key={i}>
                        <div className="form-check mb-2">
                          <Controller
                            name={`answers.${index}.value`}
                            control={control}
                            rules={{ required: "Please select an option" }}
                            render={({ field }) => (
                              <>
                                <input
                                  type="radio"
                                  className={`form-check-input ${
                                    errors?.answers?.[index]?.value
                                      ? "is-invalid"
                                      : ""
                                  }`}
                                  name={`option-${items.id}`}
                                  id={`option-${index}-${i}`}
                                  checked={field.value === option.id}
                                  onChange={() => field.onChange(option.id)}
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor={`option-${index}-${i}`}
                                >
                                  {option.title}
                                </label>
                                {/* Show input if 'Other' is selected */}
                              </>
                            )}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </>
            )}
          </>
        );

      case "Signature":
        return (
          <>
            <div className="col-lg-6 mb-4">
              <HtmlRenderer items={items} />
              <div className="my-4">
                <SignatureCompoment
                  signatureValue={signatureValue}
                  items={items.id}
                  label={items?.title}
                  formData={watch("answers")}
                  signatureData={signatureUrlFind?.find(
                    (signData) => signData?.id === items?.id
                  )}
                />

                {errors?.answers?.[index]?.signatureLink && (
                  <span className="text-danger">
                    {errors.answers[index].signatureLink.message}
                  </span>
                )}
              </div>
            </div>
          </>
        );

      default:
        return null;
    }
  };

  const [createAnswersMutation, { isLoading }] = useCreateAnswersMutation();
  const onSubmit = async (data: any) => {
    console.log(data, "valueanswers");

    const multipleValueFilter = watch()?.answers?.map((multi) => {
      if (multi?.multipleValue) {
        return {
          ...multi,
          multipleValue: multi?.multipleValue?.filter(
            (fil: any) => fil !== false
          ),
        };
      }
      return multi;
    });

    try {
      const payload = { formId: dataGet?.id, answers: data?.answers };
      const response = await createAnswersMutation(payload).unwrap();
      if (response) {
        handleNext();
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      <div className="card px-5 pb-5 pt-3">
        <HospitalLogo />
        <h3 className="card-title text-center">{dataGet?.title}</h3>

        <form onSubmit={handleFormSubmit(onSubmit)}>
          <div className="d-flex flex-column gap-5">
            <div className="row pt-3 ">
              {question
                ?.slice()
                ?.sort((a: any, b: any) => a.arrangement - b.arrangement)
                ?.map((items: any, index: any) => (
                  <React.Fragment key={items.id}>
                    {getComponent({
                      type: items?.question?.type,
                      items,
                      index,
                      signatureValue,
                    })}
                  </React.Fragment>
                ))}
            </div>
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

export default RIGHTSOFPERSONSSERVED;
