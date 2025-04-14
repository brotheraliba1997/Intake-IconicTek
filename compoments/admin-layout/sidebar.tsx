"use client";
import { MenuItemType } from "@/types/common";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

function Sidebar() {
  const {
    data: { user },
  }: any = useSession();

  const pathname = usePathname();

  const superAdminMenuItems = [
    { label: "Dashboard", path: "/dashboard" },

    { label: "Companies", path: "/dashboard/companies" },
    { label: "Plan", path: "/dashboard/plan" },
    { label: "Subcription", path: "/dashboard/subcription" },
    { label: "Setting", path: "/dashboard/setting" },
    
  ];

  const companyAdminMenuItems = [
    { label: "Dashboard", path: "/dashboard" },
    { label: "Chats", path: "/dashboard/chats" },
    { label: "Clients", path: "/dashboard/clients" },
    { label: "Devices", path: "/dashboard/devices" },

    { label: "Doctors", path: "/dashboard/doctors" },
    { label: "Services", path: "/dashboard/services" },

    { label: "GPS Tracking", path: "/dashboard/tracking" },
    { label: "Subscriptions", path: "/dashboard/subscriptions" },
    { label: "Meetings", path: "/dashboard/meetings" },

    { label: "Payments", path: "/dashboard/payments" },
    {label: "Settings", path: "/dashboard/payment"},
  ];

  const doctorMenuItems = [
    { label: "Dashboard", path: "/dashboard" },
    { label: "Chats", path: "/dashboard/chats" },

    { label: "Clients", path: "/dashboard/clients" },
    { label: "Meetings", path: "/dashboard/meetings" },
    { label: "Medication schedule", path: "/dashboard/medication-schedule" },
    { label: "Appointment", path: "/dashboard/appointment" },
  ];

  const clientMenuItems = [
    { label: "Dashboard", path: "/dashboard" },
    { label: "Chats", path: "/dashboard/chats" },

    { label: "Meetings", path: "/dashboard/meetings" },
  ];

  const signoutHandler = () => {
    signOut();
  };

  const menuItems =
    user.role == "super_admin"
      ? superAdminMenuItems
      : user.role == "admin"
      ? companyAdminMenuItems
      : user.role == "doctor"
      ? doctorMenuItems
      : clientMenuItems;

  return (
    <div className="sidebar" id="sidebar">
      <div className="sidebar-inner slimscroll">
        <div id="sidebar-menu" className="sidebar-menu">
          <ul>
            {menuItems.map((item: MenuItemType, index) => (
              <li
                className={`cursor-pointer ${
                  pathname === item.path ? "active" : ""
                }`}
              >
                <Link href={item?.path}>
                  <i data-feather="home" /> <span> {item?.label} </span>
                </Link>
              </li>
            ))}

            {/* <li>
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
            </li> */}
            <li className="cursor-pointer" onClick={signoutHandler}>
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
