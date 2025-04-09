import React from "react";

function PlanForm() {
  return (
    <div className="card-body">
      <form action="" className="row">
        <div className="col-md-12 mb-2">
          <div className="form-group">
            <label htmlFor="#" className="form-label">
              Plan Type
            </label>

            <select className="form-select" id="exampleSelect">
            <option value="0" selected disabled>Please Select Plan Type</option>
              <option value={1}>Basic</option>
              <option value={2}>Standard</option>
              <option value={3}>Premium</option>
            </select>
          </div>
        </div>
        <div className="col-md-12 mb-2">
          <div className="form-group">
            <label htmlFor="#" className="form-label">
              Cost Per Month
            </label>
            <input type="number" className="form-control" name="" id="" />
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

export default PlanForm;
