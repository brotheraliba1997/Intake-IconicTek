"use client";
import React, { useCallback, useEffect, useState } from "react";
import Formlist from "@/form";
import { useGetMyFormQuery } from "@/redux/services/form";
import HtmlRenderer from "./common/HtmlRenderer";
import Textarea from "./common/Textarea";
import CheckBox from "./common/CheckBox";
import ESignature from "../E-Signature/E-signature";
import { useCreateAnswersMutation } from "@/redux/services/answer";
import HospitalLogo from "./common/HospitalLogo";
import StepperButtons from "../common/StepperButtons";
import * as z from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import SignatureCompoment from "../E-Signature/signature";

const formSchema = z.object({
  answers: z.array(
    z
      .object({
        questionId: z.any(),
        value: z.string().optional(),
        multipleValue: z.array(z.any()).optional(),
        type: z.string(),
        title: z.string().optional(),
        signatureLink: z.string().optional(),
      })
      .superRefine((data, ctx) => {
        if (data.type === "text" && (!data.value || data.value.trim() === "")) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "This field is required",
            path: ["value"],
          });
        }

        // DATE validation
        if (data.type === "date" && (!data.value || data.value.trim() === "")) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Date is required",
            path: ["value"],
          });
        }

        if (data.type === "Signature" && !data.signatureLink) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Signature is required",
            path: ["signatureLink"],
          });
        }

        // HTML (no validation required)
        if (data.type === "html") {
          return;
        }
      })
  ),
});

function ResidencyAgreement({ handleBack, handleNext, currentStep }: any) {
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

  const formName =
    "Residency Agreement Template for Foster Care and Supported Living Services (SLS) under the BI, CAC, CADI and DD waivers";

  const dataGet = data?.data?.find((items: any) => items?.title === formName);
  console.log(dataGet, "NEwDAta");

  const signatureValue = (url: string, questionId: string) => {
    const updatedAnswers = getValues("answers").map((answer) => {
      if (answer.questionId === questionId) {
        return {
          ...answer,
          signatureLink: url,
        };
      }
      return answer;
    });

    setValue("answers", updatedAnswers, {
      shouldValidate: true,
      shouldDirty: true,
    });
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
                shouldValidate: false,
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
              shouldValidate: false,
            });
          } else {
            setValue(
              `answers.${questionIndex}.value`,
              value || optionId || "",
              {
                shouldDirty: true,
                shouldTouch: true,
                shouldValidate: false,
              }
            );
          }
        }
      }
    },
    [setValue, getValues]
  );

  console.log("form values:", watch("answers"));

  const signatureUrlFind =
    watch("answers")
      ?.filter((item: any) => item?.type === "Signature")
      ?.map((item: any) => ({
        id: item?.questionId,
        url: item?.signatureLink || null,
      })) || [];

  console.log(signatureUrlFind, "signatureUrlFind");

  const handleFormError = (errors: any) => {
    console.error("Form validation errors:", errors);
  };

  const question = React.useMemo(
    () =>
      dataGet?.formQuestions
        ?.slice()
        ?.sort((a: any, b: any) => a.arrangement - b.arrangement),
    [dataGet]
  );

  React.useEffect(() => {
    if (dataGet && question) {
      const initialFormData = question.map((q: any) => ({
        questionId: q?.id,
        value: "",
        multipleValue: [],
        type: q?.question.type,
        title: q?.question.title,
      }));
      setValue("answers", initialFormData);
    }
  }, [dataGet, setValue, question]);

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

  console.log(errors.answers, "errormilrahahai");

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
    console.log(items, "milrahahai");

    switch (type) {
      case "html":
        return <HtmlRenderer items={items} />;
      case "text":
      case "date":
        return (
          <>
            {(type === "text" || type === "date") && (
              <div className="col-lg-6 my-4">
                <HtmlRenderer items={items} />
                {type === "text" && (
                  <Controller
                    name={`answers.${index}.value`}
                    control={control}
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
                        {errors?.answers?.[index]?.value?.message && (
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
                        {errors?.answers?.[index]?.value?.message && (
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

  return (
    <div className="card px-5 pb-5 pt-3">
      <HospitalLogo />
      <h3 className="col-sm-12 card-title text-center">
        {data?.data?.find((items: any) => items?.title === formName)?.title}
      </h3>
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
  );
}

export default ResidencyAgreement;
