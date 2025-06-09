import AdminDashboardLayout from "@/compoments/admin-layout";
import React from "react";
import { ReactNode } from "react";

function layout({ children }: { children: ReactNode }) {
  return (
    <>
      <AdminDashboardLayout>{children}</AdminDashboardLayout>
    </>
  );
}

export default layout;
