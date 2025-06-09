import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { UserData, UserFormDataType } from "@/types/user";
// import Button from "@/components/common/Button";
import { CompanyData } from "@/types/company";
import { useGetCompaniesQuery } from "@/redux/services/companies";
// import Select from "@/components/common/Select";
// import axios from "axios";
// import { City, State } from "country-state-city";
// import PhoneNumberInput from "@/components/common/PhoneInput";
import { useSession } from "next-auth/react";
// import ProfilePhoto from "@/components/common/ProfilePhoto";

import toast from "react-hot-toast";
import { useUploadProfilePictureMutation } from "@/redux/services/users";
import Select from "../common/Select";
import Spinner from "react-bootstrap/esm/Spinner";

const UserForm = ({
  initialValues = null,
  submitHandler,
  isSubmitLoading,
}: {
  initialValues?: any | null;
  submitHandler: (data: any) => Promise<void>;
  isSubmitLoading: boolean;
}) => {
  const { data, update } = useSession();
  const { user }: any = data;

  const [stateOptions, setStateOptions] = useState<
    { value: string; label: string }[]
  >([]);

  const [cityOptions, setCityOptions] = useState<
    { value: string; label: string }[]
  >([]);

  const [loadingZip, setLoadingZip] = useState(false);

  const { data: companiesList } = useGetCompaniesQuery({
    page: 1,
    limit: 100,
  });

  const validationSchema = Yup.object().shape({
    firstName: Yup.string()
      .min(2, "First Name must be at least 2 characters")
      .max(50, "First Name cannot exceed 50 characters")
      .required("First Name is required"),

    lastName: Yup.string()
      .min(2, "Last Name must be at least 2 characters")
      .max(50, "Last Name cannot exceed 50 characters")
      .required("Last Name is required"),
    phone: Yup.string().max(19, "maximum 19 digit").required(),
    // profileImageUrl: Yup.string().required(),

    email: Yup.string()
      .email("Invalid email address")
      .required("Email Address is required"),

    state: Yup.string().required("state is required"),
    city: Yup.string().required("city is required"),

    password: Yup.string().when("$isAdd", ([isAdd], passSchema) => {
      console.log("isAdd:", isAdd); // Debug log

      return isAdd
        ? passSchema.required("Password is required")
        : passSchema.optional();
    }),

    confirmPassword: Yup.string().when("$isAdd", ([isAdd], passSchema) =>
      isAdd
        ? passSchema
            .oneOf([Yup.ref("password")], "Passwords must match")
            .required("Confirm Password is required")
        : passSchema
            .optional()
            .oneOf([Yup.ref("password")], "Passwords must match")
    ),

    zipCode: Yup.string()
      .matches(/^[0-9]*$/, "Zip Code must be numeric")
      .max(5, "Zip Code cannot exceed 5 digits"),

    companyId: Yup.string().optional(),
  });

  const isAdd = !initialValues;

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    watch,
    setValue,
  } = useForm<any>({
    resolver: yupResolver(validationSchema),
    context: { isAdd },
    defaultValues: initialValues ?? {
      firstName: "",
      lastName: "",
      // role: "client",
      password: "",
      confirmPassword: "",
      profileImageUrl: "",
      // providerId: "",
      // description: "",
      // programs: [],
    },
  });
  console.log("errors=?", errors);

  const founderrors: any = errors;
  // const handleZipCodeChange = async (zipCode: string) => {
  //   if (zipCode.length !== 5) return; // Validate zip code length
  //   setLoadingZip(true);

  //   try {
  //     const response = await axios.get(
  //       `https://api.zippopotam.us/us/${zipCode}`
  //     );
  //     const { places, country } = response.data;

  //     if (places && places.length > 0) {
  //       const city = places[0]["place name"];
  //       const state = places[0]["state abbreviation"];

  //       setValue("city", city);
  //       setValue("state", state);
  //     } else {
  //       alert("No data found for this zip code.");
  //     }
  //   } catch (error) {
  //     alert("Invalid zip code or error fetching data.");
  //   } finally {
  //     setLoadingZip(false);
  //   }
  // };

  // const zipCode = watch().zipCode ?? "";
  // const state = watch().state ?? "";

  // useEffect(() => {
  //   if (zipCode.length == 5) handleZipCodeChange(zipCode);
  // }, [zipCode]);

  // useEffect(() => {
  //   const states = State.getStatesOfCountry("US");
  //   setStateOptions(
  //     states.map((state) => ({ value: state.isoCode, label: state.name }))
  //   );
  // }, []);

  // useEffect(() => {
  //   const cities = City.getCitiesOfState("US", state);
  //   setCityOptions(
  //     cities.map((city) => ({ value: city.name, label: city.name }))
  //   );
  // }, [state]);

  const [uploadProfilePicture] = useUploadProfilePictureMutation();

  const profileImageUrl = watch().profileImageUrl ?? "";
  const uploadProfilePictureHandler = async (file: any) => {
    // if (!e.target.files || e.target.files.length === 0) {
    //   console.error("No file selected");
    //   return;
    // }

    // const file = e.target.files[0];
    const formData = new FormData();
    formData.append("file", file);
    // console.log("e=>", e);
    try {
      const { data } = await uploadProfilePicture(formData).unwrap();
      setValue("profileImageUrl", data?.filePath);

      toast.success("Profile picture uploaded successfully");
    } catch (error) {
      toast.error("Error uploading profile picture");
    }
  };

  console.log("user", watch(), user);
  return (
    <form className="row" onSubmit={handleSubmit(submitHandler)}>
      <div className="col-md-12">
        {/* <ProfilePhoto
          label="Profie Picture"
          placeholder="Add Picture"
          image={`${process.env.NEXT_PUBLIC_BUCKET_PUBLIC_URL}/${profileImageUrl}`}
          onImageChange={uploadProfilePictureHandler}
        /> */}
      </div>
      <div className="col-md-6">
        {user.role == "super_admin" ? (
          <input type="hidden" {...register("role")} value="admin" />
        ) : (
          <input type="hidden" {...register("role")} value="client" />
        )}

        <input
          type="hidden"
          {...register("companyId")}
          value={user.companyId}
        />
        <div className="my-3">
          <label htmlFor="user-name" className="form-label">
            First Name <span className="text-danger">*</span>
          </label>
          <input
            type="text"
            id="user-name"
            className={`form-control ${
              founderrors.firstName ? "is-invalid" : ""
            }`}
            placeholder="Enter Last Name"
            {...register("firstName")}
          />
          {founderrors.firstName && (
            <div className="invalid-feedback">
              {founderrors.firstName?.message}
            </div>
          )}
        </div>
      </div>
      <div className="col-md-6">
        <div className="my-3">
          <label htmlFor="user-name" className="form-label">
            Last Name <span className="text-danger">*</span>
          </label>
          <input
            type="text"
            id="user-name"
            className={`form-control ${
              founderrors.lastName ? "is-invalid" : ""
            }`}
            placeholder="Enter Last Name"
            {...register("lastName")}
          />
          {founderrors.lastName && (
            <div className="invalid-feedback">
              {founderrors.lastName?.message}
            </div>
          )}
        </div>
      </div>
      {/* <div className="col-md-6">
        <div className="mb-3">
          <label htmlFor="reference" className="form-label">
            Reference# <span className="text-danger">*</span>
          </label>
          <input
            type="text"
            id="reference"
            className={`form-control ${errors.reference ? "is-invalid" : ""}`}
            placeholder="AX100200"
            {...register("reference")}
          />
          <div className="invalid-feedback">{errors.reference?.message}</div>
        </div>
      </div> */}
      {/* <div className="col-md-6">
        <PhoneNumberInput
          label={"Enter Phone Number"}
          {...register("phone")}
          control={control}
          error={errors?.phone?.message}
        />
      </div> */}
      <div className="col-md-6">
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email Address <span className="text-danger">*</span>
          </label>
          <input
            type="email"
            id="email"
            className={`form-control ${founderrors.email ? "is-invalid" : ""}`}
            placeholder="Enter Your Email Address"
            {...register("email")}
          />
          {founderrors.email && (
            <div className="invalid-feedback">{founderrors.email?.message}</div>
          )}
        </div>
      </div>

      <div className="col-md-6">
        <div className="mb-3">
          <label htmlFor="phone" className="form-label">
            Phone <span className="text-danger">*</span>
          </label>
          <input
            id="phone"
            type="text"
            placeholder="Phone"
            className={`form-control ${
              founderrors.address ? "is-invalid" : ""
            }`}
            {...register("phone")}
          />
          {founderrors.phone && (
            <div className="invalid-feedback">{founderrors.phone.message}</div>
          )}
        </div>
      </div>

      {isAdd && (
        <div className="col-md-6">
          <div className="mb-3">
            <label htmlFor="user-name" className="form-label">
              Password <span className="text-danger">*</span>
            </label>
            <input
              type="password"
              id="password"
              className={`form-control ${
                founderrors.password ? "is-invalid" : ""
              }`}
              placeholder="Enter Password"
              {...register("password")}
            />
            {founderrors.password && (
              <div className="invalid-feedback">
                {founderrors.password?.message}
              </div>
            )}
          </div>
        </div>
      )}

      {isAdd && (
        <div className="col-md-6">
          <div className="mb-3">
            <label htmlFor="user-name" className="form-label">
              Confirm Password <span className="text-danger">*</span>
            </label>
            <input
              type="password"
              id="password"
              className={`form-control ${
                founderrors.confirmPassword ? "is-invalid" : ""
              }`}
              placeholder="Confirm Password"
              {...register("confirmPassword")}
            />
            {founderrors.confirmPassword && (
              <div className="invalid-feedback">
                {founderrors.confirmPassword?.message}
              </div>
            )}
          </div>
        </div>
      )}

      <div className="col-md-12">
        <div className="mb-3">
          <label htmlFor="address" className="form-label">
            Address <span className="text-danger">*</span>
          </label>
          <input
            id="address"
            type="text"
            placeholder="Enter Address"
            className={`form-control ${
              founderrors.address ? "is-invalid" : ""
            }`}
            {...register("address")}
          />
          {founderrors.address && (
            <div className="invalid-feedback">
              {founderrors.address.message}
            </div>
          )}
        </div>
      </div>
      <div className="col-md-12">
        {user.role == "super_admin" && (
          <Select
            label="Link with Company"
            name="companyId"
            isMulti={false}
            control={control}
            options={
              companiesList?.data?.map((x: any) => ({
                label: x.name,
                value: x.id,
              })) ?? []
            }
            isError={!!errors.companyId}
          />
        )}
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
            className={`form-control ${
              founderrors.zipCode ? "is-invalid" : ""
            }`}
            {...register("zipCode")}
          />
          {founderrors.zipCode && (
            <div className="invalid-feedback">
              {founderrors.zipCode.message}
            </div>
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
          className={`form-control ${founderrors.zipCode ? "is-invalid" : ""}`}
          {...register("state")}
        />
        {founderrors.state && (
          <div className="invalid-feedback">{founderrors.state.message}</div>
        )}
      </div>
      <div className="col-md-4">
        <label htmlFor="zipCode" className="form-label">
          City
        </label>

        <input
          id="zipCode"
          type="text"
          placeholder="city"
          className={`form-control ${founderrors.zipCode ? "is-invalid" : ""}`}
          {...register("city")}
        />
        {founderrors.city && (
          <div className="invalid-feedback">{founderrors.city.message}</div>
        )}
      </div>
      <div className="col-md-12">
        <div className="mb-3">
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
              {founderrors.description && (
                <div className="invalid-feedback">
                  {founderrors.description.message}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="col-md-12">
        <button type="submit" className="btn btn-secondary">
          {isSubmitLoading ? (
            <Spinner animation="border" />
          ) : (
            <>
              <i data-feather="send" className="me-2" /> Submit
            </>
          )}
        </button>
      </div>
    </form>
  );
};

export default UserForm;
