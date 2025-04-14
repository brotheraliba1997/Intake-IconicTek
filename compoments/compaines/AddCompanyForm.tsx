"use client";
import React from "react";

import { useCreateCompanyMutation } from "@/redux/services/companies";
import { CompanyData } from "@/types/company";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import CompanyForm from "./CompanyForm";

const AddCompanyForm: React.FC = () => {
  const router = useRouter();
  const [createCompany, { isLoading }] = useCreateCompanyMutation();

  const submitHandler = async (data: CompanyData) => {
    console.log("submittedData==>", data);
    try {
      await createCompany(data).unwrap();
      toast.success("Company created successfully");
      router.push("/dashboard/companies");
    } catch (error: any) {
      console.log("err=>", error);
      toast.error(error?.data?.message || "Error creating form");
    }
  };

  return (

    <>
    <CompanyForm submitHandler={submitHandler} isSubmitLoading={isLoading} />
    
    </>
  );
};

export default AddCompanyForm;
