"use client";
import Table from "@/compoments/table";
import DynamicTable from "@/compoments/table-new";
import TableRowAction from "@/compoments/table/tableRowAction";
import { useGetCompaniesQuery } from "@/redux/services/companies";
import React from "react";

function CompaniesTable() {
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
        <div className="text-capitalize"> {e?.name} </div>
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
