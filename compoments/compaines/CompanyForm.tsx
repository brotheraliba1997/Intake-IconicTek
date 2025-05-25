"use client";
import { CompanyData } from "@/types/company";
import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
// import defaultimg from "@/public/img/profile.jpg";
import { useGetMyProfileQuery } from "@/redux/services/users";
import defaultimg from "@/public/img/camera.jpg"; // or use a public path like "/camera.png"

const CompanyForm = ({
  initialValues = null,
  submitHandler,
  isSubmitLoading,
  UserList,
}: {
  initialValues?: CompanyData | null;
  submitHandler: (data: CompanyData) => Promise<void>;
  isSubmitLoading: boolean;
  UserList: any;
}) => {
  const {
    data: profile,
    isLoading,
    isFetching,
    isError,
  } = useGetMyProfileQuery({});
  const userProfile = profile?.data?.[0];

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
    // companyemail: Yup.string().required("Company Email is required"),
    email: Yup.string().required("Email is required"),
    description: Yup.string().required("Description is required"),
    // clientname: Yup.string().required("Client Name is required"),
    name: Yup.string().required("Client Name is required"),
    phone: Yup.string().required("Phone is required"),
    address: Yup.string().required("Address is required"),
    city: Yup.string().required("City is required"),
    state: Yup.string().required("State is required"),
    zipCode: Yup.string().required("Zip Code is required"),
    // profilePic: Yup.string(),
    profilePic: Yup.string().nullable().notRequired(),
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
      // companyemail: "",
      email: "",
      description: "",
      // clientname: "",
      name: "",
      phone: "",
      address: "",
      city: "",
      state: "",
      zipCode: "",
      profilePic: "",
    },
  });

  console.log("error==>", errors);

  console.log(watch(), "watch");
  // const [selectedImage, setSelectedImage] = useState(defaultimg);
  // const defaultimg = "https://cdn-icons-png.flaticon.com/512/747/747376.png"; // camera icon
  // const defaultimg = "https://cdn-icons-png.flaticon.com/512/685/685655.png";
  const defaultimg = "/img/camera.jpg"; // this works with <img src="">

  const [selectedImage, setSelectedImage] = useState<string>(defaultimg);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleChangePic = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setSelectedImage(base64String); // preview
        setValue("profilePic", base64String, { shouldValidate: true }); // ✅ register with form
        console.log("Selected image base64 path:", base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    if (initialValues?.profilePic) {
      setSelectedImage(initialValues.profilePic); // assume it's a base64 image string
      setValue("profilePic", initialValues.profilePic); // set in form
    } else {
      setSelectedImage(defaultimg); // fallback image
    }
  }, [initialValues?.profilePic, setValue]);

  return (
    <div className="card-body">
      <form
        className="row"
        onSubmit={handleSubmit(submitHandler)}
        // onSubmit={(e) => {
        //   e.preventDefault();
        //   console.log("Form clicked - test log");
        // }}
        // onSubmit={(e) => {
        //   e.preventDefault();
        //   const values = watch();
        //   console.log("Values from form (no validation):", values);
        //   submitHandler(values);
        // }}
      >
        <div className="col-md-12">
          <div className="profile-img-wrap edit-img">
            {selectedImage && (
              <img
                className="inline-block"
                src={selectedImage}
                alt="Profile Pic"
                // width={150}
                width={150}
                height={150}
              />
            )}
            <div className="fileupload btn">
              <span className="btn-text">Edit</span>
              <input
                className="upload"
                type="file"
                accept=".jpg, .jpeg, .png"
                onChange={handleChangePic} // ✅ not onClick
                ref={fileInputRef}
              />
            </div>
          </div>
        </div>
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
              <div className="invalid-feedback">{errors?.email?.message}</div>
            )}
          </div>
        </div>

        <div className="col-md-6 mb-2">
          <div className="form-group">
            <label htmlFor="#" className="form-label">
              Name{" "}
            </label>
            <input type="text" className="form-control" {...register("name")} />
            {/* {userProfile?.role == "admin" ? (
              <input
                type="text"
                className="form-control"
                {...register("name")}
              />
            ) : (
              <select
                className="form-select"
                aria-label="Default select example"
                {...register("name")}
              >
                <option selected>Select the user </option>
                {UserList?.map((items: any, index: number) => (
                  <>
                    <option value={items?.id}>
                      {items?.name} {items?.lastName}{" "}
                    </option>
                  </>
                ))}
              </select>
            )} */}

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
              <div className="invalid-feedback">
                {errors.description.message}
              </div>
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
