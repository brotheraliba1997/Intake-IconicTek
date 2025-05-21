 <div className="card p-5">
        <h3 className="card-title text-center">{dataGet?.title}</h3>

        <div className="row pt-3">
          {question?.map((items: any, index: any) => {
            if (
              items?.question?.type === "text" ||
              items?.question?.type === "date"
            ) {
              return (
                <div key={index} className="col-lg-6 my-3">
                  {items?.question?.type !== "html" && (
                    <HtmlRenderer items={items} />
                  )}

                  <input
                    type={items?.question?.type}
                    className="form-control"
                    placeholder="Enter..."
                    onChange={(e: any) => handleChange(e, items?.id)}
                  />
                </div>
              );
            }

            return null;
          })}
        </div>

        {question?.map((items: any, index: any) => (
          <div
            key={index}
            className="d-flex mb-2 justify-content-between w-100 align-items-center"
          >
            <div>
              {items?.question?.type === "html" && (
                <>
                  <HtmlRenderer items={items} />
                </>
              )}

              {items?.question?.type === "table" && (
                <>
                  {/* Table Title */}
                  {items?.title && (
                    <p className="text-left">{items?.question.title}</p>
                  )}

                  <table className="table table-bordered my-5">
                    <thead></thead>

                    <tbody>
                      {items?.question?.SubQuestion &&
                        items?.question?.SubQuestion.length > 0 &&
                        items?.question?.SubQuestion.map(
                          (subquestion: any, i: number) => (
                            <tr key={i}>
                              <td colSpan={items?.coloum?.length || 1}>
                                <SubquestionChecbox
                                  subquestion={subquestion}
                                  index={i}
                                  onChange={(e, optionId, isMultiple) =>
                                    handleChange(
                                      e,
                                      items?.id,
                                      optionId,
                                      isMultiple,
                                      subquestion.type,
                                      subquestion?.id
                                    )
                                  }
                                />
                              </td>
                            </tr>
                          )
                        )}
                    </tbody>
                  </table>
                </>
              )}

              {/* {items?.id} */}

              <div className="row mt-5">
                {items?.question?.SubQuestion?.filter(
                  (sub: any) => sub.type === "date" || sub.type === "Signature"
                )
                  ?.sort((a: any, b: any) => a.arrangement - b.arrangement)
                  ?.map((sub: any, i: any) => (
                    <div className="col-lg-6 mb-5" key={i}>
                      <h6>{sub.title}</h6>

                      {sub.type === "Signature" ? (
                        <ESignature
                          signatureValue={signatureValue}
                          items={sub.id}
                        />
                      ) : sub.type === "date" ? (
                        <input
                          type="date"
                          className="form-control mb-3"
                          placeholder="Enter..."
                          onChange={(e) =>
                            handleChange(
                              e,
                              items?.id,
                              null,
                              false,
                              items?.question?.type,
                              sub?.id
                            )
                          }
                        />
                      ) : null}
                    </div>
                  ))}
              </div>
            </div>
          </div>
        ))}

        <div className="mt-5 d-flex flex-column gap-4">
          <div className="d-flex justify-content-between mt-4 pb-5">
            <button
              className="btn btn-secondary"
              onClick={handleBack}
              disabled={currentStep === 1}
            >
              Back
            </button>
            {currentStep <= 8 ? (
              <button className="btn btn-primary" onClick={handleSubmit}>
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
      </div>