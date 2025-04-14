"use client";
import { CompanyData } from "@/types/company";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Select from "../common/Select";

const CompanyForm = ({
  initialValues = null,
  submitHandler,
  isSubmitLoading,
}: {
  initialValues?: CompanyData | null;
  submitHandler: (data: CompanyData) => Promise<void>;
  isSubmitLoading: boolean;
}) => {
  const [stateOptions, setStateOptions] = useState<
    { value: string; label: string }[]
  >([]);

  const [cityOptions, setCityOptions] = useState<
    { value: string; label: string }[]
  >([]);

  const [timezoneOptions, setTimezoneOptions] = useState<
    { value: string; label: string }[]
  >([]);

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    description: Yup.string().required("Description is required"),
    email: Yup.string().required("Email is required"),
    phone: Yup.string().required("Phone is required"),
    address: Yup.string().required("Address is required"),
    city: Yup.string().required("City is required"),
    state: Yup.string().required("State is required"),
    zipCode: Yup.string().required("Zip Code is required"),
  });

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    watch,
    setValue,
  } = useForm<CompanyData>({
    resolver: yupResolver(validationSchema),
    defaultValues: initialValues ?? {
      name: "",
      description: "",
    },
  });



  return (
    <div className="card-body">
      <form action="" className="row" onSubmit={handleSubmit(submitHandler)}>
        <div className="col-md-6 mb-2">
          <div className="form-group">
            <label htmlFor="#" className="form-label">
              Company Email
            </label>
            <input
              type="text"
              className="form-control"
              {...register("email")}
            />

            {errors.email && (
              <div className="invalid-feedback">{errors.email.message}</div>
            )}
          </div>
        </div>
        <div className="col-md-6 mb-2">
          <div className="form-group">
            <label htmlFor="#" className="form-label">
              Client Name{" "}
            </label>
            <input type="text" className="form-control" {...register("name")} />

            {errors.name && (
              <div className="invalid-feedback">{errors.name.message}</div>
            )}
          </div>
        </div>
        <div className="col-md-12">
          <div className="mb-3">
            <label htmlFor="address" className="form-label">
              Address <span className="text-danger">*</span>
            </label>
            <input
              id="address"
              type="text"
              placeholder="Enter Address"
              className={`form-control ${errors.address ? "is-invalid" : ""}`}
              {...register("address")}
            />
            {errors.address && (
              <div className="invalid-feedback">{errors.address.message}</div>
            )}
          </div>
        </div>


        <div className="col-md-4">
          <div className="mb-3">
            <label htmlFor="address" className="form-label">
              Phone <span className="text-danger">*</span>
            </label>
            <input
              id="address"
              type="text"
              placeholder="Phone"
              className={`form-control ${errors.address ? "is-invalid" : ""}`}
              {...register("phone")}
            />
            {errors.phone && (
              <div className="invalid-feedback">{errors.phone.message}</div>
            )}
          </div>
        </div>
        <div className="col-md-4">
          <div className="mb-3">
            <label htmlFor="zipCode" className="form-label">
              Zipcode
            </label>
            <input
              id="zipCode"
              type="text"
              placeholder="Enter Zipcode"
              className={`form-control ${errors.zipCode ? "is-invalid" : ""}`}
              {...register("zipCode")}
            />
            {errors.zipCode && (
              <div className="invalid-feedback">{errors.zipCode.message}</div>
            )}
          </div>
        </div>
        <div className="col-md-4">
          {/* <Select
            label="State"
            control={control}
            name="state"
            options={stateOptions}
            isMulti={false}
          /> */}
          <label htmlFor="zipCode" className="form-label">
            State
          </label>

          <input
            id="zipCode"
            type="text"
            placeholder="state"
            className={`form-control ${errors.zipCode ? "is-invalid" : ""}`}
            {...register("state")}
          />
          {errors.zipCode && (
            <div className="invalid-feedback">{errors.zipCode.message}</div>
          )}
        </div>
        <div className="col-md-4">
          {/* <Select
            label="City"
            control={control}
            name="city"
            options={cityOptions}
            isMulti={false}
          /> */}

          <label htmlFor="zipCode" className="form-label">
            City
          </label>

          <input
            id="zipCode"
            type="text"
            placeholder="city"
            className={`form-control ${errors.zipCode ? "is-invalid" : ""}`}
            {...register("city")}
          />
          {errors.zipCode && (
            <div className="invalid-feedback">{errors.zipCode.message}</div>
          )}
        </div>
        {/* <div className="col-md-12">
          <Select
            label="Timezone"
            control={control}
            name="timezone"
            options={timezoneOptions}
            isMulti={false}
          />
          {errors.timezone && (
            <div className="invalid-feedback">{errors.timezone.message}</div>
          )}
        </div> */}
        {/* <div className="col-md-6 mb-2">
          <div className="form-group">
            <label htmlFor="#" className="form-label">
              Amount
            </label>
            <input type="number" className="form-control" name="" id="" />
          </div>
        </div> */}
        {/* <div className="col-md-6 mb-2">
          <div className="form-group">
            <label htmlFor="#" className="form-label">
              Start date
            </label>
            <input type="date" className="form-control" name="" id="" />
          </div>
        </div> */}
        <div className="col-md-12 mb-2">
          <div className="form-group">
            <label htmlFor="#" className="form-label">
            Description
            </label>
            <textarea
              className="form-control"
              rows={4}
              id=""
              defaultValue={""}
              {...register("description")}
            />
             {errors.description && (
            <div className="invalid-feedback">{errors.description.message}</div>
          )}
          </div>
        </div>
        <div className="col-md-12">
          <div className="text-end border-top pt-3">
            <button type="submit" className="btn btn-secondary">
              <i data-feather="send" className="me-2" /> Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CompanyForm;
