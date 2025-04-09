"use Client";

import PlanTable from "@/compoments/plan/PlanTable";
import Table from "@/compoments/table";
import DynamicTable from "@/compoments/table-new";
import TableRowAction from "@/compoments/table/tableRowAction";
import Link from "next/link";
import React from "react";

function PlanPage() {
  return (
    <div className="card">
      <div className="row mb-3 align-items-center">
        <div
          className="row px-4 pt-4 pb-2"
          style={{ borderBottom: "1px solid #F0F1F5" }}
        >
          <div className="col">
            <h4 className="card-title">Plan List</h4>
          </div>
          <div className="col-auto">
            <Link
              href="/dashboard/plan/add"
              className=" btn btn-dark btn-sm"
            >
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
              Add Plan
            </Link>
          </div>
        </div>
      </div>

      <div className="row mt-4 px-4">
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
              <i className="fas fa-search position-absolute top-50 translate-middle-y ms-2 text-muted" />
              <input
                type="search"
                className="form-control form-control-sm ps-5"
                placeholder="Search"
                aria-controls="DataTables_Table_0"
              />
            </div>
          </div>
        </div>
      </div>

      <PlanTable />
    </div>
  );
}

export default PlanPage;
