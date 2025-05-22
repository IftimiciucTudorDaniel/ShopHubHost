import React, { useEffect, useState } from "react";
import Slider1 from "../sliders/Slider1";
import ColorSelect from "../ColorSelect";
import SizeSelect from "../SizeSelect";
import { useContextElement } from "@/context/Context";
import ProductStikyBottom from "../ProductStikyBottom";
export default function Details1({ product }) {
  const [activeColor, setActiveColor] = useState("gray");
  const [hours, setHours] = useState(null);
  const [sold, setSold] = useState(null);

  const {
    addToWishlist,
    isAddedtoWishlist,
    addToCompareItem,
  } = useContextElement();

  useEffect(() => {
    const generateAndSaveValues = () => {
      const storedTime = localStorage.getItem("lastUpdate");
      const currentTime = new Date().getTime();

      if (!storedTime || currentTime - storedTime > 259200000) {
        const newSold = Math.floor(Math.random() * 20) + 1;
        const newHours = Math.floor(Math.random() * 20) + 1;

        localStorage.setItem("lastUpdate", currentTime);
        localStorage.setItem("sold", newSold);
        localStorage.setItem("hours", newHours);

        setSold(newSold);
        setHours(newHours);
      } else {
        setSold(localStorage.getItem("sold"));
        setHours(localStorage.getItem("hours"));
      }
    };
    generateAndSaveValues();
  }, []);

  const imageObjects = [product.imageUrl, product.imageUrl2, product.imageUrl3]
      .filter(Boolean)
      .map((url, index) => ({
        id: index + 1,
        src: url,
        width: 800,
        height: 1000,
        color: "gray",
        alt: `Product image ${index + 1}`,
      }));


  return (
    <section className="flat-spacing">
      <div className="tf-main-product section-image-zoom">
        <div className="container">
          <div className="row">
            {/* Product default */}
            <div className="col-md-6">
              <div className="tf-product-media-wrap sticky-top">
                <Slider1
                    setActiveColor={setActiveColor}
                    activeColor={activeColor}
                    firstItem={imageObjects[0].src}
                    slideItems={imageObjects}
                />
              </div>
            </div>
            {/* /Product default */}
            {/* tf-product-info-list */}
            <div className="col-md-6">
              <div className="tf-product-info-wrap position-relative mw-100p-hidden ">
                <div className="tf-zoom-main" />
                <div className="tf-product-info-list other-image-zoom">
                  <div className="tf-product-info-heading">
                    <div className="tf-product-info-name">
                      <div className="text text-btn-uppercase">Clothing</div>
                      <h3 className="name">{product.title}</h3>
                      <div className="sub">
                        {/*<div className="tf-product-info-rate">*/}
                        {/*  /!*<div className="list-star">*!/*/}
                        {/*  /!*  <i className="icon icon-star" />*!/*/}
                        {/*  /!*  <i className="icon icon-star" />*!/*/}
                        {/*  /!*  <i className="icon icon-star" />*!/*/}
                        {/*  /!*  <i className="icon icon-star" />*!/*/}
                        {/*  /!*  <i className="icon icon-star" />*!/*/}
                        {/*  /!*</div>*!/*/}
                        {/*  /!*<div className="text text-caption-1">*!/*/}
                        {/*  /!*  (134 reviews)*!/*/}
                        {/*  /!*</div>*!/*/}
                        {/*</div>*/}
                        <div className="tf-product-info-sold">
                          <i className="icon icon-lightning" />
                          <div className="text text-caption-1">
                            {sold}&nbsp;sold in last&nbsp;{hours}&nbsp;hours
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="tf-product-info-desc">
                      <div className="tf-product-info-price">
                        <h5 className="price-on-sale font-2">
                          {" "}
                          {product.price.toString()} Ron
                        </h5>
                        {product.oldPrice ? (
                          <>
                            <div className="compare-at-price font-2">
                              {" "}
                              ${product.oldPrice.toString()}
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
                        The garments labelled as Committed are products that
                        have been produced using sustainable fibres or
                        processes, reducing their environmental impact.
                      </p>
                      <div className="tf-product-info-liveview">
                        <i className="icon icon-eye" />
                        <p className="text-caption-1">
                          <span className="liveview-count">{Math.floor(Math.random() * 20) + 1}</span> people are
                          viewing this right now
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="tf-product-info-choose-option">
                    <ColorSelect
                      setActiveColor={setActiveColor}
                      activeColor={activeColor}
                    />
                    <SizeSelect />
                    <div>
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
                          onClick={() => addToWishlist(product.id)}
                          className="box-icon hover-tooltip text-caption-2 wishlist btn-icon-action"
                        >
                          <span className="icon icon-heart" />
                          <span className="tooltip text-caption-2">
                            {isAddedtoWishlist(product.id)
                              ? "Already Wishlished"
                              : "Wishlist"}
                          </span>
                        </a>
                      </div>
                      <a
                          href={product.affLink} className="btn-style-3 text-btn-uppercase" target="_blank" rel="noopener noreferrer">
                        Buy it now
                      </a>
                    </div>
                    {/*<div className="tf-product-info-help">*/}
                    {/*  <div className="tf-product-info-extra-link">*/}
                    {/*    <a*/}
                    {/*      href="#delivery_return"*/}
                    {/*      data-bs-toggle="modal"*/}
                    {/*      className="tf-product-extra-icon"*/}
                    {/*    >*/}
                    {/*      <div className="icon">*/}
                    {/*        <i className="icon-shipping" />*/}
                    {/*      </div>*/}
                    {/*      <p className="text-caption-1">*/}
                    {/*        Delivery &amp; Return*/}
                    {/*      </p>*/}
                    {/*    </a>*/}
                    {/*    <a*/}
                    {/*      href="#ask_question"*/}
                    {/*      data-bs-toggle="modal"*/}
                    {/*      className="tf-product-extra-icon"*/}
                    {/*    >*/}
                    {/*      <div className="icon">*/}
                    {/*        <i className="icon-question" />*/}
                    {/*      </div>*/}
                    {/*      <p className="text-caption-1">Ask A Question</p>*/}
                    {/*    </a>*/}
                    {/*    <a*/}
                    {/*      href="#share_social"*/}
                    {/*      data-bs-toggle="modal"*/}
                    {/*      className="tf-product-extra-icon"*/}
                    {/*    >*/}
                    {/*      <div className="icon">*/}
                    {/*        <i className="icon-share" />*/}
                    {/*      </div>*/}
                    {/*      <p className="text-caption-1">Share</p>*/}
                    {/*    </a>*/}
                    {/*  </div>*/}
                    {/*  <div className="tf-product-info-time">*/}
                    {/*    <div className="icon">*/}
                    {/*      <i className="icon-timer" />*/}
                    {/*    </div>*/}
                    {/*    <p className="text-caption-1">*/}
                    {/*      Estimated Delivery:&nbsp;&nbsp;<span>12-26 days</span>*/}
                    {/*      (International), <span>3-6 days</span> (United States)*/}
                    {/*    </p>*/}
                    {/*  </div>*/}
                    {/*  <div className="tf-product-info-return">*/}
                    {/*    <div className="icon">*/}
                    {/*      <i className="icon-arrowClockwise" />*/}
                    {/*    </div>*/}
                    {/*    <p className="text-caption-1">*/}
                    {/*      Return within <span>45 days</span> of purchase. Duties*/}
                    {/*      &amp; taxes are non-refundable.*/}
                    {/*    </p>*/}
                    {/*  </div>*/}
                    {/*  <div className="dropdown dropdown-store-location">*/}
                    {/*    <div*/}
                    {/*      className="dropdown-title dropdown-backdrop"*/}
                    {/*      data-bs-toggle="dropdown"*/}
                    {/*      aria-haspopup="true"*/}
                    {/*    >*/}
                    {/*      <div className="tf-product-info-view link">*/}
                    {/*        <div className="icon">*/}
                    {/*          <i className="icon-map-pin" />*/}
                    {/*        </div>*/}
                    {/*        <span>View Store Information</span>*/}
                    {/*      </div>*/}
                    {/*    </div>*/}
                    {/*    <div className="dropdown-menu dropdown-menu-end">*/}
                    {/*      <div className="dropdown-content">*/}
                    {/*        <div className="dropdown-content-heading">*/}
                    {/*          <h5>Store Location</h5>*/}
                    {/*          <i className="icon icon-close" />*/}
                    {/*        </div>*/}
                    {/*        <div className="line-bt" />*/}
                    {/*        <div>*/}
                    {/*          <h6>Fashion Modave</h6>*/}
                    {/*          <p>Pickup available. Usually ready in 24 hours</p>*/}
                    {/*        </div>*/}
                    {/*        <div>*/}
                    {/*          <p>766 Rosalinda Forges Suite 044,</p>*/}
                    {/*          <p>Gracielahaven, Oregon</p>*/}
                    {/*        </div>*/}
                    {/*      </div>*/}
                    {/*    </div>*/}
                    {/*  </div>*/}
                    {/*</div>*/}
                    <ul className="tf-product-info-sku">
                      <li>
                        <p className="text-caption-1">Brand: {product.brands}</p>
                      </li>
                      <li>
                        <p className="text-caption-1">Color: {product.color}</p>
                      </li>
                      <li>
                        <p className="text-caption-1">Available:</p>
                        <p className="text-caption-1 text-1">Instock</p>
                      </li>
                      <li>
                        <p className="text-caption-1">Categories:</p>
                        <p className="text-caption-1">
                          <p className="text-caption-1">{product.category}</p>
                        </p>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            {/* /tf-product-info-list */}
          </div>
        </div>
      </div>
      {/*<ProductStikyBottom />*/}
    </section>
  );
}
