import React, { useState, useEffect } from "react";
import { loadCart, cartEmpty } from "./helper/cartHelper";
import { Link } from "react-router-dom";
import { getmeToken, processPayment } from "./helper/paymentBhelper";
import { createOrder } from "./helper/orderHelper";
import DropIn from "braintree-web-drop-in-react";
import { isAutheticated } from "../auth/helper";

const PaymentB = ({ products, setReload = (f) => f, reload = undefined }) => {
  const [info, setInfo] = useState({
    loading: false,
    success: false,
    clientToken: null,
    error: "",
    instance: {},
  });
  const userId = isAutheticated() && isAutheticated().user._id;
  const token = isAutheticated() && isAutheticated().token;

  const getToken = (userId, token) => {
    getmeToken(userId, token).then((info) => {
      // console.log("INFO", info);

      if (info.error) {
        setInfo({ ...info, error: info.error });
      } else {
        const clientToken = info.clientToken;
        setInfo({ clientToken });
      }
    });
  };

  const showbtDropIn = () => {
    return (
      <div>
        {info.clientToken !== null && products.length > 0 ? (
          <div>
            <DropIn
              options={{ authorization: info.clientToken }}
              onInstance={(instance) => (info.instance = instance)}
            />
            <button className="btn  btn-success btn-block" onClick={onPurchase}>
              Buy
            </button>
          </div>
        ) : (
          <h3>Please Login or Add something to cart</h3>
        )}
      </div>
    );
  };

  const onPurchase = () => {
    setInfo({ loading: true });
    let nonce;
    let getNounce = info.instance.requestPaymentMethod().then((data) => {
      nonce = data.nonce;
      const paymentData = {
        paymentMethodNonce: nonce,
        amount: getAmount(),
      };
      processPayment(userId, token, paymentData)
        .then((response) => {
          setInfo({ ...info, success: response.success, loading: false });
          console.log("Payment Successfull");
          const orderData = {
            products: products,
            amount: response.transaction.amount,
            transaction_id: response.transaction.id,
          };
          createOrder(userId, token, orderData);
          cartEmpty(() => {
            console.log("Cart Cleared");
          });
          setReload(!reload);
        })
        .catch((err) => {
          console.log("Payment Failed");
          setInfo({ loading: false, success: false });
        });
    });
  };
  const getAmount = () => {
    let amount = 0;
    products.map((p) => {
      amount = amount + p.price;
    });
    return amount;
  };

  useEffect(() => {
    getToken(userId, token);
  }, []);

  return (
    <div>
      <h3>Your Bill is {getAmount()}</h3>
      {showbtDropIn()}
    </div>
  );
};

export default PaymentB;
