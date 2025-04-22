const FormList = {
  STANDARDRELEASEOFINFORMATION: {
    title: "STANDARD RELEASE OF INFORMATION",
    questions: [
      {
        title: "Name",
        type: "text",
      },
      {
        title: "Date of birth",
        type: "date",
      },
      {
        title: "What are some reasons we use your information?",
        type: "textarea",
      },
      {
        title:
          "Do you have to provide us with information? What will happen if you do not provide us all the information? What happens if you do not release your information to others",
        type: "textarea",
      },
      {
        title: "Who else may access your information when required?",
        options: [
          { title: "Minnesota Department of Human Services", type: "checkbox" },
          { title: "County of financial responsibility", type: "checkbox" },
          { title: "County of company's social services", type: "checkbox" },
          {
            title: "U.S. Department of Health and Human Services",
            type: "checkbox",
          },
          {
            title: "Law enforcement personnel and attorneys",
            type: "checkbox",
          },
          { title: "Social Security Administration", type: "checkbox" },
          { title: "Various state departments", type: "checkbox" },
          { title: "Federal, state, or county auditors", type: "checkbox" },
          {
            title: "Representative payee and financial workers",
            type: "checkbox",
          },
          {
            title: "Adult or Child Protection units and investigators",
            type: "checkbox",
          },
          {
            title: "Other licensed service providers as needed",
            type: "checkbox",
          },
          {
            title:
              "The MN Ombudsman for Mental Health or Developmental Disabilities",
            type: "checkbox",
          },
          {
            title: "Agents of the welfare system or investigators",
            type: "checkbox",
          },
        ],
      },
      {
        title:
          "You have the right to access your information and to request copies.",
        type: "textarea",
      },
      {
        title: "What can you do if you believe your information is inaccurate?",
        type: "textarea",
      },
      {
        title: "What privacy rights do minors have?",
        type: "textarea",
      },
    ],
    summary:
      "Summary/consequences – I know that state and federal privacy laws protect my records. I know:",
    description: [
      { point: "Why I am being asked to release this information." },
      {
        point:
          "I do not have to consent to the release of this information. But not doing so may affect this company's ability to provide needed services to me.",
      },
      {
        point:
          "If I do not consent, the information will not be released unless the law otherwise allows it.",
      },
      {
        point:
          "I may stop this consent with a written notice at any time, but this written notice will not affect information this company has already released.",
      },
      {
        point:
          "The person(s) or agency(ies) who receive my information may need to pass it on to others.",
      },
      {
        point:
          "If my information is passed on to others by this company, it may no longer be protected by this authorization.",
      },
      {
        point:
          "This consent will end in one annual year from the date I sign it, unless the law allows for a longer period.",
      },
    ],
    Instructions:
      "I understand that I and my legal representative have full access to my records and recorded information that is maintained, collected, stored, or disseminated by the company. Private data are records or recorded information that includes personal, financial, service, health, and medical information.  I, hereby, authorize this company to routinely release my private information to those staff of this company who have a need to know including: executive and administrative staff, financial and nursing staff including assigned or consulting nurses, management staff including the Designated Coordinator and/or Designated Manager, and direct support staff. In addition, my support team or expanded support team may receive my private information as needed, including my county case manager, employer, behavior professionals, and other licensed service providers.",
  },
  ADMISSIONFORM: {
    title: "AUTHORIZATION FOR MEDICATION AND TREATMENT ADMINISTRATION ",
    questions: [
      {
        title: "Name",
        type: "text",
      },
      {
        title: "Date of birth",
        type: "date",
      },

      {
        title: "I authorize the company to administer the following: ",
        options: [
          { title: "Routine prescribed medications", type: "checkbox" },
          { title: "Routine prescribed treatments", type: "checkbox" },
          {
            title: "Standing Order Medications (as authorized by prescriber)",
            type: "checkbox",
          },
          { title: "Prescribed psychotropic medication", type: "checkbox" },
          { title: "Prescribed PRN psychotropic medication", type: "checkbox" },
          { title: "Other, please specify:", type: "checkbox" },
        ],
      },
    ],
    summary: "I understand the following:",
    description: [
      {
        point:
          "I may refuse to authorize the company to administer medication or treatment and that the company will not administer the medication.",
      },
      {
        point:
          "This authorization will remain in effect unless withdrawn in writing and it may be withdrawn at any time.",
      },
      {
        point:
          "The company must notify the prescriber as expediently as possible if I refuse to authorize the administration of medication or treatment and any directives or orders given will be followed.",
      },
      {
        point:
          "A refusal to authorize the administration of a specific psychotropic medication is not grounds for service termination and does not constitute an emergency. A refusal to administer the psychotropic medication may not be overridden without a court order.",
      },
    ],
    // Instructions:
    //   "If responsibility for medication and treatment administration has been assigned to this company in the Support Plan and/or Support Plan Addendum, the company will obtain written authorization from the person served and/or legal representative prior to the administration of any medication or treatment.",
  },
  AUTHORIZATIONFORMEDICATION: {},
  FUNDSANDPROPERTY: {},
  POLICYORIENTATION: {},
  SELFMANAGEMENT: {
    title: "AUTHORIZATION FOR MEDICATION AND TREATMENT ADMINISTRATION ",
    questions: [
      {
        title: "Name",
        type: "text",
      },
      {
        title: "Date of birth",
        type: "date",
      },

      {
        title: "Date of Self-Management Assessment development:",
        type: "text",
      },

      {
        title: "For the annual period from:",
        type: "text",
      },

      {
        title: "Name and title of person completing the review:",
        type: "text",
      },

      {
        title: "I authorize the company to administer the following: ",
        options: [
          { title: "Routine prescribed medications", type: "checkbox" },
          { title: "Routine prescribed treatments", type: "checkbox" },
          {
            title: "Standing Order Medications (as authorized by prescriber)",
            type: "checkbox",
          },
          { title: "Prescribed psychotropic medication", type: "checkbox" },
          { title: "Prescribed PRN psychotropic medication", type: "checkbox" },
          { title: "Other, please specify:", type: "checkbox" },
        ],
      },
    ],
    summary: "I understand the following:",
    description: [
      {
        point:
          "I may refuse to authorize the company to administer medication or treatment and that the company will not administer the medication.",
      },
      {
        point:
          "This authorization will remain in effect unless withdrawn in writing and it may be withdrawn at any time.",
      },
      {
        point:
          "The company must notify the prescriber as expediently as possible if I refuse to authorize the administration of medication or treatment and any directives or orders given will be followed.",
      },
      {
        point:
          "A refusal to authorize the administration of a specific psychotropic medication is not grounds for service termination and does not constitute an emergency. A refusal to administer the psychotropic medication may not be overridden without a court order.",
      },
    ],
    Instructions:
      "Within the scope of services to this person, the license holder must assess, at a minimum, the areas included on this document. Additional information on self-management may be included per request of the person served and/or legal representative and case manager. The Self-Management Assessment will be completed by the company’s designated staff person and will be done in consultation with the person and members of the support team.  <br> </br> The license holder will complete this assessment before the 45-day planning meeting and review it at the meeting. Within 20 working days of the 45-day meeting, dated signatures will be obtained from the person and/or legal representative and case manager to document the completion and approval of the Self-Management Assessment. At a minimum of annually, or within 30 days of a written request from the person and/or legal representative or case manager. This Self-Management Assessment will be reviewed by the support team or expanded support team as part of a service plan review and dated signatures obtained.  <br> </br>  Assessments must be based on the person’s status within the last 12 months at the time of service initiation. Assessments based on older information must be documented and justified. <br> </br>  The general and health-specific supports and outcomes necessary or desired to support the person based upon this assessment and the requirements of person centered planning and service delivery will be documented in the Support Plan Addendum.",
  },
};

export default FormList;
