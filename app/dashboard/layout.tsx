import AdminDashboardLayout from "@/compoments/admin-layout";
import React from "react";

function layout({ children }: any) {
  return (
    <>
      <AdminDashboardLayout>{children}</AdminDashboardLayout>
    </>
  );
}

export default layout;
