"use client";
import ADMISSIONFORM from "@/compoments/intake/ADMISSION-FORM/page";
import AuthorizationForMedication from "@/compoments/intake/AUTHORIZATION-FOR-MEDICATION/page";
import FUNDSANDPROPERTY from "@/compoments/intake/FUNDS-AND-PROPERTY/page";
import SELFMANAGEMENT from "@/compoments/intake/SELF-MANAGEMENT/page";
import StandardRelease from "@/compoments/intake/Standard-Release/page";
import React, { useState } from "react";
import { Stepper, Step } from "react-form-stepper";

function page() {
  const [currentStep, setCurrentStep] = useState(0);

  const handleNext = () => {
    if (currentStep < 10) setCurrentStep(currentStep + 1);
  };

  const handleBack = () => {
    if (currentStep > 0) setCurrentStep(currentStep - 1);
  };

  const tabsList = ["15 days", "1 Months", "6 Months", "1 year"];

  const [tabs, setTabs] = useState<any>();
  return (
    <>
      <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
        {tabsList.map((items, index) => (
          <>
            <li key={index} className="nav-item" role="presentation">
              <button
                onClick={() => setTabs(items)}
                className={`nav-link ${items === tabs ? "active" : ""} `}
              >
                {items}
              </button>
            </li>
          </>
        ))}
      </ul>

      <div>
        {tabs === "15 days" ? (
          <div>15 days component</div>
        ) : tabs === "1 Months" ? (
          <div>1 Month component</div>
        ) : tabs === "6 Months" ? (
          <div>6 Months component</div>
        ) : tabs === "1 year" ? (
          <div>1 Year component</div>
        ) : null}
      </div>

      <div className="container mt-5 ">
        <Stepper
          className="d-flex  justify-content-around"
          activeStep={currentStep}
        >
          <Step label="Personal Info" />
          <Step label="Contact Info" />
          <Step label="Review" />
          <Step label="FUNDSANDPROPERTY" />
          <Step label="ADMISSIONFORMANDDATASHEET" />
        </Stepper>

        <div className="mt-4">
          {currentStep === 0 && (
            <div>
              <StandardRelease />
            </div>
          )}

          {currentStep === 1 && <AuthorizationForMedication />}

          {currentStep === 2 && <SELFMANAGEMENT />}
          {currentStep === 3 && <FUNDSANDPROPERTY />}
          {currentStep === 4 && <ADMISSIONFORM />}
        </div>

        <div className="d-flex justify-content-between mt-4">
          <button
            className="btn btn-secondary"
            onClick={handleBack}
            disabled={currentStep === 0}
          >
            Back
          </button>
          {currentStep < 10 ? (
            <button className="btn btn-primary" onClick={handleNext}>
              Next
            </button>
          ) : (
            <button
              className="btn btn-success"
              onClick={() => alert("Form Submitted!")}
            >
              Submit
            </button>
          )}
        </div>
      </div>
    </>
  );
}

export default page;
