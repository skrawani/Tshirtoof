import React, { useState, useEffect } from "react";
import "../styles.css";
import { API } from "../backend";
import Base from "./Base";
import Card from "./Card";
import { loadCart } from "./helper/cartHelper";
import PaymentB from "./PaymentB";
import StripeCheckout from "./StripeCheckout";

const Cart = () => {
  const [products, setProducts] = useState([]);
  const [reload, setReload] = useState(false);
  const loadAllProducts = (products) => {
    return (
      <div>
        <h2>This is to load products</h2>
        {products.map((product, index) => (
          <Card
            key={index}
            product={product}
            addtoCart={false}
            removeFromCart={true}
            setReload={setReload}
            reload={reload}
          />
        ))}
      </div>
    );
  };

  useEffect(() => {
    setProducts(loadCart());
  }, [reload]);

  const loadCheckOut = () => {
    return (
      <div>
        <h2>This is for Checkout</h2>
      </div>
    );
  };

  return (
    <Base title="Cart Page" description="Ready to Checkout">
      <div className="row text-center">
        <div className="col-6">
          {products.length > 0 ? (
            loadAllProducts(products)
          ) : (
            <h3>No Products in cart</h3>
          )}
        </div>
        <div className="col-6">
          {products.length ? (
            <StripeCheckout products={products} setReload={setReload} />
          ) : (
            <h3> Please Add items in Cart</h3>
          )}
        </div>
        {/* <div className="col-6">
          <PaymentB products={products} setReload={setReload} />
        </div> */}
      </div>
    </Base>
  );
};

export default Cart;
