import React, { useState, useEffect } from "react";
import Base from "../core/Base";
import { getOrderDetails, updateOrderStatus } from "./helper/adminapicall";
import { isAutheticated } from "../auth/helper";
const OrderDetail = ({ match }) => {
  const [order, setOrder] = useState({
    user: "",
    products: [],
  });
  const [popup, setPopup] = useState(false);
  const [status, setStatus] = useState("");
  const { user, token } = isAutheticated();
  const preload = (orderId) => {
    getOrderDetails(user._id, orderId, token)
      .then((data) => {
        if (data.error) {
          console.log(data.error);
        } else {
          setOrder(data);
        }
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    preload(match.params.orderId);
  }, []);

  const updateStatus = (params) => {
    //
  };

  const handleChange = (event) => {
    setStatus(event.target.value);
  };
  const onSubmit = (event) => {
    event.preventDefault();

    updateOrderStatus(order._id, user._id, token, { status }).then((data) => {
      if (data.error) {
        console.log(data.error);

        // setValues({ ...values, error: data.error });
      } else {
        setPopup(!popup);
        setStatus("");
        preload(match.params.orderId);
      }
    });
  };
  const popUpInput = () => {
    setPopup(!popup);
  };

  return (
    <Base
      title="Order Details"
      description="Provide all details about the product"
    >
      <div>
        <h5 className="text-white text-left">
          Transaction Id: {order.transaction_id}
        </h5>
        <div>
          <h5 className="text-left">User Details:</h5>
          <h6 className="text-left">Id : {order.user._id}</h6>
          <h6 className="text-left">Name : {order.user.name}</h6>
        </div>
        <div>
          <h5 className="text-white text-left">Prdoduct Details</h5>
          <div className="row text-left">
            <div className="col-1"></div>
            <div className="col-4">
              <h6>Product Id</h6>
            </div>
            <div className="col-3">
              <h6>Name</h6>
            </div>
            <div className="col-2">
              <h6>Price</h6>
            </div>
            <div className="col-1">
              <h6>Qty</h6>
            </div>
          </div>
          {order.products.map((prod, i) => {
            return (
              <div key={i} className="row text-left">
                <span className="col-1">{i + 1}</span>
                <span className="col-4">{prod._id}</span>
                <span className="col-3">{prod.name}</span>
                <span className="col-2">{prod.price}</span>
                <span className="col-1">{prod.count}</span>
              </div>
            );
          })}
          <h4></h4>
          <h4></h4>
        </div>
        <h5 className="text-left text-white">Amount : ${order.amount}</h5>
        <h5 className="text-left text-white">Status : {order.status}</h5>
        {!popup && (
          <button className="btn btn-success" onClick={popUpInput}>
            Update Status
          </button>
        )}
        {popup && (
          <form>
            <div className="form-group">
              <select
                onChange={handleChange}
                className="form-control"
                placeholder="Status"
              >
                <option hidden>Select</option>

                <option value="Recieved">Recieved</option>
                <option value="Processing">Processing</option>
                <option value="Shipped">Shipped</option>
                <option value="Delivered">Delivered</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </div>
            <button
              type="submit"
              onClick={onSubmit}
              className="btn btn-outline-success mb-3 mr-3"
            >
              Done
            </button>
            <button
              type="submit"
              onClick={popUpInput}
              className="btn btn-outline-danger mb-3 ml-3"
            >
              Cancel
            </button>
          </form>
        )}
      </div>
    </Base>
  );
};

export default OrderDetail;
