import React from "react";
import Header from "./Header";
import Sidebar from "./sidebar";

function AdminDashboardLayout({ children }: any) {
  return (
    <div className="main-wrapper">
      <Header />
      <Sidebar />

      <div className="page-wrapper">
        <div className="content container-fluid">{children}</div>
      </div>
    </div>
  );
}

export default AdminDashboardLayout;
