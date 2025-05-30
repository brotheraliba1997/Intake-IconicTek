import { Controller } from "react-hook-form";

function CheckBox({
  control,
  items,
  option,
  optionIndex,
  index,
  handleChange,
  errors,
}: any) {
  console.log(errors?.answers, "ssss");

  return (
    // <div className="col-lg-6" key={optionIndex}>
    //   <Controller
    //     key={option.id}
    //     name={`answers.${index}.multipleValue`}
    //     control={control}
    //     defaultValue={[]}
    //     render={({ field }) => {
    //       const checked = field.value.includes(option.id);
    //       return (
    //         <div className="form-check">
    //           <input
    //             type="checkbox"
    //             className={`form-check-input ${
    //               errors.answers?.[index]?.multipleValue ? "is-invalid" : ""
    //             }`}
    //             id={`option-${index}-${optionIndex}`}
    //             value={option.id}
    //             checked={checked}
    //             onChange={(e) => {
    //               const newValue = e.target.checked
    //                 ? [...field.value, option.id]
    //                 : field.value.filter((val: any) => val !== option.id);
    //               field.onChange(newValue);
    //             }}
    //           />
    //           <label
    //             className="form-check-label"
    //             htmlFor={`option-${index}-${optionIndex}`}
    //           >
    //             {option.title}
    //           </label>
    //         </div>
    //       );
    //     }}
    //   />

    //   {errors.answers?.[index]?.multipleValue && (
    //     <p className="invalid-feedback">
    //       {errors.answers[index].multipleValue.message}
    //     </p>
    //   )}
    // </div>
    <div
      className="col-lg-6"
      key={optionIndex}
      style={{
        marginBottom:
          optionIndex === items?.question?.options.length - 1 ? "1rem" : "0",
      }}
    >
      <Controller
        key={option.id}
        name={`answers.${index}.multipleValue`}
        control={control}
        defaultValue={[]}
        render={({ field }) => {
          const checked = field.value.includes(option.id);
          return (
            <div className="form-check">
              <input
                type="checkbox"
                className={`form-check-input ${
                  errors.answers?.[index]?.multipleValue ? "is-invalid" : ""
                }`}
                id={`option-${index}-${optionIndex}`}
                value={option.id}
                checked={checked}
                onChange={(e) => {
                  const newValue = e.target.checked
                    ? [...field.value, option.id]
                    : field.value.filter((val: any) => val !== option.id);
                  field.onChange(newValue);
                }}
              />
              <label
                className="form-check-label"
                htmlFor={`option-${index}-${optionIndex}`}
              >
                {option.title}
              </label>
            </div>
          );
        }}
      />

      {errors.answers?.[index]?.multipleValue && (
        <p className="invalid-feedback">
          {errors.answers[index].multipleValue.message}
        </p>
      )}
    </div>
  );
}

export default CheckBox;
