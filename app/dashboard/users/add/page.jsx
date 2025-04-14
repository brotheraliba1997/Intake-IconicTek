import React from "react";

import Link from "next/link";
import AddUserForm from "@/compoments/users/AddUserForm";

function AddUser() {
  return (
    <div className="content container-fluid">
      <div className="row justify-content-center">
        <div className="col-xl-12  col-12">
          <div className="card rounded-2 px-4 pt-2 pb-4 ">
            <div className="card-header py-3 bg-gradient">
              <div className="row">
                <div className="col">
                  <h4 className="card-title">Add User</h4>
                </div>
                <div className="col-auto">
                  <Link
                    href="/dashboard/users"
                    className=" btn btn-dark btn-sm"
                  >
                    <i data-feather="plus" className="me-2" />
                    User List
                  </Link>
                </div>
              </div>
            </div>
            <AddUserForm />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddUser;
