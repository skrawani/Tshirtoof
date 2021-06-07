import React from "react";
import { API } from "../../backend";
const ImageHelper = ({ product }) => {
  // console.log(product);
  const imageUrl = product.photo;
  return (
    <div className="rounded px-2">
      <img
        src={imageUrl}
        alt="photo"
        style={{ height: "10rem", maxWidth: "100%" }}
        className="mb-3 rounded"
      />
    </div>
  );
};

export default ImageHelper;
