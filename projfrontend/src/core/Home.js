import React, { useState, useEffect } from "react";
import "../styles.css";
import { API } from "../backend";
import Base from "./Base";
import Card from "./Card";
import { getProducts } from "./helper/coreapicalls";

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
    <Base title="Home Page" description="Welcome to Tshirtoof">
      <div className="row text-center">
        <h1 className="text-white">All of Tshirts</h1>
        <div className="row">
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
