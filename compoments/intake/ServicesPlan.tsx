"use client";
import React from "react";
import ESignature from "../E-Signature/E-signature";
import HospitalLogo from "./common/HospitalLogo";

function ServicesPlan({ handleBack, handleNext, currentStep }: any) {
  const tabsList = [
    "30-Day Service Plan Review ",
    "Quarterly Service Plan Review",
    "6-Month Service Plan Review",
    "Annual Service Plan Review",
  ];
  return (
    <>
      <div className="container ">
        <div className="card px-5 pb-5 pt-3">
          <HospitalLogo />
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

          {/* <ESignature /> */}

          <div className="d-flex justify-content-end pt-2">
            <button
              className="btn "
              // onClick={() => onNavigate("submit")}
              style={{ backgroundColor: "#00A5A8", color: "white" }}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default ServicesPlan;
