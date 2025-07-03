import React, { useState } from "react";
import ColorSelect from "../productDetails/ColorSelect";
import Grid5 from "../productDetails/grids/Grid5";
import { useContextElement } from "@/context/Context";
import QuantitySelect from "../productDetails/QuantitySelect";
export default function QuickView() {
  const [activeColor, setActiveColor] = useState("gray");
  const [quantity, setQuantity] = useState(1); // Initial quantity is
  const {
    quickViewItem,
    addProductToCart,
    addToWishlist,
    isAddedtoWishlist,
  } = useContextElement();
  if (!quickViewItem) return null;
  const openModalSizeChoice = () => {
    const bootstrap = require("bootstrap"); // dynamically import bootstrap
    var myModal = new bootstrap.Modal(document.getElementById("size-guide"), {
      keyboard: false,
    });

    myModal.show();
    document
        .getElementById("size-guide")
        .addEventListener("hidden.bs.modal", () => {
          myModal.hide();
        });
    const backdrops = document.querySelectorAll(".modal-backdrop");
    if (backdrops.length > 1) {
      // Apply z-index to the last backdrop
      const lastBackdrop = backdrops[backdrops.length - 1];
      lastBackdrop.style.zIndex = "1057";
    }
  };
  return (
      <div className="modal fullRight fade modal-quick-view" id="quickView">
        <div className="modal-dialog">
          <div className="modal-content">
            <Grid5
                firstItem={quickViewItem.imageUrl1}
            />
            <div className="wrap mw-100p-hidden">
              <div className="header">
                <h5 className="title">Quick View</h5>
                <span
                    className="icon-close icon-close-popup"
                    data-bs-dismiss="modal"
                />
              </div>
              <div className="tf-product-info-list">
                <div className="tf-product-info-heading">
                  <div className="tf-product-info-name">
                    <div className="text text-btn-uppercase">Clothing</div>
                    <h3 className="name">{quickViewItem.title}</h3>
                    <div className="sub">
                      <div className="tf-product-info-rate">
                        <div className="list-star">
                          <i className="icon icon-star" />
                          <i className="icon icon-star" />
                          <i className="icon icon-star" />
                          <i className="icon icon-star" />
                          <i className="icon icon-star" />
                        </div>
                        <div className="text text-caption-1">(134 reviews)</div>
                      </div>
                      <div className="tf-product-info-sold">
                        <i className="icon icon-lightning" />
                        <div className="text text-caption-1">
                          18&nbsp;sold in last&nbsp;32&nbsp;hours
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="tf-product-info-desc">
                    <div className="tf-product-info-price">
                      <h5 className="price-on-sale font-2">
                        {quickViewItem.price} Ron
                      </h5>
                      {quickViewItem.oldPrice ? (
                          <>
                            <div className="compare-at-price font-2">
                              {" "}
                              ${quickViewItem.oldPrice}
                            </div>
                            <div className="badges-on-sale text-btn-uppercase">
                              -25%
                            </div>
                          </>
                      ) : (
                          ""
                      )}
                    </div>
                    <p>
                      {quickViewItem.longDescription}
                    </p>
                    <div className="tf-product-info-liveview">
                      <i className="icon icon-eye" />
                      <p className="text-caption-1">
                        <span className="liveview-count">2</span> oamenii vizionează acest produs chiar acum
                      </p>
                    </div>
                  </div>
                </div>
                <div className="tf-product-info-choose-option">
                  <div className="tf-product-info-by-btn mb_10">
                    <a
                        href="#size-guide"
                        data-bs-toggle="modal"
                        className="btn-style-2 flex-grow-1 text-btn-uppercase fw-6 size-guide"
                    >
                        <span>
                          Size Guide
                        </span>
                    </a>
                    <a
                        onClick={() => addToWishlist(quickViewItem.id)}
                        className="box-icon hover-tooltip text-caption-2 wishlist btn-icon-action"
                    >
                      <span className="icon icon-heart" />
                      <span className="tooltip text-caption-2">
                      {isAddedtoWishlist(quickViewItem.id)
                          ? "Already Wishlished"
                          : "Wishlist"}
                    </span>
                    </a>
                  </div>
                  <div className="mt-0">
                    <a
                        href={quickViewItem.affLink} className="btn-style-3 text-btn-uppercase" target="_blank" rel="noopener noreferrer">
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
