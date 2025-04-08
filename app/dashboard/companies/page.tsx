"use client";
import CompaniesTable from "@/compoments/compaines/CompaniesTable";
import Table from "@/compoments/table";
import DynamicTable from "@/compoments/table-new";
import TableRowAction from "@/compoments/table/tableRowAction";
import Link from "next/link";
import React from "react";

function Companies() {
  return (
    <div className="content container-fluid">
      <div className="row mb-3 align-items-center">
        <div className="col-auto">
          <div className="d-flex align-items-center">
            <div>
              <p>Show</p>
            </div>
            <div className=" mx-2">
              <select className="form-select form-select-sm" id="">
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={30}>30</option>
                <option value={40}>40</option>
                <option value={50}>50</option>
              </select>
            </div>
            <div>
              <p>Entries</p>
            </div>
          </div>
        </div>
        <div className="col">
          <div className="row">
            <div className="col-lg-3 col-md-12">
              <div className="input-group  input-group-sm">
                <input
                  type="text"
                  className="form-control form-control-sm"
                  placeholder="Search"
                />
                <span
                  className="input-group-text input-group-sm"
                  id="basic-addon1"
                >
                  {/* <CiSearch size={20} /> */}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="col-auto">
          <button
            className="btn btn-secondary btn-sm rounded-1"
            style={{ marginRight: "10px" }}
          >
            {/* <LuDownload size={20} /> */}
          </button>
          {/* {isAdmin && ( */}
          <Link
            href="/dashboard/devices/add"
            className=" btn btn-primary btn-sm"
          >
            {/* <IoIosAddCircleOutline className="me-2 mb-1" size={20} /> */}
            Add Device
          </Link>
          {/* )} */}
        </div>
        <CompaniesTable />
      </div>
    </div>
  );
}

export default Companies;
