import React, { useState, useEffect, Fragment, useContext } from "react";
import ImageHelper from "./helper/ImageHelper";
import { Redirect } from "react-router-dom";
import {
  addItemToCart,
  incDecItems,
  removeItemFromCart,
  cartCounter,
} from "./helper/cartHelper";
import { CartCountContext } from "../CartCountContext";

const Card = ({
  product,
  addtoCart = true,
  removeFromCart = false,
  setReload = (f) => f,
  reload = undefined,
}) => {
  const [redirect, setRedirect] = useState(false);

  const cardTitle = product ? product.name : "A photo from pexels";
  const cardDesc = product ? product.description : "Default Description";
  const cardPrice = product ? product.price : "DEFAULT";
  const { cartCount, setCartCount } = useContext(CartCountContext);

  useEffect(() => {
    setCartCount(cartCounter());
  }, []);

  const addToCart = () => {
    addItemToCart(product, () => setRedirect(true));
  };

  const getAredirect = () => {
    if (redirect) {
      return <Redirect to="/cart" />;
    }
  };
  const showAddToCart = (addtoCart) => {
    return (
      addtoCart && (
        <button
          onClick={() => {
            addToCart();
            setCartCount(cartCounter());
          }}
          className="btn btn-block btn-outline-success mt-2 mb-2"
        >
          Add to Cart
        </button>
      )
    );
  };

  const showRemoveFromCart = (removeFromCart) => {
    return (
      removeFromCart && (
        <button
          onClick={() => {
            removeItemFromCart(product._id);
            setCartCount(cartCounter());
            setReload(!reload);
          }}
          className="btn btn-block btn-outline-danger mt-2 mb-2"
        >
          Remove from cart
        </button>
      )
    );
  };

  const showCount = () => {
    return (
      removeFromCart && (
        <Fragment>
          <div className="col-12 col-sm-2 col-md-2 text-center">Count :</div>

          <div
            className="col-4 col-sm-1 col-md-1 text-center center  btn-warning rounded"
            onClick={() => {
              incDecItems(product._id, -1);
              setCartCount(cartCounter());
              setReload(!reload);
            }}
          >
            -
          </div>

          <div className="col-4 col-sm-1 col-md-1 text-center">
            {product.count}
          </div>
          <div
            className="col-4 col-sm-1 col-md-1 text-center  btn-warning rounded"
            onClick={() => {
              incDecItems(product._id, 1);
              setReload(!reload);
              setCartCount(cartCounter());
            }}
          >
            +
          </div>
        </Fragment>
      )
    );
  };

  return (
    <div className="card text-white bg-dark border border-light mb-2 ">
      <div className="card-header lead">{cardTitle}</div>
      <div className="card-body">
        <ImageHelper product={product} />
        <p className="lead font-weight-normal text-wrap mt-2 border-top border-success pt-1">
          {cardDesc}
        </p>
        <div className="row">
          <div className="col-sm-4 col-md-4 col-12 text-center">Price:</div>
          <div className="text-center  btn-success px-5 rounded">
            ₹{cardPrice}
          </div>
          {showCount()}
        </div>
        <div className="row">
          <div className="col-12 mt-1">{showAddToCart(addtoCart)}</div>
          <div className="col-12">{showRemoveFromCart(removeFromCart)}</div>
        </div>
      </div>
    </div>
  );
};

export default Card;
