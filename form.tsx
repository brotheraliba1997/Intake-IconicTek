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
              showCheckbox: false,
         
          },
          { title: "Yes ", showCheckbox: true},
          {
            title: "NO",
            showCheckbox: true
           
          },
          { title: "Does not have cash" , showCheckbox: true},
          {
            title:
              "If yes, please describe what procedures will be done to support the person including any limitation to amounts used:",
              showCheckbox: false
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
              showCheckbox: false,
          },
          {
            title: "Yes ",
            showCheckbox: true,
          },
          {
            title: "NO",
            showCheckbox: true,
           
          },
          {
            title: "Does not have a checking account",
            showCheckbox: true,
          },
          {
            title:
              "If yes, please describe what procedures will be done to support the person including specifics related to transactions, checkbook storage, assistance with writing checks, assistance with using debit card, access to online banking, with passwords/security questions, etc.: ",
              showCheckbox: false,
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
              showCheckbox: false,
          },
          {
            title: "Yes ",
            showCheckbox: true,
          },
          {
            title: "NO",
            showCheckbox: true,
           
          },
          {
            title: "Does not have a checking account",
            showCheckbox: true,
          },
          {
            title:
              "If yes, please describe what procedures will be done to support the person including specifics related to transactions, checkbook storage, assistance with writing checks, assistance with using debit card, access to online banking, with passwords/security questions, etc.: ",
              showCheckbox: false,
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
              showCheckbox: false,
          },
          {
            title: "Yes ",
            showCheckbox: true,
          },
          {
            title: "NO",
            showCheckbox: true,
           
          },
          {
            title: "Does not have a credit card(s)",
            showCheckbox: true,
          },
          {
            title:
              "If yes, please describe what procedures will be done to support the person including specifics as it relates to credit card use, assistance with receipt of and paying of credit card bills, access to online banking, with passwords/security questions, etc.",
              showCheckbox: false,
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
              showCheckbox: false,
          },
          {
            title: "Yes ",
            showCheckbox: true,
          },
          {
            title: "NO",
            showCheckbox: true,
            
          },
          {
            title: "Does not have gift cards",
            showCheckbox: true,
          },
          {
            title:
              "If yes, please describe what procedures will be done to support the person including specifics related to maintenance, tracking, and knowing the balance, etc. of gift cards:",
              showCheckbox: false,
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
            showCheckbox: true,

          },
          {
            title: "Semi-annual",
            showCheckbox: true,

          },
          {
            title: "Annual",
            showCheckbox: true,

          },
          {
            title: "Other (specify):",
            showCheckbox: true,

          },
        ],
      },

      {
        title: "Case Manager",
        type: "chexkbox",
        options: [
          {
            title: "N/A ",
            showCheckbox: true,

          },
          {
            title: "Semi-annual",
            showCheckbox: true,

          },
          {
            title: "Annual",
            showCheckbox: true,

          },
          {
            title: "Other (specify):",
            showCheckbox: true,

          },
        ],
      },

      {
        title: "Describe information to be sent:",
        type: "text",
        options: [
          {
            title: "Person/Legal representative",
            showCheckbox: true,
          },
          {
            title: "Case Manager",
            showCheckbox: true,
          },
        ],
      },

      {
        title: "Representative Payee",
        type: "checkbox",
        options: [
          {
            title: "Does the person have a representative payee?",
            showCheckbox: false,
          },
          {
            title: "Yes",
            showCheckbox: true,
          },

          {
            title: "No",
            showCheckbox: true,
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
            showCheckbox: true,
          },

          {
            title: "No",
            showCheckbox: true,
          },
        ],
      },

      {
        title: "If yes, include that persons contact information:",
        type: "text",
        options: [
          {
            title: "Does the person have a representative payee?",
          },
          {
            title: "Name",
            showCheckbox: true,
          },

          {
            title: "Address",
            showCheckbox: true,
          },

          {
            title: "Phone number:",
            showCheckbox: true,
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
  POLICYORIENTATION: {},
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
    title: "ADMISSION FORM AND DATA SHEET",
    questions: [
      {
        title:
          "<h4>MN Department of Human Services </h4> <h4>Office of Inspector General</h4> <h4>Licensing Division</h4> <h4>245D HCBS SAMPLE FORM </h4>",
        type: "html",
      },

      {
        title: "<h4>Individual Abuse Prevention Plan (IAPP) </h4>",
        type: "html",
      },

      {
        title:
          "<h4>Instructions and requirements: </h4>  <p> This program is required to establish and enforce ongoing written individual abuse prevention plans as required under Minnesota Statutes, section 626.557, subdivision 14 and section 245A.65, subdivision 2 (b).  </p> <p> Development and review of the plan:  An individual abuse prevention plan shall be developed for each new person as part of the initial individual program plan or service plan required under the applicable licensing rule. The review and evaluation of the individual abuse prevention plan shall be done as part of the review of the program plan or service plan. The person receiving services shall participate in the development of the individual abuse prevention plan to the full extent of the person's abilities. If applicable, the person's legal representative shall be given the opportunity to participate with or for the person in the development of the plan. The interdisciplinary team shall document the review of all abuse prevention plans at least annually, using the individual assessment and any reports of abuse relating to the person. The plan shall be revised to reflect the results of this review.  </p> <p> Plan contents:  The plan shall include a statement of measures that will be taken to minimize the risk of abuse to the vulnerable adult when the individual assessment required in section 626.557, subdivision 14, paragraph (b), indicates the need for measures in addition to the specific measures identified in the program abuse prevention plan. The measures shall include the specific actions the program will take to minimize the risk of abuse within the scope of the licensed services, and will identify referrals made when the vulnerable adult is susceptible to abuse outside the scope or control of the licensed services. When the assessment indicates that the vulnerable adult does not need specific risk reduction measures in addition to those identified in the program abuse prevention plan, the individual abuse prevention plan shall document this determination.   </p> <p> Requirements of 626.557, subd. 14(b):  Each facility, including a home health care agency and personal care attendant services providers, shall develop an individual abuse prevention plan for each vulnerable adult residing there or receiving services from them. The plan shall contain an individualized assessment of: (1) the person's susceptibility to abuse by other individuals, including other vulnerable adults; (2) the person's risk of abusing other vulnerable adults; and (3) statements of the specific measures to be taken to minimize the risk of abuse to that person and other vulnerable adults. For the purposes of this paragraph, the term abuse includes self-abuse.  </p> <p> Persons with history of violent crime an act of physical aggression toward others: If the program knows that the vulnerable adult has committed a violent crime or an act of physical aggression toward others, the individual abuse prevention plan must detail the measures to be taken to minimize the risk that the vulnerable adult might reasonably be expected to pose to visitors to the facility and persons outside the facility, if unsupervised. Under this section, a facility knows of a vulnerable adult's history of criminal misconduct or physical aggression if it receives such information from a law enforcement authority or through a medical record prepared by another facility, another health care provider, or the facility's ongoing assessments of the vulnerable adult. </p>",
        type: "html",
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

  POLICYORIENTATIONRECEIPT: {
    title: "ADMISSION FORM AND DATA SHEET",
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
          },

          {
            title: "Yes ",
          },

          {
            title: "No",
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
          },

          {
            title: "Yes ",
          },

          {
            title: "No",
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
          },

          {
            title: "Yes ",
          },

          {
            title: "No",
          },
        ],
      },

      {
        title: "",
        type: "text",
        options: [
          {
            title: "Person served and/or legal representative signature",
          },

          {
            title: "date",
          },
        ],
      },

      {
        title: "",
        type: "text",
        options: [
          {
            title: "Case manager signature",
          },

          {
            title: "date",
          },
        ],
      },
    ],
  },
};

export default FormList;
