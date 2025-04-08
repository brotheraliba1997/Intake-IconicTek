import Link from 'next/link'
import React from 'react'
import Companies from '../page'

function AddCompanies() {
  return (
    <div className="card">
    <div className="card-header py-2 bg-gradient">
      <div className="row">
        <div className="col">
          <h4 className="card-title text-white">Add Devices</h4>
        </div>
        <div className="col-auto">
          <Link href="/dashboard/companies" className=" btn btn-white btn-sm">
            <i data-feather="list" className="me-2" />
            Devices List
          </Link>
        </div>
      </div>
    </div>
    <div className="card-body p-3">
      {/* <Companies /> */}
    </div>
  </div>
  )
}

export default AddCompanies
