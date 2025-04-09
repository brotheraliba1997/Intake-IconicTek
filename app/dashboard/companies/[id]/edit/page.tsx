import Link from "next/link";
import React from "react";
import CompanyForm from "@/compoments/compaines/CompanyForm";

function EditCompanies() {
  return (
    <div className="content container-fluid">
      <div className="row justify-content-center">
        <div className="col-xl-8  col-12">
          <div className="card rounded-2">
            <div className="card-header py-3 bg-gradient">
              <div className="row">
                <div className="col">
                  <h4 className="card-title">Update Companies</h4>
                </div>
                <div className="col-auto">
                  <Link href="/dashboard/companies" className=" btn btn-dark btn-sm">
                    <i data-feather="plus" className="me-2" />
                    Companies List
                  </Link>
                </div>
              </div>
            </div>
            <CompanyForm />
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditCompanies;
