import AddClientForm from '@/compoments/client/AddClientForm'
import Link from 'next/link'
import React from 'react'

function AddClient() {
  return (
    <div className="content container-fluid">
      <div className="row justify-content-center">
        <div className="col-xl-8  col-12">
          <div className="card rounded-2">
            <div className="card-header py-3 bg-gradient">
              <div className="row">
                <div className="col">
                  <h4 className="card-title">Add Client</h4>
                </div>
                <div className="col-auto">
                  <Link href="/dashboard/client" className=" btn btn-dark btn-sm">
                    <i data-feather="plus" className="me-2" />
                    Client List
                  </Link>
                </div>
              </div>
            </div>
           
            <AddClientForm />
          </div>
        </div>
      </div>
    </div>
  )
}

export default AddClient
