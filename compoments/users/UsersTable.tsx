"use client";
import React from "react";



import Image from "next/image";
import UserProfile from "@/public/img/profiles/avatar-01.jpg";
import { useGetUsersQuery } from "@/redux/services/users";
import Table from "@/compoments/table";
import TableRowAction from "../table/tableRowAction";

function UsersTable() {
  const {
    data: usersList,
    isLoading,
    isFetching,
  } = useGetUsersQuery({
    role: "admin",
    page: 1,
    limit: 100,
  });

  console.log(usersList, "usersList")

  const columns = [
    {
      displayName: "User Name",
      displayField: (e: any) => (
        <div className="text-capitalize">
          <span className="user-Image mr-2">
            <Image
              src={UserProfile}
              alt=""
              width={50}
              height={50}
              style={{
                maxWidth: "50px",
                height: "auto",
                objectFit: "contain",
              }}
            />
            <span className="status online"></span>
          </span>
          <span className="px-2">
            {e?.firstName} {e?.lastName}
          </span>
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
      displayName: "Company",
      displayField: (e: any) => (
        <div className="text-capitalize">
          <div>{e?.company?.name ?? "-"}</div>
        </div>
      ),
      searchable: true,
    },

    // {
    //   displayName: "Programs",
    //   displayField: (e: any) => (
    //     <ScrollContianer>
    //       {e?.programs?.map((x: any, index: number) => (
    //         <Button key={index} className="btn-primary p-1 rounded-lg">
    //           {x?.program?.name}
    //         </Button>
    //       ))}
    //     </ScrollContianer>
    //   ),
    //   searchable: true,
    // },

    // {
    //   displayName: "Description",
    //   displayField: (e: any) => (
    //     <div className="text-capitalize"> {e?.description} </div>
    //   ),
    //   searchable: true,
    // },

    {
      displayName: "Action",
      key: "",

      displayField: (e: any) => (
        <TableRowAction
          id={e.id}
          editUrl={`/dashboard/users/${e.id}/edit`}
          // viewUrl={`/dashboard/services/${e.id}`}
          deleteModalView="DELETE_USER"
        />
      ),
      searchAble: true,
    },
  ];

  return (
   
        <Table
          title={"Users"}
          columns={columns}
          dataSource={usersList?.data}
          isLoading={isLoading || isFetching}
          hidePagination={true}
        />
     
  );
}

export default UsersTable;
