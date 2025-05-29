import React from "react";
import { Controller } from "react-hook-form";

function Textarea({ items, control, errors, index, onChange }: any) {
  console.log(errors?.answers?.[index]?.value , "textArea")
  return (
    <Controller
      name={`answers.${index}.value`}
      control={control}
      defaultValue=""
      render={({ field }) => (
        <>
          <div>
            <div dangerouslySetInnerHTML={{ __html: items?.question?.title }} />
          </div>
          <div>
            <textarea
            
              className={`form-control mb-2 ${
                errors?.answers?.[index]?.value ? "is-invalid" : ""
              }`}
              rows={3}
              {...field}
              onChange={(e) => {
                field.onChange(e); // react-hook-form ko sync karta hai
                onChange?.(e);     // tumhara custom handler
              }}
            />
            {errors?.answers?.[index]?.value && (
              <div className="invalid-feedback">
                {errors.answers[index].value.message}
              </div>
            )}
          </div>
        </>
      )}
    />
  );
}

export default Textarea;
