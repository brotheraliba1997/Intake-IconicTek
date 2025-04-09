import PlanForm from '@/compoments/plan/PlanForm'
import EditPlanForm from '@/compoments/plan/EditPlanForm'
import Link from 'next/link'
import React from 'react'

function EditPlan() {
  return (
    <div className="content container-fluid">
      <div className="row justify-content-center">
        <div className="col-xl-8  col-12">
          <div className="card rounded-2">
            <div className="card-header py-3 bg-gradient">
              <div className="row">
                <div className="col">
                  <h4 className="card-title">Update Plan</h4>
                </div>
                <div className="col-auto">
                  <Link href="/dashboard/plan" className=" btn btn-dark btn-sm">
                    <i data-feather="plus" className="me-2" />
                    Plan Lists
                  </Link>
                </div>
              </div>
            </div>
           
            <EditPlanForm />
          </div>
        </div>
      </div>
    </div>
  )
}

export default EditPlan
