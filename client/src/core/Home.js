import React, { useState, useEffect } from "react";
import "../styles.css";
import Base from "./Base";
import Card from "./Card";
import { getProducts } from "./helper/coreapicalls";
import logo from "../assets/logo.png";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(false);

  const loadAllProducts = () => {
    getProducts()
      .then((data) => {
        if (data.error) {
          setError(data.error);
        } else {
          setProducts(data);
        }
      })
      .catch();
  };

  useEffect(() => {
    loadAllProducts();
  }, []);

  return (
    <Base>
      <img src={logo} style={{ width: "10rem" }} />
      <p className="lead mt-2">Welcome to Tshirtoof</p>
      <div className="row text-center">
        <h3 className="text-white mb-4">Featured T-shirts</h3>
        <div className="row d-flex justify-content-center ml-5">
          {products.map((prod, index) => {
            return (
              <div key={index} className="col-12 mb-4 col-sm-3 col-md-3  ">
                <Card product={prod} />
              </div>
            );
          })}
        </div>
      </div>
    </Base>
  );
}
