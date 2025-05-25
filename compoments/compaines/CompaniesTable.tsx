"use client";
import Table from "@/compoments/table";
import DynamicTable from "@/compoments/table-new";
import TableRowAction from "@/compoments/table/tableRowAction";
import { useGetCompaniesQuery } from "@/redux/services/companies";
import Image from "next/image";
import React from "react";
import cameraIcon from "@/public/img/camera.jpg"; // or use a public path like "/camera.png"

function CompaniesTable() {
  const defaultimg = "https://cdn-icons-png.flaticon.com/512/747/747376.png"; // camera icon

  const {
    data: companiesList,
    isLoading,
    isFetching,
  } = useGetCompaniesQuery({
    page: 1,
    limit: 100,
  });

  const columns = [
    {
      displayName: "Company Name",
      displayField: (e: any) => (
        // <div className="text-capitalize"> {e?.name} </div>
        <div className="text-capitalize">
          <span className="user-Image mr-2">
            <Image
              // src={UserProfile}
              src={e.profilePic || cameraIcon}
              alt=""
              width={50}
              height={50}
              style={{
                // maxWidth: "50px",
                // height: "auto",
                width: "50px",
                height: "50px",
                borderRadius: "50%",
                overflow: "hidden",
                border: "1px solid #d3d3d3", // Light grey border
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "#f9f9f9",
              }}
            />
            <span className="status online"></span>
          </span>
          <span className="px-2">{e?.name}</span>
        </div>
      ),
      searchable: true,
    },

    {
      displayName: "Contact",
      displayField: (e: any) => (
        <div className="">
          {e?.email && (
            <div>
              <b>Email:</b> {e?.email}
            </div>
          )}
          {e?.phone && (
            <div>
              <b>Phone:</b> {e?.phone}
            </div>
          )}
        </div>
      ),
      searchable: true,
    },

    {
      displayName: "Location",
      displayField: (e: any) => (
        <div className="text-capitalize">
          {e?.city && (
            <div>
              <b>City:</b> {e?.city}
            </div>
          )}
          {e?.state && (
            <div>
              <b>State:</b> {e?.state}
            </div>
          )}
          {e?.zipCode && (
            <div>
              <b>ZipCode:</b> {e?.zipCode}
            </div>
          )}
        </div>
      ),
      searchable: true,
    },

    {
      displayName: "Action",
      key: "",

      displayField: (e: any) => (
        <TableRowAction
          id={e.id}
          editUrl={`/dashboard/companies/${e.id}/edit`}
          // viewUrl={`/dashboard/services/${e.id}`}
          deleteModalView="DELETE_COMPANY"
        />
      ),
      searchAble: true,
    },
  ];

  return (
    <Table
      title={"Programs"}
      columns={columns}
      dataSource={companiesList?.data}
      isLoading={isLoading || isFetching}
      hidePagination={true}
    />
  );
}

export default CompaniesTable;
