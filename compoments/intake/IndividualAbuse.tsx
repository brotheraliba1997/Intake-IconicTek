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
        multipleValue: z.array(z.any()).optional(),
        type: z.string(),
        title: z.string().optional(),
        signatureLink: z.string().optional(),
        options: z.array(z.any()).optional(),
        otherValue: z.string().optional(),
      })
      .superRefine((data, ctx) => {
        if (data.type === "text" && (!data.value || data.value.trim() === "")) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "This field is required",
            path: ["value"],
          });
        } else if (data.type === "radio" && !data.value?.trim()) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Please select an option",
            path: ["value"],
          });
        }

        // DATE validation
        else if (
          data.type === "date" &&
          (!data.value || data.value.trim() === "")
        ) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Date is required",
            path: ["value"],
          });
        } else if (data.type === "Signature" && !data.signatureLink) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Signature is required",
            path: ["signatureLink"],
          });
        }

        const hasOther = data.options?.find(
          (item) => item?.title === "Other:" && data.value === item.id
        );
        if (hasOther && !data.otherValue?.trim()) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "This field is required",
            path: ["otherValue"],
          });
        }

        // HTML (no validation required)
        if (data.type === "html") {
          return;
        }
      })
  ),
});

function IndividualAbuse({ handleBack, handleNext, currentStep }: any) {
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
  console.log("error==>", errors);

  const { data, error } = useGetMyFormQuery({});
  const formName = "Individual Abuse";
  const dataGet = data?.data?.find((items: any) => items?.title === formName);

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
        options: q?.question ? q?.question?.options : [],
      }));
      setValue("answers", initialFormData);
    }
  }, [dataGet, setValue, question]);

  // console.log(question, "questionquestion");
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
  const signatureValue = (
    val: string,
    items: string,
    questionIdFound: string
  ) => {
    console.log(val, items, questionIdFound, "Names");
    const answers = watch("answers");

    const updateQuestionAnswerIndexFound = answers?.findIndex(
      (SignQues: any) => SignQues.questionId === items
    );

    if (updateQuestionAnswerIndexFound === -1) {
      console.error("Question not found");
      return;
    } else
      setValue(
        `answers.${updateQuestionAnswerIndexFound}.signatureLink` as any,
        val,
        {
          shouldValidate: true,
          shouldDirty: true,
        }
      );
  };

  console.log(watch("answers"), "answers");
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
    signatureValue,
    index,
  }: {
    type: string;
    items: any;
    signatureValue: any;
    index: number;
  }) => {
    let questionIdForSignature = items?.id;
    switch (type) {
      case "html":
        return <>{type === "html" && <HtmlRenderer items={items} />}</>;

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
            {items?.question?.type === "radio" && (
              <div className="my-5">
                {items?.question?.title && (
                  <p className="text-left">{items?.question?.title}</p>
                )}

                {items.question.options.map((option: any, i: number) => {
                  const isOther = option.title.toLowerCase().includes("other");
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
                              {isOther && field.value === option.id && (
                                <Controller
                                  name={`answers.${index}.otherValue`}
                                  control={control}
                                  render={({
                                    field: otherField,
                                    fieldState,
                                  }) => {
                                    console.log("Other Field:", field);

                                    return (
                                      <div>
                                        <input
                                          type="text"
                                          className={`form-control mt-2 ${
                                            fieldState?.error
                                              ? "is-invalid"
                                              : ""
                                          }`}
                                          placeholder="Please specify..."
                                          {...otherField}
                                        />

                                        {errors?.answers?.[index]
                                          ?.otherValue && (
                                          <div className="invalid-feedback d-block">
                                            {
                                              errors.answers[index].otherValue
                                                .message
                                            }
                                          </div>
                                        )}
                                      </div>
                                    );
                                  }}
                                />
                              )}
                            </>
                          )}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </>
        );

      case "Signature":
        return (
          <>
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

export default IndividualAbuse;
