"use client";
import Image from "next/image";
import React, { useState } from "react";
import logo from "@/public/img/logo.png";
import logosmall from "@/public/img/logo-small.png";
import avatar from "@/public/img/avatar-12.jpg";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { IoMdNotificationsOutline } from "react-icons/io";

function Header() {
  const {
    data: { user },
  }: any = useSession();

  const [notificationOpen, setNotificationOpen] = useState<boolean | undefined>(
    false
  );
  const [dropDownOpen, setDropDownOpen] = useState<boolean | undefined>(false);

  const signoutHandler = () => {
    signOut();
  };

  return (
    <div className="header header-one">
      <div className="header-left header-left-one">
        <Link href="/dashboard" className="logo">
          <Image
            src={logo}
            alt="Logo"
            width={100}
            height={100}
            objectFit="contain"
          />
        </Link>

        <Image
          src={logosmall}
          alt="Logo"
          width={30}
          height={30}
          objectFit="contain"
        />
      </div>
      <a href="javascript:void(0);" id="toggle_btn">
        <i className="fas fa-bars" />
      </a>
      <div className="top-nav-search">
        <form>
          <input
            type="text"
            className="form-control"
            placeholder="Search here"
          />
          <button className="btn" type="submit">
            <i className="fas fa-search" />
          </button>
        </form>
      </div>
      <a className="mobile_btn" id="mobile_btn">
        <i className="fas fa-bars" />
      </a>
      <ul className="nav nav-tabs user-menu">
        <li className="nav-item dropdown">
          <a
            href="#"
            className="dropdown-toggle nav-link"
            data-bs-toggle="dropdown"
          >
            <IoMdNotificationsOutline
              onClick={() => setNotificationOpen(!notificationOpen)}
            />
            <span className="badge rounded-pill">5</span>
          </a>
          <div
            className={`dropdown-menu notifications ${
              notificationOpen ? "show" : ""
            } `}
            style={{ right: 0 }}
          >
            <div className="topnav-dropdown-header">
              <span className="notification-title">Notifications</span>
              <a href="javascript:void(0)" className="clear-noti">
                {" "}
                Clear All
              </a>
            </div>
            <div className="noti-content">
              <ul className="notification-list">
                <li className="notification-message">
                  <a href="#">
                    <div className="media d-flex">
                      <span className="avatar avatar-sm">
                        <Image
                          src={avatar}
                          alt="Logo"
                          width={30}
                          height={30}
                          objectFit="contain"
                        />
                      </span>
                      <div className="media-body">
                        <p className="noti-details">
                          <span className="noti-title">Brian Johnson</span>
                          paid the invoice{" "}
                          <span className="noti-title">#DF65485</span>
                        </p>
                        <p className="noti-time">
                          <span className="notification-time">4 mins ago</span>
                        </p>
                      </div>
                    </div>
                  </a>
                </li>
                <li className="notification-message">
                  <a href="#">
                    <div className="media d-flex">
                      <span className="avatar avatar-sm">
                        {/* <img
                          className="avatar-img rounded-circle"
                          alt=""
                          src="assets/img/profiles/avatar-03.jpg"
                        /> */}
                      </span>
                      <div className="media-body">
                        <p className="noti-details">
                          <span className="noti-title">Marie Canales</span>
                          has accepted your estimate{" "}
                          <span className="noti-title">#GTR458789</span>
                        </p>
                        <p className="noti-time">
                          <span className="notification-time">6 mins ago</span>
                        </p>
                      </div>
                    </div>
                  </a>
                </li>
                <li className="notification-message">
                  <a href="#">
                    <div className="media d-flex">
                      <div className="avatar avatar-sm">
                        <span className="avatar-title rounded-circle bg-primary-light">
                          <i className="far fa-user" />
                        </span>
                      </div>
                      <div className="media-body">
                        <p className="noti-details">
                          <span className="noti-title">
                            New user registered
                          </span>
                        </p>
                        <p className="noti-time">
                          <span className="notification-time">8 mins ago</span>
                        </p>
                      </div>
                    </div>
                  </a>
                </li>
                <li className="notification-message">
                  <a href="#">
                    <div className="media d-flex">
                      <span className="avatar avatar-sm">
                        {/* <img
                          className="avatar-img rounded-circle"
                          alt=""
                          src="assets/img/profiles/avatar-04.jpg"
                        /> */}
                      </span>
                      <div className="media-body">
                        <p className="noti-details">
                          <span className="noti-title">Barbara Moore</span>
                          declined the invoice{" "}
                          <span className="noti-title">#RDW026896</span>
                        </p>
                        <p className="noti-time">
                          <span className="notification-time">12 mins ago</span>
                        </p>
                      </div>
                    </div>
                  </a>
                </li>
                <li className="notification-message">
                  <a href="#">
                    <div className="media d-flex">
                      <div className="avatar avatar-sm">
                        <span className="avatar-title rounded-circle bg-info-light">
                          <i className="far fa-comment" />
                        </span>
                      </div>
                      <div className="media-body">
                        <p className="noti-details">
                          <span className="noti-title">
                            You have received a new message
                          </span>
                        </p>
                        <p className="noti-time">
                          <span className="notification-time">2 days ago</span>
                        </p>
                      </div>
                    </div>
                  </a>
                </li>
              </ul>
            </div>
            <div className="topnav-dropdown-footer">
              <a href="#">View all Notifications</a>
            </div>
          </div>
        </li>
        <li
          className="nav-item dropdown has-arrow main-drop"
          onClick={() => setDropDownOpen(!dropDownOpen)}
        >
          <a
            href="#"
            className={`dropdown-toggle nav-link ${dropDownOpen ? "show" : ""}`}
            data-bs-toggle="dropdown"
          >
            <span className="user-img">
              <Image
                src={logosmall}
                alt="Logo"
                width={30}
                height={30}
                objectFit="contain"
              />

              <span className="status online" />
            </span>
            <span> {user.role} </span>
          </a>
          <div className={`dropdown-menu ${dropDownOpen ? "show" : ""}`}>
            <a className="dropdown-item" href="#">
              <i data-feather="settings" className="me-1" />
              Settings
            </a>
            <div className="dropdown-item" onClick={signoutHandler}>
              <i data-feather="log-out" className="me-1" />
              Logout
            </div>
          </div>
        </li>
      </ul>
    </div>
  );
}

export default Header;
