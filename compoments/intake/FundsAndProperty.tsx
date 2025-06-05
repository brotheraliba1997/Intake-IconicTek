"use client";
import React from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useGetMyFormQuery } from "@/redux/services/form";
import { FormData, FormQuestions, Option } from "@/types/form-data";
import HospitalLogo from "./common/HospitalLogo";
import StepperButtons from "../common/StepperButtons";
import HtmlRenderer from "./common/HtmlRenderer";
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

function FUNDSANDPROPERTY({ handleBack, handleNext, currentStep }: any) {
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
  const { data, error } = useGetMyFormQuery({});
  const formName = "FUNDS AND PROPERTY AUTHORIZATION";
  const dataGet: FormData = data?.data?.find(
    (items: any) => items?.title === formName
  );

  // Sort questions once and store in a ref to maintain consistency
  const sortedQuestions = React.useMemo(() => {
    return [...(dataGet?.formQuestions || [])].sort(
      (a: FormQuestions, b: FormQuestions) => a.arrangement - b.arrangement
    );
  }, [dataGet?.formQuestions]);

  // Initialize form data with sorted questions
  React.useEffect(() => {
    if (dataGet) {
      const initialFormData = sortedQuestions.map((question: any) => ({
        questionId: question?.id,
        value: "",
        multipleValue: [],
        type: question?.question ? question?.question.type : "",
      }));

      setValue("answers", initialFormData);
    }
  }, [dataGet, setValue, sortedQuestions]);

  const question = sortedQuestions;
  console.log(question, "question");

  const [createAnswersMutation, {isLoading}] = useCreateAnswersMutation();

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
    index,
  }: {
    type: string;
    items: any;
    index: number;
  }) => {
    switch (type) {
      case "html":
        return (
          <>
            <div className="mt-4 mb-2">
              {type === "html" && <HtmlRenderer items={items} />}
            </div>
          </>
        );

      case "text":
        return (
          <>
            {type === "text" && (
              <div className="col-lg-12 mt-5">
                <HtmlRenderer items={items} />
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
                        placeholder="Enter text..."
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
            )}
          </>
        );

      case "checkbox":
        return (
          items?.question?.options &&
          items.question.options.length > 0 && (
            <div className="row">
              <HtmlRenderer items={items} />
              {items.question.options.map((option: Option, i: number) => {
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
          {" "}
          <div className="row pt-3">
            {question?.map((items: any, index: number) => (
              <React.Fragment key={items.id}>
                {getComponent({
                  type: items?.question?.type,
                  items,
                  index: sortedQuestions.findIndex((q) => q.id === items.id), // Use consistent index
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

export default FUNDSANDPROPERTY;
