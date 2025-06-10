"use client";
import React, { useState } from "react";
import SELFMANAGEMENT from "../intake/SelfManagement";
import AuthorizationForMedication from "../intake/AuthorizationForMedication";
import FUNDSANDPROPERTY from "../intake/FundsAndProperty";
import ADMISSIONFORM from "../intake/AdmissionForm";
import IndividualAbuse from "../intake/IndividualAbuse";
import POLICYORIENTATIONRECEIPT from "../intake/PolicyOrientationReceipt";
import ResidencyAgreement from "../intake/ResidencyAgreement";
import ServicesPlan from "../intake/ServicesPlan";
import { stepLabels } from "@/constants/stepLabels";
import { Stepper } from "../Stepper/Stepper";
import AUTHORIZATIONTOACTINANEMERGENCY from "../intake/AUTHORIZATIONTOACTNANEMERGENCY";
import PERSONCENTEREDANDPOSITIVESUPPORTSTRATEGIES from "../intake/PERSON-CENTEREDANDPOSITIVESUPPORTSTRATEGIES";
import RIGHTSOFPERSONSSERVED from "../intake/RIGHTSOFPERSONSSERVED";
import StandardRelease from "../intake/StandardRelease";
import AUTHORIZATIONANDAGREEMENTFORINJECTABLEMEDICATIONS from "../intake/AUTHORIZATIONANDAGREEMENTFORINJECTABLEMEDICATIONS";

function FormPage() {
  const [currentStep, setCurrentStep] = useState(0);

  // On mount, load currentStep from localStorage if available
  React.useEffect(() => {
    const savedStep = localStorage.getItem("currentStep");
    if (savedStep !== null) {
      setCurrentStep(parseInt(savedStep, 12));
    }
  }, []);

  // Whenever currentStep changes, save to localStorage
  React.useEffect(() => {
    localStorage.setItem("currentStep", currentStep.toString());
  }, [currentStep]);

  const handleNext = () => {
    if (currentStep <= 12) setCurrentStep(currentStep + 1);
  };

  const handleBack = () => {
    if (currentStep > 0) setCurrentStep(currentStep - 1);
  };

  return (
    <>
      <div className="container mt-5">
        <Stepper steps={stepLabels} currentStep={currentStep} />

        <div className="mt-4">
          {currentStep === 0 && (
            <StandardRelease
              handleNext={handleNext}
              handleBack={handleBack}
              currentStep={currentStep}
            />
          )}

          {currentStep === 1 && (
            <AuthorizationForMedication
              handleNext={handleNext}
              handleBack={handleBack}
              currentStep={currentStep}
            />
          )}
          {currentStep === 2 && (
            <SELFMANAGEMENT
              handleNext={handleNext}
              handleBack={handleBack}
              currentStep={currentStep}
            />
          )}
          {currentStep === 3 && (
            <FUNDSANDPROPERTY
              handleNext={handleNext}
              handleBack={handleBack}
              currentStep={currentStep}
            />
          )}
          {currentStep === 4 && (
            <ADMISSIONFORM
              handleNext={handleNext}
              handleBack={handleBack}
              currentStep={currentStep}
            />
          )}
          {currentStep === 5 && (
            <IndividualAbuse
              handleNext={handleNext}
              handleBack={handleBack}
              currentStep={currentStep}
            />
          )}
          {currentStep === 6 && (
            <POLICYORIENTATIONRECEIPT
              handleNext={handleNext}
              handleBack={handleBack}
              currentStep={currentStep}
            />
          )}
          {currentStep === 7 && (
            <ResidencyAgreement
              handleNext={handleNext}
              handleBack={handleBack}
              currentStep={currentStep}
            />
          )}

          {currentStep === 8 && (
            <PERSONCENTEREDANDPOSITIVESUPPORTSTRATEGIES
              handleNext={handleNext}
              handleBack={handleBack}
              currentStep={currentStep}
            />
          )}

          {currentStep === 9 && (
            <RIGHTSOFPERSONSSERVED
              handleNext={handleNext}
              handleBack={handleBack}
              currentStep={currentStep}
            />
          )}

          {currentStep === 10 && (
            <AUTHORIZATIONTOACTINANEMERGENCY
              handleNext={handleNext}
              handleBack={handleBack}
              currentStep={currentStep}
            />
          )}


            {currentStep === 11 && (
            <AUTHORIZATIONANDAGREEMENTFORINJECTABLEMEDICATIONS
              handleNext={handleNext}
              handleBack={handleBack}
              currentStep={currentStep}
            />
          )}

          {currentStep === 12 && (
            <ServicesPlan
              handleNext={handleNext}
              handleBack={handleBack}
              currentStep={currentStep}
            />
          )}
        </div>
      </div>
    </>
  );
}

export default FormPage;
