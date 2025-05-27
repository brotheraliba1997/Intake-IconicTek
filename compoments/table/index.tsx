"use client";
import DotsLoader from "@/compoments/common/loaders/dotsLoader";
import TableHead from "./tableHead";
import TablePagination from "./tablePagination";
import TableRow from "./tableRow";
// import DataNotFound from "../../assets/images/table-data-not-found.jpg";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

function Table({
  title,
  columns,
  dataSource,
  onRowClick,
  isLoading,
  totalPages = 1,
  totalEntries = 10,
  page = 1,
  setPage,
  pageSize = 10,
  setPageSize,
  hidePagination = false,
}: {
  title: string;
  columns: any[];
  dataSource: any[];
  isLoading: boolean;
  totalPages?: number;
  totalEntries?: number;
  page?: number;
  pageSize?: number;
  setPage?: Dispatch<SetStateAction<number>>;
  setPageSize?: Dispatch<SetStateAction<number>>;
  onRowClick?: () => void;
  hidePagination: boolean;
}) {
  const indexOfLastItem = page * pageSize;
  const indexOfFirstItem = indexOfLastItem - pageSize;

  const handlePageChange = (pageNumber: number) => {
    if (typeof setPage !== "undefined") setPage(pageNumber);
  };

  return (
    <>
      {/* {title && (
            <div className="card-header ">
              <div className="row">
                <div className="col">
                  <h4
                    className="bg-gradient px-4 py-3 text-white rounded"
                    style={{
                      fontSize: "1.25rem",
                      color: "rgb(27, 37, 89)",
                      fontWeight: "bold",
                      margin: "0px",
                    }}
                  >
                    {title}
                  </h4>
                  <h5 className="card-title text-white">{title}</h5>
                </div>
              </div>
            </div>
          )} */}
      <div className="">
        {" "}
        {/* <TableHead
              pageSize={pageSize}
              setPageSize={setPageSize}
              setPage={setPage}
            /> */}
        {/* <h2>{title}</h2> */}
        {isLoading &&
        dataSource &&
        Array.isArray(dataSource) &&
        dataSource?.length == 0 ? (
          <DotsLoader dark={false} size={40} height="40vh" />
        ) : // <div className=" mx-auto d-flex align-items-center justify-content-center">
        //   <img
        //     width="40%"
        //     className="mx-auto"
        //     src="https://hackernoon.com/images/0*4Gzjgh9Y7Gu8KEtZ.gif"
        //     alt="Loading..."
        //   />
        // </div>
        dataSource && Array.isArray(dataSource) && dataSource?.length == 0 ? (
          <div className="d-flex flex-column align-items-center justify-content-center w-100">
            {/* <img
              src={DataNotFound}
              width="200"
              className="mx-auto"
              alt="No Data Found :("
            /> */}
            <p>Data not found</p>
          </div>
        ) : (
          <div className="table-responsive my-3 position-relative">
            {isLoading && (
              <div className="table-loader-bg">
                <DotsLoader dark={false} size={60} height="40vh" />
              </div>
            )}
            <div
              id="dataTableBuilder_processing"
              className="dataTables_processing"
              style={{ display: "none" }}
            >
              Processing...
            </div>
            <table
              className="table table-stripped table-hover"
              id="dataTableBuilder"
              role="grid"
              aria-describedby="dataTableBuilder_info"
              // style={{ width: 1171 }}
            >
              <thead className="thead-light">
                <tr role="row">
                  <th
                    title="No"
                    // width={60}
                    // className="sorting"
                    rowSpan={1}
                    colSpan={1}
                    // style={{ width: 60 }}
                    aria-label="No"
                  >
                    #
                  </th>
                  {columns && Array.isArray(columns) && columns.length > 0
                    ? columns.map((x, i) => (
                        <th
                          title="No"
                          // width={60}
                          // className="sorting"
                          rowSpan={1}
                          colSpan={1}
                          // style={{ width: 60 }}
                          aria-label="No"
                          key={i}
                        >
                          {x.displayName}
                        </th>
                      ))
                    : null}
                </tr>
              </thead>
              <tbody>
                {dataSource &&
                Array.isArray(dataSource) &&
                dataSource.length > 0
                  ? dataSource.map((rowData, i) => (
                      <TableRow
                        srNo={indexOfFirstItem + i + 1}
                        key={i}
                        rowData={rowData}
                        columns={columns}
                      />
                    ))
                  : null}
              </tbody>
            </table>

            {/* <TablePagination                                   
                  page={page}
                  pageSize={pageSize}
                  totalItems={dataSource?.length}
                  onPageChange={handlePageChange}
                  totalPages={totalPages}
                  totalEntries={totalEntries}
                /> */}
          </div>
        )}
      </div>
      {!hidePagination && (
        <div className="card-footer bg-secondary text-white">
          <TablePagination
            page={page}
            pageSize={pageSize}
            onPageChange={handlePageChange}
            totalPages={totalPages}
            totalEntries={totalEntries}
          />
        </div>
      )}
    </>
  );
}
export default Table;
