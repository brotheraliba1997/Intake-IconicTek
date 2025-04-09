import React from "react";

function ClientForm() {
  return (
    <div className="card-body">
      <form action="" className="row">
        <div className="col-md-12 mb-2">
          <div className="form-group">
            <label htmlFor="#" className="form-label">
              Client Full Name
            </label>
            <input type="text" className="form-control" name="" id="" />
          </div>
        </div>
        <div className="col-md-6 mb-2">
          <div className="form-group">
            <label htmlFor="#" className="form-label">
              Phone Number
            </label>
            <input type="tel" className="form-control" name="" id="" />
          </div>
        </div>
        <div className="col-md-6 mb-2">
          <div className="form-group">
            <label htmlFor="#" className="form-label">
              Email
            </label>
            <input type="email" className="form-control" name="" id="" />
          </div>
        </div>
        <div className="col-md-12 mb-2">
          <div className="form-group">
            <label htmlFor="#" className="form-label">
              Address
            </label>
            <input type="email" className="form-control" name="" id="" />
          </div>
        </div>
        <div className="col-md-4 mb-2">
          <div className="form-group">
            <label htmlFor="#" className="form-label">
              City
            </label>
            <input type="text" className="form-control" name="" id="" />
          </div>
        </div>
        <div className="col-md-4 mb-2">
          <div className="form-group">
            <label htmlFor="#" className="form-label">
              State
            </label>
            <input type="text" className="form-control" name="" id="" />
          </div>
        </div>
        <div className="col-md-4 mb-2">
          <div className="form-group">
            <label htmlFor="#" className="form-label">
              Zip Code
            </label>
            <input type="text" className="form-control" name="" id="" />
          </div>
        </div>
        <div className="col-md-12">
          <div className="text-end border-top pt-3">
            <button type="submit" className="btn btn-secondary">
              <i data-feather="send" className="me-2" /> Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default ClientForm;
