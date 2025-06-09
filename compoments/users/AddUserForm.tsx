"use client";
import React from "react";


import { UserData } from "@/types/user";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useCreateUserMutation } from "@/redux/services/users";
import UserForm from "./UserForm";

const AddUserForm: React.FC = () => {
  const router = useRouter();
  const [createUser, { isLoading }] = useCreateUserMutation();

  const submitHandler = async (data: UserData) => {
    console.log("submittedData==>", data);
    try {
      await createUser(data).unwrap();
      toast.success("User created successfully");
      router.push("/dashboard/users");
    } catch (error: any) {
      console.log("err=>", error);
      toast.error(error?.data?.message || "Error creating form");
    }
  };

  return <UserForm submitHandler={submitHandler} isSubmitLoading={isLoading} />;
};

export default AddUserForm;
