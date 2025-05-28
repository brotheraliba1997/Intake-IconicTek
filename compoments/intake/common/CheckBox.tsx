import { Controller } from "react-hook-form";

function CheckBox({ control, items, option, optionIndex, index, handleChange, errors }: any) {
  console.log( errors?.answers?.[index].value, index, "ssss")

  return (
    <div className="col-lg-6" key={optionIndex}>
      
      <Controller
        name={`answers.${index}.multipleValue.${optionIndex}`} // adjust this if you're storing IDs instead
        control={control}
        defaultValue={false}
        render={({ field }) => (
          <div className="form-check mb-2">
            <input
              type="checkbox"
              className={`form-check-input ${
                errors?.answers?.[index]?.value?.message ? "is-invalid" : ""
              }`}
              id={`option-${index}-${optionIndex}`}
              value={option?.id}
              checked={field.value}
              onChange={(e) => {
                const isChecked = e.target.checked
                const value = e.target.value;
                // if(isChecked)
                field.onChange(isChecked? value : false); // ✅ This is correct for boolean values
               
              }}
            />
            <label className="form-check-label" htmlFor={`option-${index}-${optionIndex}`}>
              {option.title}
            </label>
          </div>
        )}
      />
    </div>
  );
}

export default CheckBox;
