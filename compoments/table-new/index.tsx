"use client";
import { useGetMyProfileQuery } from "@/redux/services/users";
import React from "react";

// function DynamicTable() {
//   const {
//     data: profile,
//     isLoading,
//     isFetching,
//     isError,
//   } = useGetMyProfileQuery({});
//   const userProfile = profile?.data?.[0];
function DynamicTable() {
  const { data: profile, isLoading, isError } = useGetMyProfileQuery({});
  const userProfile = profile?.data?.[0];

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error loading profile</p>;
  return (
    <div className="row">
      <div className="col-md-12 col-sm-12">
        <div className="card card-table">
          <div className="card-header">
            <div className="row">
              <div className="col">
                <h5 className="card-title">Recently</h5>
              </div>
            </div>
          </div>
          <div className="card-body">
            <div className="table-responsive">
              <table className="table table-stripped table-hover datatable">
                <thead className="thead-light">
                  <tr>
                    <th>#</th>
                    {userProfile?.role === "super_admin" ? (
                      <th>Company Name</th>
                    ) : (
                      <th>Name</th>
                    )}

                    <th>Client Name</th>
                    <th>Date Joined</th>
                    <th>Plan Type</th>
                    <th>Phone</th>
                    <th>Email</th>
                    <th className="text-center">Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1234</td>
                    <td>IconicTek</td>
                    <td>John Doe</td>
                    <td>4/4/2025</td>
                    <td>Basic</td>
                    <td>123-456-7890</td>
                    <td>cms@iconictek.com</td>
                    <td className="text-center">
                      <div className="dropdown dropdown-action">
                        <a
                          href="#"
                          className="action-icon dropdown-toggle"
                          data-bs-toggle="dropdown"
                          aria-expanded="false"
                        >
                          <i className="fas fa-ellipsis-v" />
                        </a>
                        <div className="dropdown-menu dropdown-menu-right">
                          <a className="dropdown-item" href="#">
                            <i className="far fa-edit me-2" />
                            Edit
                          </a>
                          <a className="dropdown-item" href="#">
                            <i className="far fa-eye me-2" />
                            View
                          </a>
                          <a className="dropdown-item" href="#">
                            <i className="far fa-trash-alt me-2" />
                            Delete
                          </a>
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>1245</td>
                    <td>Webtek</td>
                    <td>John Doe</td>
                    <td>4/1/2025</td>
                    <td>Stannard</td>
                    <td>123-456-7890</td>
                    <td>sales@iconictek.com</td>
                    <td className="text-center">
                      <div className="dropdown dropdown-action">
                        <a
                          href="#"
                          className="action-icon dropdown-toggle"
                          data-bs-toggle="dropdown"
                          aria-expanded="false"
                        >
                          <i className="fas fa-ellipsis-v" />
                        </a>
                        <div className="dropdown-menu dropdown-menu-right">
                          <a className="dropdown-item" href="#">
                            <i className="far fa-edit me-2" />
                            Edit
                          </a>
                          <a className="dropdown-item" href="#">
                            <i className="far fa-eye me-2" />
                            View
                          </a>
                          <a className="dropdown-item" href="#">
                            <i className="far fa-trash-alt me-2" />
                            Delete
                          </a>
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>4568</td>
                    <td>ABC</td>
                    <td>Irfan</td>
                    <td>3/3/2025</td>
                    <td>Basic</td>
                    <td>123-456-7890</td>
                    <td>cms@iconictek.com</td>
                    <td className="text-center">
                      <div className="dropdown dropdown-action">
                        <a
                          href="#"
                          className="action-icon dropdown-toggle"
                          data-bs-toggle="dropdown"
                          aria-expanded="false"
                        >
                          <i className="fas fa-ellipsis-v" />
                        </a>
                        <div className="dropdown-menu dropdown-menu-right">
                          <a className="dropdown-item" href="#">
                            <i className="far fa-edit me-2" />
                            Edit
                          </a>
                          <a className="dropdown-item" href="#">
                            <i className="far fa-eye me-2" />
                            View
                          </a>
                          <a className="dropdown-item" href="#">
                            <i className="far fa-trash-alt me-2" />
                            Delete
                          </a>
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>1234</td>
                    <td>xyz</td>
                    <td>Misbah</td>
                    <td>3/3/2025</td>
                    <td>Standard</td>
                    <td>123-456-7890</td>
                    <td>sale@iconictek.com</td>
                    <td className="text-center">
                      <div className="dropdown dropdown-action">
                        <a
                          href="#"
                          className="action-icon dropdown-toggle"
                          data-bs-toggle="dropdown"
                          aria-expanded="false"
                        >
                          <i className="fas fa-ellipsis-v" />
                        </a>
                        <div className="dropdown-menu dropdown-menu-right">
                          <a className="dropdown-item" href="#">
                            <i className="far fa-edit me-2" />
                            Edit
                          </a>
                          <a className="dropdown-item" href="#">
                            <i className="far fa-eye me-2" />
                            View
                          </a>
                          <a className="dropdown-item" href="#">
                            <i className="far fa-trash-alt me-2" />
                            Delete
                          </a>
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>2345</td>
                    <td>WBC</td>
                    <td>Ahmed</td>
                    <td>3/7/2025</td>
                    <td>Basic</td>
                    <td>123-456-7890</td>
                    <td>sms@iconictek.com</td>
                    <td className="text-center">
                      <div className="dropdown dropdown-action">
                        <a
                          href="#"
                          className="action-icon dropdown-toggle"
                          data-bs-toggle="dropdown"
                          aria-expanded="false"
                        >
                          <i className="fas fa-ellipsis-v" />
                        </a>
                        <div className="dropdown-menu dropdown-menu-right">
                          <a className="dropdown-item" href="#">
                            <i className="far fa-edit me-2" />
                            Edit
                          </a>
                          <a className="dropdown-item" href="#">
                            <i className="far fa-eye me-2" />
                            View
                          </a>
                          <a className="dropdown-item" href="#">
                            <i className="far fa-trash-alt me-2" />
                            Delete
                          </a>
                        </div>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DynamicTable;
