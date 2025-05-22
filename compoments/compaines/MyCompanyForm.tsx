"use client";
import React, { useEffect } from "react";
import {
  useGetMyCompanyQuery,
  useUpdateMyCompanyMutation,
} from "@/redux/services/companies";

import { CompanyData } from "@/types/company";
import { useParams, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useSession } from "next-auth/react";
import CompanyForm from "./CompanyForm";
import DotsLoader from "../common/loaders/dotsLoader";

const MyCompanyForm: React.FC = () => {
  const { id } = useParams();
  const router = useRouter();

  const {
    data: company,
    isLoading,
    isFetching,
    isError,
    // refetch: refetchMyCompany,
  } = useGetMyCompanyQuery({});

  console.log(company, "company");
  // useEffect(() => {
  //   refetchCompanyById();
  // }, []);

  const [updateMyCompany, { isLoading: isSubmitLoading }] =
    useUpdateMyCompanyMutation();

  const initialValues = {
    name: company?.data.name,
    description: company?.data?.description,
    email: company?.data?.email,
    phone: company?.data?.phone,
    city: company?.data?.city,
    state: company?.data?.state,
    zipCode: company?.data?.zipCode,
    address: company?.data?.address,
    timezone: company?.data?.timezone ?? "",
  };

  const submitHandler = async (data: CompanyData) => {
    console.log("submittedData==>", data);
    try {
      await updateMyCompany({ id, payload: data }).unwrap();
      toast.success("User updated successfully");
    } catch (error: any) {
      console.log("err=>", error);
      toast.error(error?.data?.message || "Error creating company");
    }
  };

  if (!company && (isLoading || isFetching)) {
    return <DotsLoader dark={false} size={60} height="60vh" />;
  }

  if (isError) {
    return <></>;
  }

  return (
    <CompanyForm
      initialValues={initialValues}
      submitHandler={submitHandler}
      isSubmitLoading={isSubmitLoading}
    />
  );
};

export default MyCompanyForm;
