"use client";
import React from "react";

import { useParams } from "next/navigation";
import toast from "react-hot-toast";
import UserForm from "./UserForm";

import { useSession } from "next-auth/react";
import { useGetMyProfileQuery, useUpdateMyProfileMutation } from "@/redux/services/users";

const MyProfileForm: React.FC = () => {
  const { id } = useParams();

  const { data: sessionData, update: updateSession } = useSession();
  const { user }: any = sessionData;

  const {
    data: profile,
    isLoading,
    isFetching,
    isError,
    // refetch: refetchMyCompany,
  } = useGetMyProfileQuery({});

  const [updateMyProfile, { isLoading: isSubmitLoading }] =
    useUpdateMyProfileMutation();

  const initialValues: any = {
    firstName: profile?.data.firstName,
    lastName: profile?.data.lastName,
    description: profile?.data?.description,
    email: profile?.data?.email,
    phone: profile?.data?.phone,
    profileImageUrl: profile?.data?.profileImageUrl,
    city: profile?.data?.city,
    state: profile?.data?.state,
    zipCode: profile?.data?.zipCode,
    address: profile?.data?.address,
    doctorId: profile?.data?.doctorId,
  };

  const submitHandler = async (data: any) => {
    console.log("submittedData==>", data);
    try {
      await updateMyProfile({ id, payload: data }).unwrap();
      await updateSession({
        ...sessionData,
        user: { ...user, ...data },
      });
      toast.success("Profile updated successfully");
    } catch (error: any) {
      console.log("err=>", error);
      toast.error(error?.data?.message || "Error creating company");
    }
  };

  if (!profile && (isLoading || isFetching)) {
    return <></>;
  }

  if (isError) {
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

export default MyProfileForm;
