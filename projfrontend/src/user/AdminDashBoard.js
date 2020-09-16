import React from "react";
import Base from "../core/Base";
import { isAutheticated } from "../auth/helper";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

const AdminDashboard = () => {
  const {
    user: { name, email, role },
  } = isAutheticated();

  const adminLeftSide = () => {
    return (
      <div className="card">
        <h4 className="card-header bg-dark text-white">Admin Navigation</h4>
        <ul className="list-group">
          <li className="list-group item">
            <Link to="/admin/create/category" className="nav-link text-success">
              Create Categories
            </Link>
          </li>
          <li className="list-group item">
            <Link to="/admin/categories" className="nav-link text-success">
              Manage Categories
            </Link>
          </li>
          <li className="list-group item">
            <Link to="/admin/create/product" className="nav-link text-success">
              Create product
            </Link>
          </li>
          <li className="list-group item">
            <Link to="/admin/products" className="nav-link text-success">
              Manage Product
            </Link>
          </li>
          <li className="list-group item">
            <Link to="/admin/orders" className="nav-link text-success">
              Manage Order
            </Link>
          </li>
        </ul>
      </div>
    );
  };
  const adminRightSide = () => {
    return (
      <div className="card mb-4 ">
        <h4 className="card-header text-dark">Admin Information</h4>
        <ul className="list-group">
          <li className="list-group-item text-dark">
            <span className="badge badge-success mr-2">Name:</span> {name}
          </li>
          <li className="list-group-item text-dark">
            <span className="badge badge-success mr-2">Email:</span> {email}
          </li>
          <li className="list-group-item text-dark">
            <span className="badge badge-danger">Admin Area</span>
          </li>
        </ul>
      </div>
    );
  };
  return (
    <Base
      title="Welcome Admin"
      description="Manage all of your producys here"
      className="container bg-success p-4"
    >
      <div className="row ">
        <div className="col-3 text-left">{adminLeftSide()}</div>
        <div className="col-9 text-left">{adminRightSide()}</div>
      </div>
    </Base>
  );
};

export default AdminDashboard;
