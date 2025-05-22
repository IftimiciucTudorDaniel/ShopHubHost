import { useContextElement } from "@/context/Context";
import { products41 } from "@/data/products";

import React, { useState } from "react";
import QuantitySelect from "./QuantitySelect";
import SizeSelect2 from "./SideSelect2";

export default function ProductStikyBottom({product}) {
  const {
    addProductToCart,
    cartProducts,
    updateQuantity,
  } = useContextElement();
  const [quantity, setQuantity] = useState(1);

  return (
    <div className="tf-sticky-btn-atc">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <form
              className="form-sticky-atc"
              onSubmit={(e) => e.preventDefault()}
            >
              <div className="tf-sticky-atc-product">
                <div className="image">
                  <img
                    className="lazyload"
                    alt=""
                    src={products41[2].imgSrc}
                    width={600}
                    height={800}
                  />
                </div>
                <div className="content">
                  <div className="text-title">{products41[2].title}</div>
                  <div className="text-caption-1 text-secondary-2">
                    Green, XS, Cotton
                  </div>
                  <div className="text-title">
                    ${products41[2].price.toFixed(2)}
                  </div>
                </div>
              </div>
              <div className="tf-sticky-atc-infos">
                <SizeSelect2 />
                <div className="tf-sticky-atc-quantity d-flex gap-12 align-items-center">
                  <div className="tf-sticky-atc-infos-title text-title">
                    Quantity:
                  </div>
                </div>
                <div className="tf-sticky-atc-btns">
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
