import React from "react";

export default function Listview({ products }) {
  return (
      <>
        {products.map((product, index) => (
            <div key={index} className="product-item">
                <ProductCard1 product={product} gridClass="list" />
            </div>
        ))}
      </>
  );
}

