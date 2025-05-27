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
        value: z.string().min(1, { message: "This field is required" }),
        multipleValue: z.array(z.any()),
        type: z.string(),
        title: z.string().optional(),
        subQuestion: z
          .array(
            z.object({
              value: z.string().min(1, { message: "This field is required" }),
              multipleValue: z.array(z.any()).optional(),
              type: z.string(),
              id: z.any(),
              signatureLink: z.string().optional(),
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
    mode: "onTouched", // Only validate on blur
    reValidateMode: "onBlur", // Only revalidate on blur
  });

  const { data, isLoading, error } = useGetMyFormQuery({});

  const formName =
    "Residency Agreement Template for Foster Care and Supported Living Services (SLS) under the BI, CAC, CADI and DD waivers";

  const dataGet = data?.data?.find((items: any) => items?.title === formName);
  console.log(dataGet, "NEwDAta");

  useEffect(() => {
    if (dataGet) {
      const initialFormData = dataGet?.formQuestions?.map(
        (items: any, idx: number) => ({
          questionId: items?.id,
          value: "",
          multipleValue: [],
          type: items?.question.type,
          title: items?.question?.title,
          subQuestion: items?.question?.SubQuestion?.map(
            (sub: any, subIdx: number) => ({
              value: "",
              multipleValue: [],
              type: sub?.type,
              id: sub?.id,
            })
          ),
        })
      );
      setValue("answers", initialFormData);
    }
  }, [dataGet, setValue]);

  const signatureValue = (val, items) => {
    const answers = watch("answers");
    const updatedAnswers = answers.map((quest: any) => {
      if (quest.questionId) {
        if (quest.questionId === items) {
          return { ...quest, signatureLink: val };
        }
        return quest;
      }

      if (Array.isArray(quest.subQuestion)) {
        const updateQuestion = quest?.subQuestion?.map((subquest: any) => {
          if (subquest?.id === items) {
            return { ...subquest, signatureLink: val };
          }
          return subquest;
        });
        return { ...quest, subQuestion: updateQuestion };
      }
      return quest;
    });

    setValue("answers", updatedAnswers);
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
              `answers.${questionIndex}.subQuestion.${subQuestionIndex}.value`,
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

  const question = dataGet?.formQuestions;

  const [createAnswersMutation] = useCreateAnswersMutation();

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
        return <>{type === "html" && <HtmlRenderer items={items} />}</>;

      case "text":

      case "date":
        return (
          <>
            {(type === "text" || type === "date") && (
              <div className="col-lg-5 my-4">
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

      case "Signature":
        return (
          <>
            <div className="row"></div>
            <div className="col-md-6 my-3">
              <h5>{items?.question?.title}</h5>
              {items?.question?.type === "Signature" && (
                <>
                  <SignatureCompoment
                    signatureValue={signatureValue}
                    items={items.id}
                    label={items?.title}
                    formData={watch("answers")}
                    signatureData={signatureUrlFind?.find(
                      (signData) => signData?.id === items?.id
                    )}
                  />
                </>
              )}
            </div>
            {/* </div> */}
          </>
        );

      default:
        return null;
    }
  };

  return (
    <div className="card px-5 pb-5 pt-3">
      <HospitalLogo />
      <h3 className="card-title text-center">
        {data?.data?.find((items: any) => items?.title === formName)?.title}
      </h3>
      <form onSubmit={handleFormSubmit(onSubmit, handleFormError)}>
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
