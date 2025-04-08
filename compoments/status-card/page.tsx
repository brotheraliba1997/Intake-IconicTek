import React from "react";

function StatusCard() {
  return (
    <div className="row">
      <div className="col-xl-3 col-sm-6 col-12">
        <div className="card">
          <div className="card-body">
            <div className="dash-widget-header">
              <span className="dash-widget-icon bg-1">
                <i data-feather="users" className="text-warning" />
              </span>
              <div className="dash-count">
                <div className="dash-title">Total client</div>
                <div className="dash-counts">
                  <p>13</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="col-xl-3 col-sm-6 col-12">
        <div className="card">
          <div className="card-body">
            <div className="dash-widget-header">
              <span className="dash-widget-icon bg-2">
                <i data-feather="briefcase" className="text-info" />
              </span>
              <div className="dash-count">
                <div className="dash-title">Companies</div>
                <div className="dash-counts">
                  <p>12</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="col-xl-3 col-sm-6 col-12">
        <div className="card">
          <div className="card-body">
            <div className="dash-widget-header">
              <span className="dash-widget-icon bg-3">
                <i data-feather="wifi" className="text-success" />
              </span>
              <div className="dash-count">
                <div className="dash-title">Online Client</div>
                <div className="dash-counts">
                  <p>5</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="col-xl-3 col-sm-6 col-12">
        <div className="card">
          <div className="card-body">
            <div className="dash-widget-header">
              <span className="dash-widget-icon bg-4">
                <i data-feather="video" className="text-info" />
              </span>
              <div className="dash-count">
                <div className="dash-title">% of using video call</div>
                <div className="dash-counts">
                  <p>20%</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StatusCard;
