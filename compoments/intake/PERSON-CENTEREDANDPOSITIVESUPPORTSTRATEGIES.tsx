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
        if (data.type === "html") {
          // No validation needed
        } else {
          if (
            !(typeof data.value === "string" && data.value.trim().length > 0)
          ) {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              message: "Value is required",
              path: ["value"],
            });
          }
        }
      })
  ),
});

interface AuthorizationForMedicationProps {
  handleBack: () => void;
  handleNext: () => void;
  currentStep: number;
}

function PERSONCENTEREDANDPOSITIVESUPPORTSTRATEGIES({
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

  const formName = "PERSON-CENTERED AND POSITIVE SUPPORT STRATEGIES";

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
          )?.subQuestion?.findIndex((sq: any) => sq.id === subQuestionId);
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

  const signatureValue = (val: any, items: any) => {
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

export default PERSONCENTEREDANDPOSITIVESUPPORTSTRATEGIES;
