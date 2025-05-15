"use client"
import React from "react";
import ESignature from "../E-Signature/E-signature";

function ServicesPlan() {
  const tabsList = [
    "30-Day Service Plan Review ",
    "Quarterly Service Plan Review",
    "6-Month Service Plan Review",
    "Annual Service Plan Review",
  ];
  return (
    <>
      <div className="container ">
        <div className="card p-5 ">
          <h5 className="fw-bold pb-3">Service Plan Review: </h5>

          {tabsList?.map((items: any, index) => (
            <div className="form-check d-flex gap-2 " key={index}>
              <input
                className="form-check-input"
                type="checkbox"
                id={`flexCheckDefault-${index}`} // unique id
                value={items} // assuming there's a value field
              />

              <label className="form-label">
                {items || items || "Checkbox"}
              </label>
            </div>
          ))}

          <ESignature />
        </div>


        
      </div>
    </>
  );
}

export default ServicesPlan;
