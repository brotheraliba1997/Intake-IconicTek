"use client";
import ADMISSIONFORM from "@/compoments/intake/Admission-Form/page";
import AuthorizationForMedication from "@/compoments/intake/Authorization-For-Medication/page";
import FUNDSANDPROPERTY from "@/compoments/intake/Funds-And-Property/page";
import IndividualAbuse from "@/compoments/intake/Individual-Abuse/page";
import POLICYORIENTATIONRECEIPT from "@/compoments/intake/Policy-Orientation-Receipt/page";
import ResidencyAgreement from "@/compoments/intake/Residency-Agreement/page";
import SELFMANAGEMENT from "@/compoments/intake/Self-Management/page";
import StandardRelease from "@/compoments/intake/Standard-Release/page";
import React, { useState } from "react";
import dynamic from "next/dynamic";

const StepperComponent = dynamic(
  () => import("react-form-stepper").then((mod) => mod.Stepper),
  {
    loading: () => <p>Loading...</p>,
    ssr: false,
  }
);

const StepComponent = dynamic(
  () => import("react-form-stepper").then((mod) => mod.Step),
  {
    loading: () => <p>Loading...</p>,
    ssr: false,
  }
);

function page() {
  const [currentStep, setCurrentStep] = useState(0);

  const handleNext = () => {
    if (currentStep <= 7) setCurrentStep(currentStep + 1);
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
        <StepperComponent
          className="d-flex  justify-content-around"
          activeStep={currentStep}
        >
          <StepComponent label="Personal Info" />
          <StepComponent label="Contact Info" />
          <StepComponent label="Review" />
          <StepComponent label="Fund Sand Property" />
          <StepComponent label="Admission " />
          <StepComponent label="Individual Abuse " />
          <StepComponent label="Policy Orientation " />
          <StepComponent label="Residency Agreement " />
        </StepperComponent>

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
          {currentStep === 5 && <IndividualAbuse />}
          {currentStep === 6 && <POLICYORIENTATIONRECEIPT />}
          {currentStep === 7 && <ResidencyAgreement />}
        </div>

        <div className="d-flex justify-content-between mt-4">
          <button
            className="btn btn-secondary"
            onClick={handleBack}
            disabled={currentStep === 0}
          >
            Back
          </button>
          {currentStep <= 7 ? (
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
