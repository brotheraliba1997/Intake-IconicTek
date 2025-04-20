import React from 'react'

function FallbackComponent() {
  return (
    <div className="empty">
                <div className="file">
                  <i className="fal fa-file-alt" />
                </div>
                <div className="form-info">
                  <h2>hamza</h2>3 Questions
                </div>
                <div className="clearfix" />
                <h3>Common things you can do here:</h3>
                <ul className="">
                  <li ng-hide="isNote">
                    <a>Show me how to use this page</a>
                  </li>
                  <li>
                    <a>Add a new Question</a>
                  </li>
                  <li>
                    <a
                    // ng-href="/#/template/67f67591a26f0a6a73fff420"
                    // href="/#/template/67f67591a26f0a6a73fff420"
                    >
                      Add existing questions from our library
                    </a>
                  </li>
                  <li>
                    <a>Send intake form to a client</a>
                  </li>
                  <li>
                    <a
                      target="_blank"
                      // href="/preview?id=67f67591a26f0a6a73fff420"
                    >
                      Preview this intake form
                    </a>
                  </li>
                  <li>
                    <a
                      target="_blank"
                      // href="/export/pdf/67f67591a26f0a6a73fff420"
                    >
                      Print this intake form
                    </a>
                  </li>
                </ul>
                {/**/}
                <div ng-if="!whitelabel">
                  <h3>How to:</h3>
                  <ul className="">
                    <li ng-hide="isNote">
                      <a
                        target="_blank"
                        // href="http://support.intakeq.com/how-do-i-send-an-intake-form-to-a-client/"
                      >
                        Send an intake form to a client
                      </a>
                    </li>
                    <li ng-hide="isNote">
                      <a
                        target="_blank"
                        // href="http://support.intakeq.com/how-to-add-an-intake-form-to-your-website/"
                      >
                        Integrate IntakeQ with your website
                      </a>
                    </li>
                    <li ng-hide="isNote">
                      <a
                        target="_blank"
                        // href="https://intakeq.com/intake-form-ipad"
                      >
                        Use it on your iPad
                      </a>
                    </li>
                    <li>
                      <a
                        // href="https://support.intakeq.com/category/4-intake-forms"
                        target="_blank"
                      >
                        See all Form articles
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
  )
}

export default FallbackComponent
