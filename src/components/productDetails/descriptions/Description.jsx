import React from "react";

export default function Description({ product }) {
  console.log("Product in Description:", product);
  return (
    <>
      {" "}
      <div className="right">
        <div className="letter-1 text-btn-uppercase mb_12">
          {product.longDescription}
        </div>
      </div>
    </>
  );
}
