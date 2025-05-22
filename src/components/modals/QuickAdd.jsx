import { useContextElement } from "@/context/Context";
import { allProducts } from "@/data/products";

import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import ColorSelect from "../productDetails/ColorSelect";
import SizeSelect from "../productDetails/SizeSelect";
import QuantitySelect from "../productDetails/QuantitySelect";
export default function QuickAdd() {
  const [quantity, setQuantity] = useState(1);
  const {
    quickAddItem,
    addToWishlist,
    isAddedtoWishlist,
  } = useContextElement();
  const [item, setItem] = useState(allProducts[0]);
  useEffect(() => {
    const filtered = allProducts.filter((el) => el.id == quickAddItem);
    if (filtered) {
      setItem(filtered[0]);
    }
  }, [quickAddItem]);
  return (
      <div className="modal fade modal-quick-add" id="quickAdd">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="header">
            <span
                className="icon-close icon-close-popup"
                data-bs-dismiss="modal"
            />
            </div>
            <div>
              <div className="tf-product-info-list">
                <div className="tf-product-info-item">
                  <div className="image">
                    <img alt="" src={item.imgSrc} width={600} height={800} />
                  </div>
                  <div className="content">
                    <Link to={`/product-detail/${item.id}`}>{item.title}</Link>
                    <div className="tf-product-info-price">
                      <h5 className="price-on-sale font-2">
                        ${item.price.toFixed(2)}
                      </h5>
                      {item.oldPrice ? (
                          <>
                            <div className="compare-at-price font-2">
                              ${item.oldPrice.toFixed(2)}
                            </div>
                            <div className="badges-on-sale text-btn-uppercase">
                              -25%
                            </div>
                          </>
                      ) : (
                          ""
                      )}
                    </div>
                  </div>
                </div>
                <div className="tf-product-info-choose-option">
                  <ColorSelect />
                  <SizeSelect />
                  <div className="tf-product-info-quantity">
                    <div className="title mb_12">Quantity:</div>
                  </div>
                  <div>
                    <div className="tf-product-info-by-btn mb_10">

                      <a
                          onClick={() => addToWishlist(item.id)}
                          className="box-icon hover-tooltip text-caption-2 wishlist btn-icon-action"
                      >
                        <span className="icon icon-heart" />
                        <span className="tooltip text-caption-2">
                        {isAddedtoWishlist(item.id)
                            ? "Already Wishlished"
                            : "Wishlist"}
                      </span>
                      </a>
                    </div>
                    <a href="#" className="btn-style-3 text-btn-uppercase">
                      Buy it now
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
}
