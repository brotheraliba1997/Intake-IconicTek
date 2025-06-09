"use client";


import FormPage from "@/compoments/form/page";

function page() {
  // const tabsList = ["15 days", "1 Months", "6 Months", "1 year"];

  // const [tabs, setTabs] = useState<any>("15 days");

  return (
    <>
      {/* <ul className="nav nav-pills mb-3 " id="pills-tab" role="tablist">
        {tabsList.map((items, index) => (
          <>
            <li key={index} className="nav-item border " role="presentation">
              <button
                onClick={() => setTabs(items)}
                className={`nav-link  ${items === tabs ? "active" : ""} `}
              >
                {items}
              </button>
            </li>
          </>
        ))}
      </ul>

      <div>
        {tabs === "15 days" ? (
          <FormPage />
        ) : tabs === "1 Months" ? (
          <FormPage />
        ) : tabs === "6 Months" ? (
          <FormPage />
        ) : tabs === "1 year" ? (
          <FormPage />
        ) : null}
      </div> */}

      <FormPage />
    </>
  );
}

export default page;
