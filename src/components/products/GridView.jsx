import React from "react";
import ProductCard1 from "../productCards/ProductCard1";
import { Link } from "react-router-dom";
import {slugify} from "@/utlis/slugify.js";

export default function GridView({ products, pagination = true }) {
  return (
      <>
        {products.map((product, index) => (
            <div key={index} className="product-item">
              {/* Link către pagina de detaliu a produsului */}
                <ProductCard1 product={product} gridClass="grid" />
            </div>
        ))}
      </>
  );
}