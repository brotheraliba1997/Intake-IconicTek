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
              <option value="0" selected disabled>
                Please Select Plan Type
              </option>
              <option value={1}>Monthly</option>
              <option value={2}>Annually</option>
            </select>
          </div>
        </div>
        <div className="col-md-12 mb-2">
          <div className="form-group">
            <label htmlFor="#" className="form-label">
              Cost Per Month
            </label>
            <select className="form-select" aria-label="Default select example">
              <option selected>Open this select menu</option>
              <option value="1">$ 10</option>
              <option value="2">$ 120</option>
            </select>
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
