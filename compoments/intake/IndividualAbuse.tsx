"use client";
import React from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useGetMyFormQuery } from "@/redux/services/form";
import HospitalLogo from "./common/HospitalLogo";
import StepperButtons from "../common/StepperButtons";
import HtmlRenderer from "./common/HtmlRenderer";
import SignatureCompoment from "../E-Signature/signature";

// Define the validation schema
const formSchema = z.object({
  answers: z.array(
    z
      .object({
        questionId: z.any(),
        value: z.string().optional(),
        multipleValue: z.array(z.any()),
        type: z.string(),
        subQuestion: z
          .array(
            z.object({
              id: z.any(),
              value: z.string().optional(),
              multipleValue: z.array(z.any()).optional(),
              type: z.string(),
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
        } else if (data.type === "checkbox" && !data.value) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Please select an option",
            path: ["value"],
          });
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
    formState: { errors },
  } = useForm({
    defaultValues: {
      answers: [],
    },
    resolver: zodResolver(formSchema),
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const formName = "Individual Abuse";
  const { data, isLoading, error } = useGetMyFormQuery({});
  const dataGet = data?.data?.find((items: any) => items?.title === formName);

  // Sort questions once and store in a memoized value
  const sortedQuestions = React.useMemo(() => {
    return [...(dataGet?.formQuestions || [])].sort(
      (a: any, b: any) => a.arrangement - b.arrangement
    );
  }, [dataGet?.formQuestions]);

  // Initialize form data with sorted questions
  React.useEffect(() => {
    if (dataGet) {
      const initialFormData = sortedQuestions.map((item: any) => {
        const subQuestions =
          item?.question?.SubQuestion?.map((sub: any) => ({
            id: sub.id,
            value: "",
            multipleValue: [],
            type: sub.type,
            signatureLink: "",
          })) || [];

        return {
          questionId: item.id,
          value: "",
          multipleValue: [],
          type: item.question.type,
          subQuestion: subQuestions,
        };
      });

      setValue("answers", initialFormData);
    }
  }, [dataGet, setValue, sortedQuestions]);
  const onSubmit = async (data: any) => {
    try {
      const payload = { formId: dataGet?.id, answers: data.answers };
      console.log(payload, "handleSubmit");
      handleNext();
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const getComponent = ({
    type,
    items,
    index,
  }: {
    type: string;
    items: any;
    index: number;
  }) => {
    switch (type) {
      case "html":
        return (
          <div className="mb-4">
            <HtmlRenderer items={items} />
            {items?.question?.SubQuestion?.map((sub: any, subIndex: number) => {
              if (sub.type === "Signature") {
                return (
                  <div key={sub.id} className="col-lg-6 mb-4">
                    <h5>{sub.title}</h5>
                    <SignatureCompoment
                      signatureValue={(val: string) => {
                        const answers = watch("answers");
                        const updatedAnswers = answers.map((quest: any) => {
                          if (quest.questionId === items.id) {
                            const updatedSubQuestions = quest.subQuestion.map(
                              (sq: any) => {
                                if (sq.id === sub.id) {
                                  return {
                                    ...sq,
                                    signatureLink: val,
                                    value: " ",
                                  };
                                }
                                return sq;
                              }
                            );
                            return {
                              ...quest,
                              subQuestion: updatedSubQuestions,
                            };
                          }
                          return quest;
                        });
                        setValue("answers", updatedAnswers, {
                          shouldValidate: true,
                        });
                      }}
                      items={sub.id}
                      label={sub.title}
                      formData={watch("answers")}
                    />
                    {errors?.answers?.[index]?.subQuestion?.[subIndex]
                      ?.signatureLink && (
                      <span className="text-danger">
                        {
                          errors.answers[index].subQuestion[subIndex]
                            .signatureLink.message
                        }
                      </span>
                    )}
                  </div>
                );
              }
              return null;
            })}
          </div>
        );

      case "text":
      case "date":
        return (
          <div className="col-lg-6 mb-4">
            <HtmlRenderer items={items} />
            <Controller
              name={`answers.${index}.value`}
              control={control}
              rules={{ required: "This field is required" }}
              render={({ field }) => (
                <div>
                  <input
                    type={type === "text" ? "text" : "date"}
                    className={`form-control ${
                      errors?.answers?.[index]?.value ? "is-invalid" : ""
                    }`}
                    placeholder={type === "text" ? "Enter text..." : ""}
                    {...field}
                  />
                  {errors?.answers?.[index]?.value && (
                    <div className="invalid-feedback d-block">
                      {errors.answers[index].value.message}
                    </div>
                  )}
                </div>
              )}
            />
          </div>
        );

      case "checkbox":
        return (
          items?.question?.options?.length > 0 && (
            <div className="mb-4">
              <HtmlRenderer items={items} />
              <div className="row">
                {items.question.options.map((option: any, i: number) => (
                  <div className="col-lg-6" key={option.id}>
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
                          </>
                        )}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )
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
          <div className="row my-5">
            {sortedQuestions.map((items: any, index: number) => (
              <React.Fragment key={items.id}>
                {getComponent({
                  type: items?.question?.type,
                  items,
                  index: sortedQuestions.findIndex((q) => q.id === items.id),
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
    </>
  );
}

export default IndividualAbuse;
