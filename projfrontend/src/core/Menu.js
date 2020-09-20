import React, { Fragment, useEffect, useState, useContext } from "react";
import {
  BrowserRouter as Router,
  withRouter,
  Route,
  Link,
} from "react-router-dom";
import { signout, isAutheticated } from "../auth/helper";

import { LocalMall, AccountCircleRounded } from "@material-ui/icons";
import { Badge } from "@material-ui/core";
import { CartCountContext } from "../CartCountContext";

const currentTab = (history, path) => {
  if (history.location.pathname === path) {
    return { color: "#2ecc72", backgroundColor: "transparent" };
  } else {
    return { color: "#FFFFFF" };
  }
};

function Menu({ history }) {
  const [isOpen, setIsOpen] = useState("");
  const { cartCount } = useContext(CartCountContext);
  const toggleOpen = () => setIsOpen(!isOpen);
  const menuClass = `dropdown-menu${isOpen ? " show" : ""} dropdown-menu-right`;
  return (
    <div>
      <ul
        className="nav nav-tabs bg-dark"
        style={{
          display: "flex",
          flexDirection: "row",
        }}
      >
        <li className="nav-item">
          <Link style={currentTab(history, "/")} className="nav-link" to="/">
            Home
          </Link>
        </li>

        {isAutheticated() && isAutheticated().user.role === 1 && (
          <li className="nav-item">
            <Link
              style={currentTab(history, "/admin/dashboard")}
              className="nav-link"
              to="/admin/dashboard"
            >
              A. Dashboard
            </Link>
          </li>
        )}

        <li className="nav-item" style={{ marginLeft: "auto" }}>
          <Link
            style={currentTab(history, "/cart")}
            className="nav-link"
            to="/cart"
          >
            <Badge badgeContent={cartCount} color="primary">
              <LocalMall />
            </Badge>
          </Link>
        </li>

        {isAutheticated() && (
          <div className="dropdown " onClick={toggleOpen}>
            <Link
              style={currentTab(history, "/user/dashboard")}
              className="nav-link"
              to="#"
            >
              <AccountCircleRounded />
            </Link>
            <div className={menuClass}>
              <li className="nav-item">
                <Link className="nav-link text-dark" to="/user/dashboard">
                  Dashboard
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link text-danger"
                  onClick={() => {
                    signout(() => {
                      history.push("/");
                    });
                  }}
                  to="#"
                >
                  Sign Out
                </Link>
              </li>
            </div>
          </div>
        )}
        {!isAutheticated() && (
          <Fragment>
            <li className="nav-item">
              <Link
                style={currentTab(history, "/signup")}
                className="nav-link"
                to="/signup"
              >
                Sign Up
              </Link>
            </li>
          </Fragment>
        )}
      </ul>
    </div>
  );
}

export default withRouter(Menu);
