import React from "react";
import ProductsCards6 from "../productCards/ProductsCards6";
import Pagination from "../common/Pagination";
import { Link } from "react-router-dom";

export default function Listview({ products }) {
  return (
      <>
        {products.map((product, index) => (
            <div key={index} className="product-item">
              {/* Link către pagina de detaliu a produsului */}
              <Link to={`/product-detail/${product.id}`}>
                <ProductCard1 product={product} gridClass="list" />
              </Link>
            </div>
        ))}
      </>
  );
}

