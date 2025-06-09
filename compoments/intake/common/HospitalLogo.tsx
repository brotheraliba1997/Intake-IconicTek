"use client";
import { useGetMyCompanyQuery } from "@/redux/services/companies";
import Image from "next/image";
import React from "react";

type Props = {};

const HospitalLogo = (props: Props) => {
  const {
    data: company,
    isLoading,
    isFetching,
    isError,
    // refetch: refetchMyCompany,
  } = useGetMyCompanyQuery({});

  console.log(company, "company");
  return (
    <div
      className="d-flex justify-content-center"
      style={{ maxWidth: "300px", margin: "5px auto 20px" }}
    >
      <Image
        src={company?.data ? company?.data?.profilePic : "/img/hsLogo.png"}
        width={100}
        height={80}
        alt="name of hospital"
        style={{ objectFit: "contain" }}
      />
    </div>
  );
};

export default HospitalLogo;
