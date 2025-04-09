

import AddPlanForm from '@/compoments/plan/AddPlanForm'
import Link from 'next/link'
import React from 'react'

function AddPlan() {
  return (
    <div className="content container-fluid">
      <div className="row justify-content-center">
        <div className="col-xl-8  col-12">
          <div className="card rounded-2">
            <div className="card-header py-3 bg-gradient">
              <div className="row">
                <div className="col">
                  <h4 className="card-title">Add Plan</h4>
                </div>
                <div className="col-auto">
                  <Link href="/dashboard/plan" className=" btn btn-dark btn-sm">
                    <i data-feather="plus" className="me-2" />
                    Plan List
                  </Link>
                </div>
              </div>
            </div>
           
            <AddPlanForm />
          </div>
        </div>
      </div>
    </div>
  )
}

export default AddPlan
