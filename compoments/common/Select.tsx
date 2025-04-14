import React from "react";
import { Controller, Control } from "react-hook-form";
import ReactSelect, { MultiValue, SingleValue } from "react-select";

interface Option {
  label: string;
  value: string;
}

interface SelectProps {
  label: string;
  name: string;
  control: Control<any>;
  options: Option[];
  isError?: boolean;
  isMulti?: boolean;
  isDisabled?: boolean;
}

const Select: React.FC<SelectProps> = ({
  label,
  name,
  control,
  options,
  isError = false,
  isMulti = false,
  isDisabled,
}) => {
  return (
    <div className="mb-3">
      <label htmlFor={name} className="form-label">
        {label}
      </label>

      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <ReactSelect
            isDisabled={isDisabled}
            isMulti={isMulti}
            options={options}
            className={isError ? "is-invalid" : ""}
            {...field}
            onChange={(selected: any) => {
              if (isMulti) {
                field.onChange(
                  (selected as MultiValue<Option>).map((option) => option.value)
                );
              } else {
                field.onChange((selected as SingleValue<Option>)?.value);
              }
            }}
            value={
              isMulti
                ? options.filter((option) =>
                    (field.value as string[])?.includes(option.value)
                  )
                : options.find((option) => option.value === field.value)
            }
          />
        )}
      />
    </div>
  );
};

export default Select;
