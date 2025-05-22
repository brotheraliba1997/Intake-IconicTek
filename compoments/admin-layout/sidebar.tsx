"use client";
import { MenuItemType } from "@/types/common";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import { FiHome } from "react-icons/fi";
import { BsPerson } from "react-icons/bs";
import { FaSuitcase } from "react-icons/fa";
import { FaCalendar } from "react-icons/fa";
import { FaRegClipboard } from "react-icons/fa6";
import { IoSettingsOutline } from "react-icons/io5";
import { FiLogOut } from "react-icons/fi";
import { FaWpforms } from "react-icons/fa6";
import MenuItem from "./menu";

function Sidebar() {
  const {
    data: { user },
  }: any = useSession();

  const [openSubMenu, setOpenSubMenu] = useState(null);

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
    { label: "Dashboard", path: "/dashboard", icons: <IoSettingsOutline /> },
    // { label: "Chats", path: "/dashboard/chats", icons: <IoSettingsOutline /> },
    // {
    //   label: "Clients",
    //   path: "/dashboard/clients",
    //   icons: <IoSettingsOutline />,
    // },f

    { label: "Intake", path: "/dashboard/intake", icons: <FaWpforms /> },

    {
      label: "User",
      path: "/dashboard/users",
      icons: <BsPerson />,
    },

    {
      label: "Setting",
      path: "#",
      icons: <BsPerson />,
      subItems: [
        {
          label: "My Company",
          path: "/dashboard/companies/my-company",
          icons: <FaSuitcase />,
        },
      ],
    },

    // {
    //   label: "Devices",
    //   path: "/dashboard/devices",
    //   icons: <IoSettingsOutline />,
    // },

    // {
    //   label: "Doctors",
    //   path: "/dashboard/doctors",
    //   icons: <IoSettingsOutline />,
    // },
    // {
    //   label: "Services",
    //   path: "/dashboard/services",
    //   icons: <IoSettingsOutline />,
    // },

    // {
    //   label: "GPS Tracking",
    //   path: "/dashboard/tracking",
    //   icons: <IoSettingsOutline />,
    // },
    // {
    //   label: "Subscriptions",
    //   path: "/dashboard/subscriptions",
    //   icons: <IoSettingsOutline />,
    // },
    // {
    //   label: "Meetings",
    //   path: "/dashboard/meetings",
    //   icons: <IoSettingsOutline />,
    // },

    // {
    //   label: "Payments",
    //   path: "/dashboard/payments",
    //   icons: <IoSettingsOutline />,
    // },
    // {
    //   label: "Settings",
    //   path: "/dashboard/payment",
    //   icons: <IoSettingsOutline />,
    // },
  ];

  const doctorMenuItems = [
    { label: "Dashboard", path: "/dashboard", icons: <IoSettingsOutline /> },
    { label: "Chats", path: "/dashboard/chats", icons: <IoSettingsOutline /> },

    {
      label: "Clients",
      path: "/dashboard/clients",
      icons: <IoSettingsOutline />,
    },
    {
      label: "Meetings",
      path: "/dashboard/meetings",
      icons: <IoSettingsOutline />,
    },
    {
      label: "Medication schedule",
      path: "/dashboard/medication-schedule",
      icons: <IoSettingsOutline />,
    },
    {
      label: "Appointment",
      path: "/dashboard/appointment",
      icons: <IoSettingsOutline />,
    },
  ];

  const clientMenuItems = [
    { label: "Dashboard", path: "/dashboard", icons: <IoSettingsOutline /> },
    { label: "Chats", path: "/dashboard/chats", icons: <IoSettingsOutline /> },

    {
      label: "Meetings",
      path: "/dashboard/meetings",
      icons: <IoSettingsOutline />,
    },
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
            {menuItems.map((item: any, index) => (
              <MenuItem item={item} key={index} />
            ))}

            <li
              className="cursor-pointer "
              style={{ marginLeft: "10px" }}
              onClick={signoutHandler}
            >
              <Link href="/login" className="pt-2">
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
