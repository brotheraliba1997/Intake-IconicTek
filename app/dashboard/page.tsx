import AdminDashboardLayout from "@/compoments/admin-layout";
import StatusCard from "@/compoments/status-card/page";
import DynamicTable from "@/compoments/table-new";
import React from "react";

function AdminDashboardPage() {
  return (
    <>
      <StatusCard />
      <DynamicTable />
    </>
  );
}

export default AdminDashboardPage;
