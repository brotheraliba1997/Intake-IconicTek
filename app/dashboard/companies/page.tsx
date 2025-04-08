"use client";
import CompaniesTable from "@/compoments/compaines/CompaniesTable";
import Table from "@/compoments/table";
import DynamicTable from "@/compoments/table-new";
import TableRowAction from "@/compoments/table/tableRowAction";
import Link from "next/link";
import React from "react";

function Companies() {
  return (
    <div className="card">
        <div className="row mb-3 align-items-center">
            <div className="row px-4 pt-4 pb-2" style={{borderBottom: "1px solid #F0F1F5"}}>
              <div className="col">
                <h4 className="card-title">Companies List</h4>
              </div>
              <div className="col-auto">
                <a href="add-Companie.html" className=" btn btn-dark btn-sm">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={24}
                    height={24}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="feather feather-plus me-2"
                  >
                    <line x1={12} y1={5} x2={12} y2={19} />
                    <line x1={5} y1={12} x2={19} y2={12} />
                  </svg>
                  <Link className=" text-white" href="/dashboard/companies/add">
                    Add Companies
                  </Link>
                </a>
              </div>
            </div>
          </div>

          {/* <h3>sss</h3>

          <div className="col-auto">
            <button
              className="btn btn-secondary btn-sm rounded-1"
              style={{ marginRight: "10px" }}
            >
              <LuDownload size={20} />
            </button>
            {isAdmin && (
            <Link
              href="/dashboard/devices/add"
              className=" btn btn-primary btn-sm"
            >
              <IoIosAddCircleOutline className="me-2 mb-1" size={20} />
              Add Device
            </Link>
             )} 
          </div> */}
          <div className="row mt-4 px-4" >
            <div className="col-sm-12 col-md-4 ">
              <div className="dataTables_length" id="DataTables_Table_0_length">
                <div className="d-flex gap-2 align-items-center">
                  <div>Show</div>
                  <div>
                    <select
                      name="DataTables_Table_0_length"
                      aria-controls="DataTables_Table_0"
                      className="custom-select custom-select-sm form-control form-control-sm"
                    >
                      <option value={10}>10</option>
                      <option value={25}>25</option>
                      <option value={50}>50</option>
                      <option value={100}>100</option>
                    </select>
                  </div>
                  <div>entries</div>
                </div>

                {/* 
                <label>
                  Show{" "}
                  <select
                    name="DataTables_Table_0_length"
                    aria-controls="DataTables_Table_0"
                    className="custom-select custom-select-sm form-control form-control-sm"
                  >
                    <option value={10}>10</option>
                    <option value={25}>25</option>
                    <option value={50}>50</option>
                    <option value={100}>100</option>
                  </select>{" "}
                  entries
                </label> */}
              </div>
            </div>
            <div className="col-sm-12 col-md-4 "></div>
            <div className="col-sm-12 col-md-4">
              <div
                id="DataTables_Table_0_filter"
                className="dataTables_filter"
                style={{ display: "flex", justifyContent: "end" }}
              >
                <div className="position-relative w-50 ">
                  {/* <i className="fas fa-search position-absolute top-50 start-0 translate-middle-y ms-2 text-muted" /> */}
                  <i className="fas fa-search position-absolute top-50 translate-middle-y ms-2 text-muted" />
                  <input
                    type="search"
                    className="form-control form-control-sm ps-5"
                    placeholder="Search"
                    aria-controls="DataTables_Table_0"
                  />
                </div>

                {/* <div className="d-flex gap-2 align-items-center  ">
                  <div>
                    <i className="fas fa-search" />
                  </div>
                  <div>
                    <input
                      type="search"
                      className="form-control form-control-sm"
                      placeholder="Search"
                      aria-controls="DataTables_Table_0"
                    />
                  </div>
                </div> */}

                {/* <label>
                  <i className="fas fa-search" />
                  <input
                    type="search"
                    className="form-control form-control-sm"
                    placeholder="Search"
                    aria-controls="DataTables_Table_0"
                  />
                </label> */}
              </div>
            </div>
          </div>

          <CompaniesTable />
        </div>
    
 
  );
}

export default Companies;
