import Link from "next/link";
import React from "react";

function Sidebar() {
  return (
    <div className="sidebar" id="sidebar">
      <div className="sidebar-inner slimscroll">
        <div id="sidebar-menu" className="sidebar-menu">
          <ul>
            <li className="active">
              <Link href="/dasboard">
                <i data-feather="home" /> <span>Dashboard</span>
              </Link>
            </li>
            <li>
              <Link href="/dashboard/client">
                <i data-feather="users" /> <span>Client</span>
              </Link>
            </li>
            <li>
              <Link href="/dashboard/companies">
                <i data-feather="briefcase" /> <span>Companies</span>
              </Link>
            </li>
            <li>
              <Link href="/dashboard/plan">
                <i data-feather="clipboard" /> <span>Plan</span>
              </Link>
            </li>
            <li>
              <Link href="#">
                <i data-feather="calendar" /> <span>Subscription</span>
              </Link>
            </li>
            <li>
              <Link href="#">
                <i data-feather="settings" /> <span> Setting</span>
              </Link>
            </li>
            <li>
              <Link href="/login">
                <i data-feather="log-out" /> <span>Sign Out</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
