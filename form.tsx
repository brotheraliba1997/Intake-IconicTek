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

      {
        title:
          "<p> Summary/consequences  I know that state and federal privacy laws protect my records. I know: </p>",
        type: "html",
      },

      {
        title: `<ul> <li>Why I am being asked to release this information  </li> <li>I do not have to consent to the release of this information. But not doing so may affect this company's ability to provide needed services to me  </li> <li>This authorization will remain in effect unless withdrawn in writing and it may be withdrawn at any time.  </li><li>If I do not consent, the information will not be released unless the law otherwise allows it.  </li><li>I may stop this consent with a written notice at any time, but this written notice will not affect information this company has already released  </li>  <li>The person(s) or agency(ies) who receive my information may need to pass it on to others.  </li><li>If my information is passed on to others by this company, it may no longer be protected by this authorization.  </li> </ul>`,
        type: "html",
      },

      {
        title: `<p> I understand that I and my legal representative have full access to my records and recorded information that is maintained, collected, stored, or disseminated by the company. Private data are records or recorded information that includes personal, financial, service, health, and medical information.  I, hereby, authorize this company to routinely release my private information to those staff of this company who have a need to know including: executive and administrative staff, financial and nursing staff including assigned or consulting nurses, management staff including the Designated Coordinator and/or Designated Manager, and direct support staff. In addition, my support team or expanded support team may receive my private information as needed, including my county case manager, employer, behavior professionals, and other licensed service providers. </p>`,
        type: "html",
      },
    ],
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

      {
        title: "<h3> I understand the following: </h3>",
        type: "html",
      },

      {
        title:
          "<ul> <li>I may refuse to authorize the company to administer medication or treatment and that the company will not administer the medication.  </li> <li>I may refuse This authorization will remain in effect unless withdrawn in writing and it may be withdrawn at any time.  </li> <li>This authorization will remain in effect unless withdrawn in writing and it may be withdrawn at any time.  </li><li>The company must notify the prescriber as expediently as possible if I refuse to authorize the administration of medication or treatment and any directives or orders given will be followed.  </li>  <li>A refusal to authorize the administration of a specific psychotropic medication is not grounds for service termination and does not constitute an emergency. A refusal to administer the psychotropic medication may not be overridden without a court order.  </li>  </ul>",
        type: "html",
      },
    ],
  },
  AUTHORIZATIONFORMEDICATION: {},

  FUNDSANDPROPERTY: {
    title: "FUNDS AND PROPERTY AUTHORIZATION",
    questions: [
      {
        title: "Name",
        type: "text",
      },
      {
        title:
          "<p> The company is authorized to assist the person served at this program as directed below with the safekeeping of their funds or other property. </p>",
        type: "html",
      },

      {
        title: "Cash Resources ",
        type: "checkbox",
        options: [
          {
            title:
              "Does the person need assistance from this company with cash resources?",
            show: false,
          },
          { title: "Yes ", show: true },
          {
            title: "NO",
            show: true,
          },
          { title: "Does not have cash", show: true },
          {
            title:
              "If yes, please describe what procedures will be done to support the person including any limitation to amounts used:",
            show: false,
          },
        ],
      },

      {
        title: "Checking Account ",
        type: "chexkbox",
        options: [
          {
            title:
              "Does the person need assistance from this company with management of their checking account, including an ATM or debit card? ",
            show: false,
          },
          {
            title: "Yes ",
            show: true,
          },
          {
            title: "NO",
            show: true,
          },
          {
            title: "Does not have a checking account",
            show: true,
          },
          {
            title:
              "If yes, please describe what procedures will be done to support the person including specifics related to transactions, checkbook storage, assistance with writing checks, assistance with using debit card, access to online banking, with passwords/security questions, etc.: ",
            show: false,
          },
        ],
      },

      {
        title: "Savings Account",
        type: "chexkbox",
        options: [
          {
            title:
              "Does the person need assistance from this company with management of their checking account, including an ATM or debit card?  ",
            show: false,
          },
          {
            title: "Yes ",
            show: true,
          },
          {
            title: "NO",
            show: true,
          },
          {
            title: "Does not have a checking account",
            show: true,
          },
          {
            title:
              "If yes, please describe what procedures will be done to support the person including specifics related to transactions, checkbook storage, assistance with writing checks, assistance with using debit card, access to online banking, with passwords/security questions, etc.: ",
            show: false,
          },
        ],
      },

      {
        title: "Credit Cards",
        type: "chexkbox",
        options: [
          {
            title:
              "Does the person need assistance from this company with management of their credit card(s)?  ",
            show: false,
          },
          {
            title: "Yes ",
            show: true,
          },
          {
            title: "NO",
            show: true,
          },
          {
            title: "Does not have a credit card(s)",
            show: true,
          },
          {
            title:
              "If yes, please describe what procedures will be done to support the person including specifics as it relates to credit card use, assistance with receipt of and paying of credit card bills, access to online banking, with passwords/security questions, etc.",
            show: false,
          },
        ],
      },

      {
        title: "Gift Cards",
        type: "chexkbox",
        options: [
          {
            title:
              "Does the person need assistance from this company with management of their credit card(s)?  ",
            show: false,
          },
          {
            title: "Yes ",
            show: true,
          },
          {
            title: "NO",
            show: true,
          },
          {
            title: "Does not have gift cards",
            show: true,
          },
          {
            title:
              "If yes, please describe what procedures will be done to support the person including specifics related to maintenance, tracking, and knowing the balance, etc. of gift cards:",
            show: false,
          },
        ],
      },

      {
        title: "<h3> Personal Property</h3>",
        type: "html",
      },

      {
        title:
          "<ul> <li>This company is not responsible for normal wear and tear, theft, or damage to personal property unless it is established that the loss or damage was caused by a willful act, negligence, or misappropriation on the part of the company or its staff.  </li> <li>The person has the ability to seek outside agencies to supply personal liability/renters insurance to fully protect their personal property.  </li><li>It is the responsibility of the person to seek other forms of personal liability/renters insurance if necessary.   </li>    </ul>",
        type: "html",
      },

      {
        title: "Frequency of Itemized Financial Statements",
        type: "html",
      },

      {
        title:
          "The company must survey, document, and implement the preferences of the person and/or legal representative and the case manager for frequency of receiving a statement that itemizes receipts and disbursements of funds or other property. The license holder must document changes to these preferences when they are requested.",
        type: "html",
      },

      {
        title: "Person/Legal representative",
        type: "chexkbox",
        options: [
          {
            title: "N/A ",
            show: true,
          },
          {
            title: "Semi-annual",
            show: true,
          },
          {
            title: "Annual",
            show: true,
          },
          {
            title: "Other (specify):",
            show: true,
          },
        ],
      },

      {
        title: "Case Manager",
        type: "chexkbox",
        options: [
          {
            title: "N/A ",
            show: true,
          },
          {
            title: "Semi-annual",
            show: true,
          },
          {
            title: "Annual",
            show: true,
          },
          {
            title: "Other (specify):",
            show: true,
          },
        ],
      },

      {
        title: "Describe information to be sent:",
        type: "",
        options: [
          {
            title: "Person/Legal representative",
            show: true,
          },
          {
            title: "Case Manager",
            show: true,
          },
        ],
      },

  

      {
        title: "Representative Payee",
        type: "checkbox",
        options: [
          {
            title: "Does the person have a representative payee?",
          },
          {
            title: "Yes",
            show: true,
          },

          {
            title: "No",
            show: true,
          },
        ],
      },

      {
        title: "If yes, include that persons contact information:",
        type: "",
        options: [
          {
            title: "Does the person have a representative payee?",
            show: false,
          },
          {
            title: "Name",
            show: true,
          },

          {
            title: "Address",
            show: true,
          },

          {
            title: "Phone number:",
            show: true,
          },
        ],
      },

      {
        title: "<h3>Program Information</h3>",
        type: "html",
      },

      {
        title:
          "<p>Per MN Statutes, 245D.06, subdivision 4, whenever the company assist a person with the safekeeping of funds or other property according to section 245A.04, subdivision 13, the company must obtain written authorization to do so from the person or the person’s legal representative and the case manager. Authorization must be obtained with five (5) working days of service initiation and renewed annually thereafter.</p>",
        type: "html",
      },

      {
        title:
          "<h3>Per MN Statutes, section 245A.04, subdivision 13, this company must: </h3> <ol> <li>Ensure that the person retains the use and availability of personal funds or property unless restrictions are justified and documented in their plans. </li> <li>Ensure separation of funds of the person served from funds of the license holder, the program, or staff. </li><li>When requested, assist a person with the safekeeping of funds or other property, and will:   </li>  <ol><li>Immediately document receipt and disbursement of the person’s funds or other property at the time of receipt or disbursement, including the person's signature, or the signature of the conservator or payee   </li><li>Return to the person upon request, funds and property in the license holder's possession subject to restrictions in the person's plan, as soon as possible, but no later than three working days after the date of request.   </li> </ol>   </ol>",
        type: "html",
      },

      {
        title:
          "<h3>Per MN Statutes, section 245A.04, subdivision 13, this company must: </h3>   </ol>",
        type: "html",
      },

      {
        title:
          "<ol> <li>Ensure that the person retains the use and availability of personal funds or property unless restrictions are justified and documented in their plans. </li> <li>Ensure separation of funds of the person served from funds of the license holder, the program, or staff. </li><li>When requested, assist a person with the safekeeping of funds or other property, and will:   </li>  <ol><li>Immediately document receipt and disbursement of the person’s funds or other property at the time of receipt or disbursement, including the person's signature, or the signature of the conservator or payee   </li><li>Return to the person upon request, funds and property in the license holder's possession subject to restrictions in the person's plan, as soon as possible, but no later than three working days after the date of request.   </li> </ol>   </ol>",
        type: "html",
      },

      {
        title:
          "<h3>This company and program staff must not: </h3> <ol> <li>Borrow money from a person served by the program </li><li>Purchase personal items from a person served by the program   </li>  <li>Sell merchandise or personal services to a person served by the program  </li> <li>Require the person served to purchase items for which the company is eligible for reimbursement  </li> </ol>",
        type: "html",
      },
    ],
  },

  SELFMANAGEMENT: {
    title: "SELF-MANAGEMENT ASSESSMENT",
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
        title:
          "Health and medical needs to maintain or improve physical, mental, and emotional well-being",
        type: "table",

        coloum: [
          { title: "Assessment area " },
          { title: "Is the person able to self-manage in this area?" },
          {
            title:
              "Assessment - include information about the person that is descriptive of their overall strengths, functional skills and abilities, and behaviors or symptoms ",
          },
        ],

        subQuestion: [
          {
            title: "Allergies (state specific allergies): ",
            type: "checkbox",

            options: [
              {
                title: "Yes",
              },

              {
                title: "No ",
              },
              {
                title: "NA - there are no allergies",
              },
            ],
          },

          {
            title: "Seizures (state specific seizure types):  ",
            type: "checkbox",
            options: [
              {
                title: "Yes",
              },

              {
                title: "No ",
              },
              {
                title: "NA - there are no allergies",
              },
            ],
          },

          {
            title: "Choking",
            type: "checkbox",
            options: [
              {
                title: "Yes",
              },

              {
                title: "No ",
              },
              {
                title: "NA - there are no allergies",
              },
            ],
          },

          {
            title: "Special dietary needs (state specific need):",
            type: "checkbox",
            options: [
              {
                title: "Yes",
              },

              {
                title: "No",
              },
              {
                title: "NA – there are no special dietary needs ",
              },
            ],
          },

          {
            title: "Chronic medical conditions (state condition): ",
            type: "checkbox",

            options: [
              {
                title: "Yes",
              },

              {
                title: "No",
              },
              {
                title: "NA - there are no chronic medical conditions ",
              },
            ],
          },

          {
            title: "Self-administration of medication or treatment orders ",
            type: "checkbox",

            options: [
              {
                title: "Yes",
              },

              {
                title: "No",
              },
            ],
          },

          {
            title: "Preventative screening ",
            type: "checkbox",
            options: [
              {
                title: "Yes",
              },

              {
                title: "No",
              },
            ],
          },

          {
            title: "Medical and dental appointments",
            type: "checkbox",
            options: [
              {
                title: "Yes",
              },

              {
                title: "No",
              },

              {
                title: "",
              },
            ],
          },

          {
            title: "Other health and medical needs (state specific need):",
            type: "checkbox",

            options: [
              {
                title: "Yes",
              },

              {
                title: "No",
              },

              {
                title: "NA",
              },
            ],
          },

          {
            title: "Other health and medical needs (state specific need):",
            type: "checkbox",

            options: [
              {
                title: "Yes",
              },

              {
                title: "No",
              },

              {
                title: "NA",
              },
            ],
          },

          {
            title: "Other health and medical needs (state specific need):",
            type: "checkbox",

            options: [
              {
                title: "Yes",
              },

              {
                title: "No",
              },

              {
                title: "NA",
              },
            ],
          },

          {
            title: "Other health and medical needs (state specific need):",
            type: "checkbox",

            options: [
              {
                title: "Yes",
              },

              {
                title: "No",
              },

              {
                title: "NA",
              },
            ],
          },
        ],
      },

      {
        title:
          "Personal safety to avoid injury or accident in the service setting",
        type: "table",

        coloum: [
          { title: "Assessment area " },
          { title: "Is the person able to self-manage in this area?" },
          {
            title:
              "Assessment - include information about the person that is descriptive of their overall strengths, functional skills and abilities, and behaviors or symptoms ",
          },
        ],

        subQuestion: [
          {
            title: "Risk of falling (include the specific risk): ",
            type: "checkbox",
            options: [
              {
                title: "Yes",
              },

              {
                title: "No ",
              },
              {
                title: "NA - there are no allergies",
              },
            ],
          },

          {
            title: "Mobility issues (include the specific issue): ",
            type: "checkbox",
            options: [
              {
                title: "Yes",
              },

              {
                title: "No ",
              },
              {
                title: "NA - there are no allergies",
              },
            ],
          },

          {
            title: "",
            type: "checkbox",
            options: [
              {
                title: "NA - there are no allergies",
              },
            ],
          },

          {
            title: "Regulating water temperature",
            type: "checkbox",

            options: [
              {
                title: "Yes",
              },

              {
                title: "No",
              },
            ],
          },

          {
            title: "Community survival skills",
            type: "checkbox",
            options: [
              {
                title: "Yes",
              },

              {
                title: "No",
              },
            ],
          },

          {
            title: "Water safety skills ",
            type: "checkbox",

            options: [
              {
                title: "Yes",
              },

              {
                title: "No",
              },
            ],
          },

          {
            title: "Sensory disabilities ",
            type: "checkbox",

            options: [
              {
                title: "Yes",
              },

              {
                title: "No",
              },

              {
                title: "NA",
              },
            ],
          },

          {
            title: "Other personal safety needs (state specific need):",
            type: "checkbox",

            options: [
              {
                title: "Yes",
              },

              {
                title: "No",
              },

              {
                title: "NA",
              },
            ],
          },

          {
            title: "Other personal safety needs (state specific need):",
            type: "checkbox",

            options: [
              {
                title: "Yes",
              },

              {
                title: "No",
              },

              {
                title: "NA",
              },
            ],
          },

          {
            title: "Other personal safety needs (state specific need):",
            type: "checkbox",

            options: [
              {
                title: "Yes",
              },

              {
                title: "No",
              },

              {
                title: "NA",
              },
            ],
          },
        ],
      },

      {
        title:
          "Symptoms or behavior that may otherwise result in an incident as defined in section 245D.02, subd. 11 clauses (4) to (7) or suspension or termination of services by the license holder, or other symptoms or behaviors that may jeopardize the health and safety of the person or others.",
        type: "table",

        coloum: [
          { title: "Assessment area " },
          { title: "Is the person able to self-manage in this area?" },
          {
            title:
              "Assessment - include information about the person that is descriptive of their overall strengths, functional skills and abilities, and behaviors or symptoms ",
          },
        ],

        subQuestion: [
          {
            title: "Self-injurious behaviors (state behavior): ",
            type: "checkbox",

            options: [
              {
                title: "Yes",
              },

              {
                title: "No ",
              },
              {
                title: "NA - there are no allergies",
              },
            ],
          },

          {
            title: "Physical aggression/conduct (state behavior):  ",
            type: "checkbox",

            options: [
              {
                title: "Yes",
              },

              {
                title: "No ",
              },
              {
                title: "NA - there are no allergies",
              },
            ],
          },

          {
            title: "Verbal/emotional aggression (state behavior):",
            type: "checkbox",

            options: [
              {
                title: "NA - there are no allergies",
              },
            ],
          },

          {
            title: "Property destruction (state behavior):",
            type: "checkbox",

            options: [
              {
                title: "Yes",
              },

              {
                title: "No",
              },
            ],
          },

          {
            title: "Suicidal ideations, thoughts, or attempts",
            type: "checkbox",

            options: [
              {
                title: "Yes",
              },

              {
                title: "No",
              },
            ],
          },

          {
            title: "Criminal or unlawful behavior",
            type: "checkbox",

            options: [
              {
                title: "Yes",
              },

              {
                title: "No",
              },
            ],
          },

          {
            title: "Sensory disabilities ",
            type: "checkbox",

            options: [
              {
                title: "Yes",
              },

              {
                title: "No",
              },

              {
                title: "NA",
              },
            ],
          },

          {
            title:
              "Mental or emotional health symptoms and crises (state diagnosis): ",
            type: "checkbox",

            options: [
              {
                title: "Yes",
              },

              {
                title: "No",
              },

              {
                title: "NA",
              },
            ],
          },

          {
            title: "Unauthorized or unexplained absence from a program",
            type: "checkbox",

            options: [
              {
                title: "Yes",
              },

              {
                title: "No",
              },

              {
                title: "NA",
              },
            ],
          },

          {
            title:
              "An act or situation involving a person that requires the program to call 911, law enforcement or fire department",
            type: "checkbox",

            options: [
              {
                title: "Yes",
              },

              {
                title: "No",
              },

              {
                title: "NA",
              },
            ],
          },

          {
            title: "Other symptom or behavior (be specific): ",
            type: "checkbox",

            options: [
              {
                title: "Yes",
              },

              {
                title: "No",
              },

              {
                title: "NA",
              },
            ],
          },
        ],
      },

      // {
      //   title: "SIGNATURE PAGE",
      //   type: "Signature",

      //   subQuestion: [
      //     {
      //       title:
      //         "By signing below, I am indicating the completion and approval of the Self-Management Assessment.",
      //       options: [
      //         {
      //           title: "Person served:",
      //           type: "text",
      //         },

      //         {
      //           title: "Date ",
      //           type: "date",
      //         },

      //         {
      //           title: "Legal representative:",
      //           type: "text",
      //         },

      //         {
      //           title: "Date ",
      //           type: "date",
      //         },

      //         {
      //           title: "Case manager:",
      //           type: "text",
      //         },

      //         {
      //           title: "Date ",
      //           type: "date",
      //         },

      //         {
      //           title: "Licensed provider contact:",
      //           type: "text",
      //         },

      //         {
      //           title: "Date  ",
      //           type: "date",
      //         },

      //         {
      //           title: "Other support team member (name and title):",
      //           type: "text",
      //         },

      //         {
      //           title: "Date ",
      //           type: "date",
      //         },

      //         {
      //           title: "Other support team member (name and title):",
      //           type: "text",
      //         },

      //         {
      //           title: "Date  ",
      //           type: "date",
      //         },
      //       ],
      //     },
      //   ],
      // },

      {
        title:
          "<b> Please note: </b> <p> Within 20 working days of the 45-day planning meeting (and within 10 working days of the service plan review meeting), the assessment and this addendum must be submitted to and dated signatures obtained dated by the person served and/or legal representative and case manager to document completion and approval. If within 10 working days of this submission, the person served and/or legal representative or case manager has not signed and returned to the license holder the assessment and Support Plan Addendum or has not proposed written modification to its submission, the submission is deemed approved and in effect. It will remain in effect until the next annual month or until the person served and/or legal representative or case manager submits a written request to revise them. </p><ul> <li>I may refuse to authorize the company to administer medication or treatment and that the company will not administer the medication</li></ul>",
        type: "html",
      },

      {
        title:
          "Within the scope of services to this person, the license holder must assess, at a minimum, the areas included on this document. Additional information on self-management may be included per request of the person served and/or legal representative and case manager. The Self-Management Assessment will be completed by the company’s designated staff person and will be done in consultation with the person and members of the support team.  <br> </br> The license holder will complete this assessment before the 45-day planning meeting and review it at the meeting. Within 20 working days of the 45-day meeting, dated signatures will be obtained from the person and/or legal representative and case manager to document the completion and approval of the Self-Management Assessment. At a minimum of annually, or within 30 days of a written request from the person and/or legal representative or case manager. This Self-Management Assessment will be reviewed by the support team or expanded support team as part of a service plan review and dated signatures obtained.  <br> </br>  Assessments must be based on the person’s status within the last 12 months at the time of service initiation. Assessments based on older information must be documented and justified. <br> </br>  The general and health-specific supports and outcomes necessary or desired to support the person based upon this assessment and the requirements of person centered planning and service delivery will be documented in the Support Plan Addendum.",
        type: "html",
      },
    ],
  },

  ADMISSIONFORMANDDATASHEET: {
    title: "ADMISSION FORM AND DATA SHEET",
    questions: [
      {
        title:
          "*This form is completed at service initiation and updated as needed. Dated signatures are obtained at initiation and with changes.",
        type: "html",
      },

      {
        title: "PERSONAL INFORMATION ",
        type: "text",
        options: [
          {
            title: "Name",
          },
          { title: "Date of birth" },
          {
            title: "Address:",
          },
          { title: "Home telephone number: " },
          {
            title: "Cell phone number:  ",
          },

          {
            title: "Email address:",
          },

          {
            title: "Date of admission or re-admission:",
          },

          {
            title: "Language(s) spoken:",
          },

          {
            title: "Guardianship type (self, private, public): ",
          },

          {
            title: "Religious preference: ",
          },

          {
            title: "Marital status: ",
          },

          {
            title: "Other:  ",
          },
        ],
      },

      {
        title: "IDENTIFYING CHARACTERISTICS",
        type: "text",
        options: [
          {
            title: "Gender:",
          },

          {
            title: "Race: ",
          },

          {
            title: "Height:",
          },

          {
            title: "Weight:",
          },

          {
            title: "Hair color: ",
          },

          {
            title: "Eye color: ",
          },

          {
            title: "Distinguishing characteristics/identifying marks: ",
          },
        ],
      },

      {
        title: "FINANCIAL INFORMATION",
        type: "text",
        options: [
          {
            title: "Social Security Number (SSN):",
          },

          {
            title: "Medical Assistance Number: ",
          },

          {
            title: "County of responsibility:",
          },

          {
            title: "County of financial responsibility: ",
          },

          {
            title: "Burial account number:  ",
          },
        ],
      },

      {
        title: "MEDICAL INFORMATION",
        type: "text",
        options: [
          {
            title: "Diagnoses:",
          },

          {
            title: "Allergies: ",
          },

          {
            title: "Protocols (seizure, diabetic, etc.):",
          },

          {
            title:
              "Medical equipment, devices, or adaptive aides or technology used:  ",
          },

          {
            title: "Specialized dietary needs:   ",
          },
        ],
      },

      {
        title: "GENERAL CONTACT INFORMATION",
        type: "text",
        options: [
          {
            title: "Name:",
          },

          {
            title: "Address and telephone numbers: ",
          },

          {
            title: "Legal representative:",
          },

          {
            title: "Authorized representative:",
          },

          {
            title: "Primary emergency contact: ",
          },

          {
            title: "Case manager:  ",
          },

          {
            title: "Family member:   ",
          },

          {
            title: "Other:  ",
          },

          {
            title: "Financial worker:  ",
          },

          {
            title: "Residential contact: ",
          },

          {
            title: "Vocational contact:   ",
          },

          {
            title: "Other service provider: ",
          },
        ],
      },

      {
        title: "HEALTH-RELATED CONTACT INFORMATION",
        type: "text",
        options: [
          {
            title: "Name:",
          },

          {
            title: "Address and telephone numbers: ",
          },

          {
            title: "Primary health care professional: ",
          },

          {
            title: "Psychiatrist:",
          },

          {
            title: "Other mental health professional: ",
          },

          {
            title: "Neurologist:  ",
          },

          {
            title: "Dentist:    ",
          },

          {
            title: "Optometrist/Ophthalmologist:  ",
          },

          {
            title: "Audiologist:  ",
          },

          {
            title: "Pharmacy:  ",
          },

          {
            title: "Hospital of preference:   ",
          },

          {
            title: "Other health professional:  ",
          },
        ],
      },
    ],
  },

  IndividualAbuse: {
    title: "",
    questions: [
      {
        title: ` <p style="margin: 0; padding: 0; font-weight: bold;">MN Department of Human Services</p>
  <p style="margin: 0; padding: 0; font-weight: bold;">Office of Inspector General</p>
  <p style="margin: 0; padding: 0; font-weight: bold;">Licensing Division</p>
  <p style="margin: 0; padding: 0; font-weight: bold;">245D HCBS SAMPLE FORM</p>`,
        type: "html",
      },

      {
        title: `<h4 style="text-align: center; font-weight: bold;">Individual Abuse Prevention Plan (IAPP)</h4>`,
        type: "html",
      },
      {
        title: `
          <h4>Instructions and Requirements:</h4>
          <p>
            This program is required to establish and enforce ongoing written individual abuse prevention plans as required under Minnesota Statutes, section 626.557, subdivision 14 and section 245A.65, subdivision 2(b).
          </p>
          
          <h5>Development and Review of the Plan:</h5>
          <p>
            An individual abuse prevention plan shall be developed for each new person as part of the initial individual program plan or service plan required under the applicable licensing rule. The review and evaluation of the individual abuse prevention plan shall be done as part of the review of the program plan or service plan. The person receiving services shall participate in the development of the individual abuse prevention plan to the full extent of the person's abilities. If applicable, the person's legal representative shall be given the opportunity to participate with or for the person in the development of the plan. The interdisciplinary team shall document the review of all abuse prevention plans at least annually, using the individual assessment and any reports of abuse relating to the person. The plan shall be revised to reflect the results of this review.
          </p>
          
          <h5>Plan Contents:</h5>
          <p>
            The plan shall include a statement of measures that will be taken to minimize the risk of abuse to the vulnerable adult when the individual assessment required in section 626.557, subdivision 14, paragraph (b), indicates the need for measures in addition to the specific measures identified in the program abuse prevention plan. The measures shall include the specific actions the program will take to minimize the risk of abuse within the scope of the licensed services and will identify referrals made when the vulnerable adult is susceptible to abuse outside the scope or control of the licensed services. When the assessment indicates that the vulnerable adult does not need specific risk reduction measures in addition to those identified in the program abuse prevention plan, the individual abuse prevention plan shall document this determination.
          </p>
      
          <h5>Requirements of 626.557, Subd. 14(b):</h5>
          <p>
            Each facility, including a home health care agency and personal care attendant services providers, shall develop an individual abuse prevention plan for each vulnerable adult residing there or receiving services from them. The plan shall contain an individualized assessment of: (1) the person's susceptibility to abuse by other individuals, including other vulnerable adults; (2) the person's risk of abusing other vulnerable adults; and (3) statements of the specific measures to be taken to minimize the risk of abuse to that person and other vulnerable adults. For the purposes of this paragraph, the term "abuse" includes self-abuse.
          </p>
      
          <h5>Persons with History of Violent Crime or Acts of Physical Aggression Toward Others:</h5>
          <p>
            If the program knows that the vulnerable adult has committed a violent crime or an act of physical aggression toward others, the individual abuse prevention plan must detail the measures to be taken to minimize the risk that the vulnerable adult might reasonably be expected to pose to visitors to the facility and persons outside the facility, if unsupervised. Under this section, a facility knows of a vulnerable adult's history of criminal misconduct or physical aggression if it receives such information from a law enforcement authority or through a medical record prepared by another facility, another health care provider, or the facility's ongoing assessments of the vulnerable adult.
          </p>
      
          <p><strong>Legal Authority:</strong> MS §§ 245D.071, subd. 2, 245A.65, subd. 2, and 626.557, subd. 14</p>
        `,
        type: "html",
      },

      {
        title: ` <p style="margin: 0; padding: 0; font-weight: bold;">MN Department of Human Services</p>
  <p style="margin: 0; padding: 0; font-weight: bold;">Office of Inspector General</p>
  <p style="margin: 0; padding: 0; font-weight: bold;">Licensing Division</p>
  <p style="margin: 0; padding: 0; font-weight: bold;">245D HCBS SAMPLE FORM</p>`,
        type: "html",
      },
      {
        title: `
        <h4>Instructions and Requirements:</h4>`,
      },

      {
        title: `<p>REQUIREMENTS FOR USE OF THIS SAMPLE DOCUMENT:  245D license holders are responsible for modifying this sample for use in their program. At a minimum, you must fill in the blanks on this form. You may modify the format and content to meet standards used by your program. This sample meets compliance with current licensing requirements as of January 1, 2014. Providers remain responsible for reading, understanding and ensuring that this document conforms to current licensing requirements. DELETE THIS HIGHLIGHTED SECTION TO BEGIN MODIFYING THIS FORM.</p>`,
        type: "html",
      },

      {
        title: `Persons Name:`,
        type: "text",
      },

      {
        title: `Program: `,
        type: "text",
      },

      {
        title: `<b> Instructions: </b> <p> For each area, assess whether the person is susceptible to abuse by others and the person’s risk of abusing other vulnerable people.  If susceptible, indicate why by checking the appropriate reason or by adding a reason.  Identify specific measures to be taken to minimize the risk within the scope of licensed services and identify referrals needed when the person is susceptible outside the scope or control of the licensed services.  If the person does not need specific risk reduction measures in addition to those identified in the program abuse prevention plan, document this determination and identify the area of the program prevention plan that addresses the area of susceptibility.</p>`,
        type: "html",
      },

      {
        title: "A- Sexual abuse",
        type: "checkbox",
        options: [
          {
            title: "Is the person susceptible to abuse in this area? ",
            show: false,
          },

          {
            title: "Yes (if any area below is checked) ",
            show: true,
          },

          {
            title: "No",
            show: true,
          },

          {
            title: "Lack of understanding of sexuality",
            show: true,
          },

          {
            title: "Likely to seek or cooperate in an abusive situation",
            show: true,
          },

          {
            title: "Inability to be assertive",
            show: true,
          },

          {
            title: "Other:",
            show: true,
          },

          {
            title:
              "Specific measures to minimize risk of abuse for each area checked:  ",
            show: false,
          },
        ],
      },

      {
        title: `<p> Referrals made when the person is susceptible to abuse outside the scope or control of this program (Identify the referral and the date it occurred).</p>`,
        type: "html",
      },

      {
        title: "B- Physical Abuse",
        type: "checkbox",
        options: [
          {
            title: "Is the person susceptible to abuse in this area? ",
            show: false,
          },

          {
            title: "Yes (if any area below is checked) ",
            show: true,
          },

          {
            title: "No",
            show: true,
          },

          {
            title: "Inability to identify potentially dangerous situations",
            show: true,
          },

          {
            title: "Likely to seek or cooperate in an abusive situation",
            show: true,
          },

          {
            title: "Lack of community orientation skills",
            show: true,
          },

          {
            title: "Inappropriate interactions with others",
            show: true,
          },

          {
            title:
              "Inability to deal with verbally/physically aggressive persons",
            show: false,
          },
        ],
      },

      {
        title: ` <p style="margin: 0; padding: 0; font-weight: bold;">MN Department of Human Services</p>
  <p style="margin: 0; padding: 0; font-weight: bold;">Office of Inspector General</p>
  <p style="margin: 0; padding: 0; font-weight: bold;">Licensing Division</p>
  <p style="margin: 0; padding: 0; font-weight: bold;">245D HCBS SAMPLE FORM</p>`,
        type: "html",
      },

      {
        title: "Physical Abuse",
        type: "checkbox",
        options: [
          {
            title: "Verbally/physically abusive to others ",
            show: true,
          },

          {
            title: "“Victim” history exists",
            show: true,
          },

          {
            title: "Other:",
            show: true,
          },

          {
            title:
              "Specific measures to minimize risk of abuse for each area checked:  ",
            show: false,
          },
        ],
      },

      {
        title: `<p> Referrals made when the person is susceptible to abuse outside the scope or control of this program (Identify the referral and the date it occurred).</p>`,
        type: "html",
      },

      {
        title: "C- Self Abuse",
        type: "checkbox",
        options: [
          {
            title: "Is the person susceptible to abuse in this area? ",
            show: false,
          },

          {
            title: "“Yes (if any area below is checked)",
            show: true,
          },

          {
            title: "No",
            show: true,
          },

          {
            title: "Dresses inappropriately",
            show: true,
          },

          {
            title: "Refuses to eat",
            show: true,
          },

          {
            title: "Inability to care for self-help needs",
            show: true,
          },

          {
            title: "Lack of self-preservation skills (ignores personal safety)",
            show: true,
          },

          {
            title: "Engages in self-injurious behaviors",
            show: true,
          },

          {
            title: "Neglects or refuses to take medications",
            show: true,
          },

          {
            title: "Other:",
            show: true,
          },

          {
            title:
              "Specific measures to minimize risk of abuse for each area checked:",
            show: false,
          },
        ],
      },

      {
        title: `<p> Referrals made when the person is susceptible to abuse outside the scope or control of this program (Identify the referral and the date it occurred).</p>`,
        type: "html",
      },

      {
        title: "D- Financial Exploitation",
        type: "checkbox",
        options: [
          {
            title: "Is the person susceptible in this area? ",
            show: false,
          },

          {
            title: "“Yes (if any area below is checked)",
            show: true,
          },

          {
            title: "No",
            show: true,
          },

          {
            title: "Inability to handle financial matters",
            show: true,
          },

          {
            title:
              "Specific measures to minimize risk of abuse for each area checked:",
            show: false,
          },
        ],
      },

      {
        title: `<p> Referrals made when the person is susceptible to abuse outside the scope or control of this program (Identify the referral and the date it occurred).</p>`,
        type: "html",
      },

      {
        title: ` <p style="margin: 0; padding: 0; font-weight: bold;">MN Department of Human Services</p>
  <p style="margin: 0; padding: 0; font-weight: bold;">Office of Inspector General</p>
  <p style="margin: 0; padding: 0; font-weight: bold;">Licensing Division</p>
  <p style="margin: 0; padding: 0; font-weight: bold;">245D HCBS SAMPLE FORM</p>`,
        type: "html",
      },

      {
        title: "",
        type: "checkbox",
        options: [
          {
            title:
              "E- Is the program aware of this person committing a violent crime or act of physical aggression toward others?  ",
            show: false,
          },

          {
            title: "Yes ",
            show: true,
          },

          {
            title: "No",
            show: true,
          },
        ],
      },

      {
        title:
          "<p>Specific measures to be taken to minimize the risk this person might reasonably be expected to pose to visitors to the program and persons outside the program, if unsupervised: </p>",
        type: "html",
      },

      {
        title: `<p> Referrals made when the person is susceptible to abuse outside the scope or control of this program (Identify the referral and the date it occurred).</p>`,
        type: "html",
      },

      {
        title: `
          <p>
            An individual abuse prevention plan is developed for each new person as part of the initial service plan. The person will participate in the development of the plan to the full extent of their ability. When applicable, the person’s legal representative will be given the opportunity to participate with or for the person in the development of the plan.
          </p>
          <p>
            The interdisciplinary team will document the review of the plan at least annually, using an individual assessment, as required in MN Statutes, section 245D.071, subd. 3, and any reports of abuse relating to the person. The plan shall be revised to reflect the results of this review.
          </p>
        `,
        type: "html",
      },

      {
        title:
          "Signatures of those reviewing and/or participating in the development of this plan",
        type: "html",
      },

      {
        title: "",
        type: "text",
        options: [
          {
            title: "Name",
            show: true,
          },

          {
            title: "Signature",
            show: true,
          },

          {
            title: "Title",
            show: true,
          },

          {
            title: "Date",
            show: false,
          },
        ],
      },

      {
        title: "",
        type: "text",
        options: [
          {
            title: "Name",
            show: true,
          },

          {
            title: "Signature",
            show: true,
          },

          {
            title: "Title",
            show: true,
          },

          {
            title: "Date",
            show: false,
          },
        ],
      },

      {
        title: "",
        type: "text",
        options: [
          {
            title: "Name",
            show: true,
          },

          {
            title: "Signature",
            show: true,
          },

          {
            title: "Title",
            show: true,
          },

          {
            title: "Date",
            show: false,
          },
        ],
      },

      {
        title: "",
        type: "text",
        options: [
          {
            title: "Name",
            show: true,
          },

          {
            title: "Signature",
            show: true,
          },

          {
            title: "Title",
            show: true,
          },

          {
            title: "Date",
            show: false,
          },
        ],
      },

      // {
      //   title: "",
      //   type: "text",
      //   options: [
      //     {
      //       title: "",
      //       show: true,
      //     },

      //     {
      //       title: "",
      //       show: true,
      //     },

      //     {
      //       title: "Program Representative",
      //       show: false,
      //     },

      //     {
      //       title: "",
      //       show: true,
      //     },
      //   ],
      // },

      // {
      //   title: "",
      //   type: "text",
      //   options: [
      //     {
      //       title: "",
      //       show: true,
      //     },

      //     {
      //       title: "",
      //       show: true,
      //     },

      //     {
      //       title: "",
      //       show: false,
      //     },

      //     {
      //       title: "",
      //       show: true,
      //     },
      //   ],
      // },

      // {
      //   title: "",
      //   type: "text",
      //   options: [
      //     {
      //       title: "",
      //       show: true,
      //     },

      //     {
      //       title: "",
      //       show: true,
      //     },

      //     {
      //       title: "",
      //       show: false,
      //     },

      //     {
      //       title: "",
      //       show: true,
      //     },
      //   ],
      // },

      // {
      //   title: "",
      //   type: "text",
      //   options: [
      //     {
      //       title: "",
      //       show: true,
      //     },

      //     {
      //       title: "",
      //       show: true,
      //     },

      //     {
      //       title: "",
      //       show: false,
      //     },

      //     {
      //       title: "",
      //       show: true,
      //     },
      //   ],
      // },
    ],
  },

  POLICYORIENTATIONRECEIPT: {
    title: " POLICY ORIENTATION RECEIPT",
    questions: [
      {
        title: "Name: ",
        type: "text",
      },

      {
        title: "Date of admission:",
        type: "text",
      },

      {
        title:
          "  <p> The following review of and information regarding policies and procedures and associated documents will be completed by the Designated Coordinator and/or Designated Manager with the person and/or legal representative and case manager.  Copies will be provided of those policies and procedures that affect the person’s service-related and protection-related rights. Copies of other policies and procedures are available upon request.   </p> <p> Orientation to the following items will be completed in a manner that facilitates understanding by the person and/or legal representative and case manager.  </p> <p> Within 24 hours of admission or for persons who would benefit from a later orientation (and that reason can be documented), the orientation may take place within 72 hours:  </p>",
        type: "html",
      },

      {
        title:
          " <ol><li>Policy and Procedure on Reporting of Maltreatment of Vulnerable Adults. </li> <li>Program Abuse Prevention Plan, if applicable. </li>   </ol> ",
        type: "html",
      },

      {
        title: "",
        type: "text",
        options: [
          {
            title: "Person served and/or legal representative signature",
          },

          {
            title: "Date ",
          },

          {
            title: "Case manager signature  ",
          },

          {
            title: "Date:",
          },

          {
            title:
              "It is possible that orientation to these two documents could be delayed if the person would benefit from a later orientation.  As applicable, the documented reason for delay was",
          },
        ],
      },

      {
        title:
          "<h3>Within five (5) working days of service initiation: </h3>  <ol><li>Rights of Persons Served  </li> <li>Policy and Procedure on Reporting of Maltreatment of Minors </li> <li>Policy and Procedure on Grievances.  </li> <li>Policy and Procedure on Data Privacy.  </li> <li>Policy and Procedure on Temporary Service Suspension.   </li>  <li>Policy and Procedure on Temporary Service Suspension.   </li><li>Policy and Procedure on Temporary Service Suspension.   </li><li>Policy and Procedure on Temporary Service Suspension.   </li>  </ol> ",
        type: "html",
      },

      {
        title: "Acknowledgements:",
        type: "checkbox",
        options: [
          {
            title:
              "I have received a copy of the policies and procedures that affect service-related and protection-related rights including a copy of the Rights of Persons Served.",
            show: false,
          },

          {
            title: "Yes ",
            show: true,
          },

          {
            title: "No",
            show: true,
          },
        ],
      },

      {
        title: "",
        type: "checkbox",
        options: [
          {
            title:
              "These policies and procedures and rights have been explained to me in a manner in which I understand.",
            show: false,
          },

          {
            title: "Yes ",
            show: true,
          },

          {
            title: "No",
            show: true,
          },
        ],
      },

      {
        title: "",
        type: "checkbox",
        options: [
          {
            title:
              "I have received orientation to the Program Abuse Prevention Plan, if applicable, and I understand a copy is available upon my request.    ",
            show: false,
          },

          {
            title: "Yes ",
            show: true,
          },

          {
            title: "No",
            show: true,
          },
        ],
      },

      {
        title: "Person served and/or legal representative signature",
        type: "text",
      },

      {
        title: "Date",
        type: "date",
      },

      {
        title: "Case manager signature",
        type: "text",
      },

      {
        title: "Date",
        type: "date",
      },
    ],
  },

  ResidencyAgreement: {
    title:
      "Residency Agreement Template for Foster Care and Supported Living Services (SLS) under the BI, CAC, CADI and DD waivers",
    questions: [
      {
        title: "Name",
        type: "text",
      },

      {
        title:
          "<b> Instructions </b> <p> Landlords/providers must have a written agreement with people who live in homes and receive foster care and supported living services (when provided in a licensed setting). You can use this sample residency agreement to document that people have been informed of and agree to the process the landlord/provider follows before ending services/housing. </p>",
        type: "html",
      },

      {
        title:
          "<p>Once signed and completed:</p>  <ul><li>The person and legal representative must receive a copy  </li> <li>The provider/landlord must maintain a copy in the person’s record. </li></ul>",
        type: "html",
      },

      {
        title: "Agreement",
        type: "text",
        options: [
          {
            title: "This residency agreement is between you",
            show: true,
          },
          {
            title: "Enter guardians name",
            show: true,
          },

          {
            title: "Landlord/provider",
            show: true,
          },

          {
            title: "Located at",
            show: true,
          },
        ],
      },

      {
        title: "NOTE",
        type: "checkbox",
        options: [
          {
            title: "Are your own guardian?",
            show: false,
          },
          {
            title: "Yes",
            show: true,
          },

          {
            title: "No",
            show: true,
          },
        ],
      },

      {
        title:
          "Type of home and community-based service provided by the landlord/provider",
        type: "html",
      },

      {
        title: `
          <p><strong>(Place an X in the blank space if applicable)</strong></p>
          <p>____ Foster care in a licensed program, including family or corporate child foster care residence, a family or corporate adult foster care residence or a community residential setting facility</p>
          <p>____ Supported living services (SLS) in a licensed program, including family or corporate child foster care residence, a family or corporate adult foster care home, a community residential setting or a supervised living facility</p>
        `,
        type: "html",
      },

      {
        title: `
          <h3>When you end a residency agreement</h3>
        `,
        type: "html",
      },

      {
        title:
          "<p>If you choose to move:</p>  <ul><li>You should work with your case manager to plan your move. Your case manager will help you talk to your landlord and tell them about your plans.   </li> <li>Your landlord/provider will support you to move to another place and ensure a coordinated transition to your new provider.  </li></ul>",
        type: "html",
      },

      {
        title: `
          <h3>When your landlord/provider ends a residency agreement</h3>
        `,
        type: "html",
      },

      {
        title: `
          <p>If your landlord/provider determines that they no longer can provide foster care or supported living services to you, you will be required to move. If this happens, you will receive advance notice and have the right to appeal the decision. The following will occur if your services are terminated:</p>
        `,
        type: "html",
      },

      {
        title: `
          <ul>
            <li>The landlord/provider will notify you or your legal representative, as defined by 245D.02, subd.12, and your case manager in writing of the intended service termination.</li>
            <li>The notice will be provided at least 60 days before the proposed effective date of service termination.</li>
            <li>The written notice of a proposed service termination will include all of the following elements:
              <ul>
                <li>The reason for the action</li>
                <li>A summary of measures taken to minimize or eliminate the need for service termination, and why these measures failed to prevent the termination (this element will not be required when service termination is a result of the program ceasing operation)</li>
                <li>Your right to appeal the termination of services under Minnesota Statutes, section 256.045, subdivision 3, paragraph (a)</li>
                <li>Your right to seek a temporary order staying the termination of services according to the procedures in section 256.045, subdivision 4a or 6, paragraph (c)</li>
              </ul>
            </li>
            <li>The written notice of a proposed service termination, including those situations which began with a temporary service suspension, will be given at least 60 days before termination. This notice can be given at the same time as a notice of temporary service termination.</li>
            <li>The program must follow their grievance policy, temporary service suspension policy, service termination policy and Minnesota Statutes, section 245D.10, subdivisions 2, 3, and 3a. (You were provided copies of the policies when your services began, but you can ask for a copy of the policies at any time).</li>
          </ul>
        `,
        type: "html",
      },

      {
        title: "Signatures",
        type: "text",
        options: [
          {
            title: "Persons signature",
            show: true,
          },
          {
            title: "Date",
            show: false,
          },

          {
            title: "Legal representative’s signature",
            show: true,
          },
          {
            title: "Date",
            show: false,
          },

          {
            title: "Program representative’s signature",
            show: true,
          },
          {
            title: "Date",
            show: false,
          },
        ],
      },
    ],
  },
};

export default FormList;
