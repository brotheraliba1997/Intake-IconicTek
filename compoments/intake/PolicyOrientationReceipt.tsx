"use client";
import React, { useEffect } from "react";
import { useGetMyFormQuery } from "@/redux/services/form";
import HtmlRenderer from "./common/HtmlRenderer";
import HospitalLogo from "./common/HospitalLogo";
import StepperButtons from "../common/StepperButtons";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import SignatureCompoment from "../E-Signature/signature";
import { useCreateAnswersMutation } from "@/redux/services/answer";

// Define the validation schema
const formSchema = z.object({
  answers: z.array(
    z
      .object({
        questionId: z.any(),
        value: z.string().optional(),
        multipleValue: z.array(z.any()),
        type: z.string(),
        otherValue: z.string().optional(),
        signatureLink: z.string().optional(),
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
        } else if (data.type === "checkbox" && !data.value) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Please select an option",
            path: ["value"],
          });
        } else if (data.type === "Signature" && !data.signatureLink) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Signature is required",
            path: ["signatureLink"],
          });
        }
      })
  ),
});

function POLICYORIENTATIONRECEIPT({
  handleBack,
  handleNext,
  currentStep,
}: any) {
  const { data, isLoading, error } = useGetMyFormQuery({});
  const formName = "Policy Orientation Receipt";
  const dataGet = data?.data?.find((items: any) => items?.title === formName);
  const question = React.useMemo(
    () =>
      dataGet?.formQuestions
        ?.slice()
        ?.sort((a: any, b: any) => a.arrangement - b.arrangement),
    [dataGet]
  );

  console.log(question, "Date");

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

  React.useEffect(() => {
    if (dataGet && question) {
      const initialFormData = question.map((q: any) => ({
        questionId: q?.id,
        value: "",
        multipleValue: [],
        type: q?.question.type,
      }));
      setValue("answers", initialFormData);
    }
  }, [dataGet, setValue, question]);
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
  // Signature logic (like in SELFMANAGEMENT)
  const signatureValue = (val: string, questionId: string) => {
    const answers = watch("answers");
    const updatedAnswers = answers.map((quest: any) => {
      if (quest.questionId === questionId) {
        return {
          ...quest,
          signatureLink: val,
          value: " ", // Set a space to satisfy non-empty validation
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

  const getComponent = (items: any, index: number) => {
    const type = items?.question?.type;
    if (type === "html") {
      return <HtmlRenderer items={items} />;
    }
    if (type === "Signature") {
      return (
        <div className="col-lg-6 mb-4">
          <HtmlRenderer items={items} />
          <div className="my-4">
            <SignatureCompoment
              signatureValue={(val: string) => signatureValue(val, items?.id)}
              items={items?.id}
              label={items?.question?.title}
              formData={watch("answers")}
              signatureData={{
                id: items?.id,
                url: watch(`answers.${index}.signatureLink`) || null,
              }}
            />
          </div>
          {errors?.answers?.[index]?.signatureLink && (
            <span className="text-danger">
              {errors.answers[index].signatureLink.message}
            </span>
          )}
        </div>
      );
    }
    if (type === "text" || type === "date") {
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
                  type={type}
                  className={`form-control ${
                    errors?.answers?.[index]?.value ? "is-invalid" : ""
                  }`}
                  placeholder="Enter..."
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
    }
    if (type === "checkbox" && items?.question?.options?.length > 0) {
      return (
        <div className="mb-4">
          <div dangerouslySetInnerHTML={{ __html: items?.question?.title }} />
          <div className="row">
            {items.question.options.map((option: any, i: number) => {
              const isOther = option.title.toLowerCase().includes("other");
              return (
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
                              render={({ field: otherField }) => (
                                <input
                                  type="text"
                                  className="form-control mt-2"
                                  placeholder="Please specify..."
                                  {...otherField}
                                />
                              )}
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
        </div>
      );
    }
    return null;
  };

  return (
    <>
      <div className="card px-5 pb-5 pt-3">
        <HospitalLogo />
        <h3 className="card-title text-center">{dataGet?.title}</h3>
        <form onSubmit={handleFormSubmit(onSubmit)}>
          <div className="row pt-3">
            {question?.map((items: any, index: number) => (
              <React.Fragment key={items.id}>
                {getComponent(items, index)}
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

export default POLICYORIENTATIONRECEIPT;
