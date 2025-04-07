import React from "react";

function Sidebar() {
  return (
    <div className="sidebar" id="sidebar">
      <div className="sidebar-inner slimscroll">
        <div id="sidebar-menu" className="sidebar-menu">
          <ul>
            <li className="active">
              <a href="index.html">
                <i data-feather="home" /> <span>Dashboard</span>
              </a>
            </li>
            <li>
              <a href="client.html">
                <i data-feather="users" /> <span>Client</span>
              </a>
            </li>
            <li>
              <a href="Companies.html">
                <i data-feather="briefcase" /> <span>Companies</span>
              </a>
            </li>
            <li>
              <a href="plan.html">
                <i data-feather="clipboard" /> <span>Plan</span>
              </a>
            </li>
            <li>
              <a href="#">
                <i data-feather="calendar" /> <span>Subscription</span>
              </a>
            </li>
            <li>
              <a href="#">
                <i data-feather="settings" /> <span> Setting</span>
              </a>
            </li>
            <li>
              <a href="login.html">
                <i data-feather="log-out" /> <span>Sign Out</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
