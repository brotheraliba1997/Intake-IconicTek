"use client";
import Table from "@/compoments/table";
import DynamicTable from "@/compoments/table-new";
import TableRowAction from "@/compoments/table/tableRowAction";
import React from "react";

function PlanTable() {
  const programsList = {
    data: [
      {
        id: 1,
        name: "Ali Khan",
        email: "ali.khan@example.com",
        age: 28,
        country: "Pakistan",
      },
      {
        id: 2,
        name: "Sara Ahmed",
        email: "sara.ahmed@example.com",
        age: 25,
        country: "UAE",
      },
      {
        id: 3,
        name: "John Smith",
        email: "john.smith@example.com",
        age: 32,
        country: "USA",
      },
      {
        id: 4,
        name: "Mehreen Fatima",
        email: "mehreen.fatima@example.com",
        age: 30,
        country: "UK",
      },
    ],
  };

  const columns = [
    {
      displayName: "Program Name",
      displayField: (e: any) => (
        <>
          <div className="text-capitalize"> {e?.name} </div>
        </>
      ),
      searchable: true,
    },
    {
      displayName: "Description",
      displayField: (e: any) => (
        <>
          <div className="text-capitalize"> {e?.email} </div>
        </>
      ),
      searchable: true,
    },

    {
      displayName: "Description",
      displayField: (e: any) => (
        <>
          <div className="text-capitalize"> {e?.age} </div>
        </>
      ),
      searchable: true,
    },

    {
      displayName: "Description",
      displayField: (e: any) => (
        <>
          <div className="text-capitalize"> {e?.country} </div>
        </>
      ),
      searchable: true,
    },
    {
      displayName: "Providers",
      displayField: (e: any) => (
        <>
          <div className="text-capitalize"> - </div>
        </>
      ),
      searchable: true,
    },
    {
      displayName: "Action",
      key: "",

      displayField: (e: any) => (
        <TableRowAction
          id={e.id}
          editUrl={`/dashboard/plan/${e.id}/edit`}
         
          deleteModalView="DELETE_PROGRAM"
        />
      ),
      searchAble: true,
    },
  ];

  const isLoading = false;

  return (
   
     
        <Table
          title={"Programs"}
          columns={columns}
          dataSource={programsList?.data}
          isLoading={isLoading}
          hidePagination={true}
        />
    
  );
}

export default PlanTable;
