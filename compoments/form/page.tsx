"use client";
import dynamic from "next/dynamic";
import React, { useState } from "react";
import SELFMANAGEMENT from "../intake/Self-Management/page";
import AuthorizationForMedication from "../intake/Authorization-For-Medication/page";
import StandardRelease from "../intake/Standard-Release/page";
import FUNDSANDPROPERTY from "../intake/Funds-And-Property/page";
import ADMISSIONFORM from "../intake/Admission-Form/page";
import IndividualAbuse from "../intake/Individual-Abuse/page";
import POLICYORIENTATIONRECEIPT from "../intake/Policy-Orientation-Receipt/page";
import ResidencyAgreement from "../intake/Residency-Agreement/page";
import ServicesPlan from "../intake/services-Plan";

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

function FormPage() {
  const [currentStep, setCurrentStep] = useState(0);

  const handleNext = () => {
    if (currentStep <= 8) setCurrentStep(currentStep + 1);
  };

  const handleBack = () => {
    if (currentStep > 0) setCurrentStep(currentStep - 1);
  };

  return (
    <>
      <div className="container mt-5 ">
        <StepperComponent
          className="d-flex  justify-content-around"
          activeStep={currentStep}
          styleConfig={{
            activeBgColor: "#17635C",
            completedBgColor: "#3494FB",
          }}
        >
          <StepComponent label="Personal Info" />
          <StepComponent label="Contact Info" />
          <StepComponent label="Review" />
          <StepComponent label="Fund Sand Property" />
          <StepComponent label="Admission " />
          <StepComponent label="Individual Abuse " />
          <StepComponent label="Policy Orientation " />
          <StepComponent label="Residency Agreement " />
          <StepComponent label="Services Plan " />
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
          {currentStep === 8 && <ServicesPlan />}
        </div>

        <div className="d-flex justify-content-between mt-4 pb-5">
          <button
            className="btn btn-secondary"
            onClick={handleBack}
            disabled={currentStep === 0}
          >
            Back
          </button>
          {currentStep <= 8 ? (
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

export default FormPage;
