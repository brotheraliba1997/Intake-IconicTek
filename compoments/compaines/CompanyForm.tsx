import React from "react";

function CompanyForm() {
  return (
    <div className="card-body">
      <form action="" className="row">
        <div className="col-md-6 mb-2">
          <div className="form-group">
            <label htmlFor="#" className="form-label">
              Company Name
            </label>
            <input type="text" className="form-control" name="" id="" />
          </div>
        </div>
        <div className="col-md-6 mb-2">
          <div className="form-group">
            <label htmlFor="#" className="form-label">
              Client Name{" "}
            </label>
            <input type="text" className="form-control" name="" id="" />
          </div>
        </div>
        <div className="col-md-12 mb-2">
          <div className="form-group">
            <label className="form-label">Plan Type</label>
            <select className="form-select" id="exampleSelect">
              <option value="">Select one</option>
              <option value="1">Option One</option>
              <option value="2">Option Two</option>
              <option value="3">Option Three</option>
            </select>
          </div>
        </div>
        <div className="col-md-6 mb-2">
          <div className="form-group">
            <label htmlFor="#" className="form-label">
              Amount
            </label>
            <input type="number" className="form-control" name="" id="" />
          </div>
        </div>
        <div className="col-md-6 mb-2">
          <div className="form-group">
            <label htmlFor="#" className="form-label">
              Start date
            </label>
            <input type="date" className="form-control" name="" id="" />
          </div>
        </div>
        <div className="col-md-12 mb-2">
          <div className="form-group">
            <label htmlFor="#" className="form-label">
              Summary
            </label>
            <textarea
              className="form-control"
              rows={4}
              id=""
              defaultValue={""}
            />
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

export default CompanyForm;
