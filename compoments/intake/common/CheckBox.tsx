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
  console.log(errors?.answers?.[index].value, "ssss");

  return (
    <div className="col-lg-6" key={optionIndex}>
      <Controller
        name={`answers.${index}.multipleValue.${optionIndex}`} // adjust this if you're storing IDs instead
        control={control}
        defaultValue={false}
        render={({ field }) => (
          <>
            {console.log(field.value, "field")}
            <div className="form-check mb-2">
              <input
                type="checkbox"
                value={option.id}
                checked={
                  Array.isArray(field.value) && field.value.includes(option.id)
                }
                onChange={(e) => {
                  const isChecked = e.target.checked;
                  const optionId = option.id;

                  if (isChecked) {
                    field.onChange([...(field.value || []), optionId]);
                  } else {
                    field.onChange(field.value.filter((v) => v !== optionId));
                  }
                }}
              />
              <label
                className="form-check-label"
                htmlFor={`option-${index}-${optionIndex}`}
              >
                {option.title}
              </label>
            </div>
          </>
        )}
      />
    </div>
  );
}

export default CheckBox;
