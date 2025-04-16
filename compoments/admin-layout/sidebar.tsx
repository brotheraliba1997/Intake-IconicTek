"use client";
import { MenuItemType } from "@/types/common";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { FiHome } from "react-icons/fi";
import { BsPerson } from "react-icons/bs";
import { FaSuitcase } from "react-icons/fa";
import { FaCalendar } from "react-icons/fa";
import { FaRegClipboard } from "react-icons/fa6";
import { IoSettingsOutline } from "react-icons/io5";
import { FiLogOut } from "react-icons/fi";

function Sidebar() {
  const {
    data: { user },
  }: any = useSession();

  const pathname = usePathname();

  const superAdminMenuItems = [
    { label: "Dashboard", path: "/dashboard", icons: <FiHome /> },

    { label: "Companies", path: "/dashboard/companies", icons: <FaSuitcase /> },
    { label: "Plan", path: "/dashboard/plan", icons: <FaRegClipboard /> },
    { label: "User", path: "/dashboard/users", icons: <BsPerson /> },
    // { label: "Subcription",  },
    { label: "Subcription", path: "#", icons: <FaCalendar /> },
    { label: "Setting", path: "#", icons: <IoSettingsOutline /> },
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
    { label: "Settings", path: "/dashboard/payment" },
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
            {menuItems.map((item: MenuItemType) => (
              <li
                key={item.path}
                className={`cursor-pointer ${
                  pathname === item.path ? "active" : ""
                }`}
              >
                <Link href={item.path}>
                  {item.icons && item.icons} <span>{item.label}</span>
                </Link>
              </li>
            ))}

            <li className="cursor-pointer" onClick={signoutHandler}>
              <Link href="/login">
                <FiLogOut /> <span>Sign Out</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
