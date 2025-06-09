"use client";
import React, { useEffect } from "react";

import { UserData } from "@/types/user";
import { useParams, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import {
  useGetUserByIdQuery,
  useUpdateUserMutation,
} from "@/redux/services/users";
import UserForm from "./UserForm";

const EditUserForm: React.FC = () => {
  const { id } = useParams();
  const router = useRouter();

  const {
    data: user,
    isLoading,
    isFetching,
    isError,
    refetch: refetchUserById,
  } = useGetUserByIdQuery(id as string);

  useEffect(() => {
    refetchUserById();
  }, []);

  const [updateUser, { isLoading: isSubmitLoading }] = useUpdateUserMutation();

  const initialValues = {
    firstName: user?.data.firstName,
    lastName: user?.data.lastName,
    description: user?.data?.description,
    email: user?.data?.email,
    profileImageUrl: user?.data?.profileImageUrl,
    phone: user?.data?.phone,
    city: user?.data?.city,
    state: user?.data?.state,
    zipCode: user?.data?.zipCode,
    address: user?.data?.address,
    companyId: user?.data?.companyId,
    providerId: user?.data?.providerId,
    // programs: user?.data?.programs?.map((x: any) => x?.program?.id),
  };

  const submitHandler = async (data: UserData) => {
    console.log("submittedData==>", data);
    try {
      await updateUser({ id, payload: data }).unwrap();
      toast.success("User updated successfully");
      router.push("/dashboard/users");
    } catch (error: any) {
      console.log("err=>", error);
      toast.error(error?.data?.message || "Error creating user");
    }
  };

  if (
    isLoading
    //  || isFetching
  ) {
    // Show Loading component
    return <></>;
  }

  if (isError) {
    // Show error component
    return <></>;
  }

  return (
    <UserForm
      initialValues={initialValues}
      submitHandler={submitHandler}
      isSubmitLoading={isSubmitLoading}
    />
  );
};

export default EditUserForm;
