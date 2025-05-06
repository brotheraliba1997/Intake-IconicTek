import { MenuItemType } from "@/types/common";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import { FaAngleDown, FaAngleRight } from "react-icons/fa6";

function MenuItem({ item }: { item: MenuItemType }) {
  const pathname = usePathname();

  const [activeSubmenu, setActiveSubmenu] = useState<boolean | null>(false);

  if (item.subItems) {
    return (
      <li className=" " onClick={() => setActiveSubmenu(!activeSubmenu)}>
        <Link href="#" className="">
          <span> {item.icons} </span>
          <span> {item.label} </span>

          <span className="my-2">
            {activeSubmenu ? (
              <FaAngleRight className="menu-arrow" />
            ) : (
              <FaAngleDown className="menu-arrow" />
            )}
          </span>
        </Link>
        <ul
          onClick={(e) => e.stopPropagation()}
          className={`${activeSubmenu ? "d-block" : "none"}`}
        >
          {item.subItems.map((subItem:any, index:any) => (
            <li key={index}>
              <div className=" d-flex justify-content-center gap-2 align-items-center">
                <Link href={subItem.path} className="d-flex gap-2"> 
                <p className="m-0 p-0"> {subItem.icons} </p>
                <p className="m-0 p-0">{subItem.label}</p>
                {/* {subItem.label} */}
                </Link>
              </div>
            </li>
          ))}
        </ul>
      </li>
    );
  } else {
    return (
      <li
        className={`cursor-pointer ${pathname === item.path ? "active" : ""}`}
      >
        <Link href={item.path}>
          <span> {item.icons} </span>
          <span>{item.label}</span>
        </Link>
      </li>
    );
  }
}

export default MenuItem;
