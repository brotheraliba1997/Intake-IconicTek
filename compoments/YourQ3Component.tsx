import React from "react";
import { IoMdSettings } from "react-icons/io";

function YourQ3Component({ setModalOpen }: any) {
  return (
    <div className=" bg-white " style={{ padding: 40 }}>
      <div onClick={() => setModalOpen(false)}> X </div>
      <div className="container-fulid">
        <div className="d-flex justify-content-between">
          <h4>Question Type</h4>
          <div className="border d-flex align-items-center gap-2 py-2 px-4">
            {" "}
            <IoMdSettings /> <p className="m-0 p-0">Question Options </p>{" "}
          </div>
        </div>
        <div className="mb-3 mt-3">
          <select className="form-select w-100">
            <option>Mixed Controls</option>
          </select>
        </div>
        <h6>Block Instructions (optional)</h6>
        <textarea
          className="form-control mb-4"
          placeholder="Client Information"
          defaultValue={""}
        />
        <div className="row g-3">
          <div className="col-md-6">
            <label className="form-label">First Name:</label>
            <input
              type="text"
              className="form-control"
              placeholder="Space for answer"
            />
          </div>
         
          <div className="col-md-6">
            <label className="form-label">Last Name:</label>
            <input
              type="text"
              className="form-control"
              placeholder="Space for answer"
            />
          </div>
          <div className="col-md-6">
            <label className="form-label">Preferred Pronouns</label>
            <textarea
              className="form-control"
              rows={2}
              placeholder="Enter 1 option per line"
              defaultValue={""}
            />
          </div>
          <div className="col-md-6">
            <label className="form-label">Date of Birth:</label>
            <input type="date" className="form-control" />
          </div>
          <div className="col-md-6">
            <label className="form-label">Gender</label>
            <textarea
              className="form-control"
              rows={4}
              placeholder="Enter 1 option per line Male Female Non-Binary Other"
              defaultValue={""}
            />
          </div>
          <div className="col-md-6">
            <label className="form-label">
              If other Gender, please type here:
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="Space for answer"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default YourQ3Component;
