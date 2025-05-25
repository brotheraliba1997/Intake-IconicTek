"use client";
import React, { useEffect } from "react";
import {
  useGetCompanyByIdQuery,
  useUpdateCompanyMutation,
} from "@/redux/services/companies";

import { CompanyData } from "@/types/company";
import { useParams, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import CompanyForm from "./CompanyForm";

const EditCompanyForm: React.FC = () => {
  const { id } = useParams();
  const router = useRouter();

  const {
    data: company,
    isLoading,
    isFetching,
    isError,
    refetch: refetchCompanyById,
  } = useGetCompanyByIdQuery(id as string);

  useEffect(() => {
    refetchCompanyById();
  }, []);

  console.log(company, "company");

  const [updateCompany, { isLoading: isSubmitLoading }] =
    useUpdateCompanyMutation();

  const initialValues = {
    name: company?.data.name,
    description: company?.data?.description,
    email: company?.data?.email,
    phone: company?.data?.phone,
    city: company?.data?.city,
    state: company?.data?.state,
    zipCode: company?.data?.zipCode,
    address: company?.data?.address,
    profilePic: company?.data?.profilePic,
  };

  const submitHandler = async (data: CompanyData) => {
    console.log("submittedData==>", data);
    try {
      await updateCompany({ id, payload: data }).unwrap();
      toast.success("Company updated successfully");
      router.push("/dashboard/companies");
    } catch (error: any) {
      console.log("err=>", error);
      toast.error(error?.data?.message || "Error creating company");
    }
  };

  if (isLoading || isFetching) {
    // Show Loading component
    return <></>;
  }

  if (isError) {
    // Show error component
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

export default EditCompanyForm;
