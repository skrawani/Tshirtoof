import React, { useState, useEffect } from "react";
import Base from "../core/Base";
import { Link } from "react-router-dom";
import { isAutheticated } from "../auth/helper";
import { getOrders } from "./helper/adminapicall";

const Orders = () => {
  const [orders, setOrders] = useState([]);

  const { user, token } = isAutheticated();

  const preload = () => {
    getOrders(user._id, token)
      .then((data) => {
        // console.log(data);
        if (data.error) {
          console.log(data.error);
        } else {
          setOrders(data);
        }
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    preload();
  }, []);

  return (
    <Base title="Welcome admin" description="Manage products here">
      <h2 className="mb-4">All Orders:</h2>
      <Link className="btn btn-info" to={`/admin/dashboard`}>
        <span className="">Admin Home</span>
      </Link>
      <div className="row">
        <div className="col-12">
          <h2 className="text-center text-white my-3">
            Total {orders.length} orders
          </h2>
          <div className="row text-center mb-2">
            <div className="col-3">
              <h3 className="text-white text-left">Created At</h3>
            </div>
            <div className="col-3">
              <h3 className="text-white text-left">Transaction Id</h3>
            </div>
            <div className="col-2">
              <h3 className="text-white text-center">Amount</h3>
            </div>
            <div className="col-3">
              <h3 className="text-white text-left">Status</h3>
            </div>
            <div className="col-2">
              <h3 className="text-white text-left"></h3>
            </div>
          </div>
          {orders.map((order, index) => (
            <div key={index} className="row text-center mb-2 ">
              <div className="col-3">
                {console.log(order)}
                <h6 className="text-white text-left">{order.createdAt}</h6>
              </div>

              <div className="col-3">
                {console.log(order)}
                <h6 className="text-white text-left">{order.transaction_id}</h6>
              </div>

              <div className="col-2">
                <h6 className="text-white text-center"> ₹ {order.amount}</h6>
              </div>
              <div className="col-2">
                <h6 className="text-white text-left">{order.status}</h6>
              </div>
              <div className="col-2">
                <Link
                  className="btn btn-success"
                  to={`/admin/order/details/${order._id}`}
                >
                  <span className="">More Details</span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Base>
  );
};

export default Orders;
