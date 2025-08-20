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
  const [imageObjects, setImageObjects] = useState([]);
  const [isLoadingImages, setIsLoadingImages] = useState(true);

  const {
    addToWishlist,
    isAddedtoWishlist,
    addToCompareItem,
  } = useContextElement();

  // Helper function to check image size
  const checkImageSize = (url) => {
    return new Promise((resolve) => {
      if (!url) {
        resolve(false);
        return;
      }

      const img = new Image();
      img.onload = () => {
        // Consider images larger than 1x1 and with reasonable minimum size as valid
        resolve(img.width > 1 && img.height > 1 && img.width >= 50 && img.height >= 50);
      };
      img.onerror = () => resolve(false);
      img.src = url;
    });
  };

  // Process and filter images
  useEffect(() => {
    const checkImagesAndSetState = async () => {
      setIsLoadingImages(true);

      const validImageUrls = [];
      const imageUrls = [product.imageUrl, product.imageUrl2, product.imageUrl3]
          .filter(Boolean);

      for (const url of imageUrls) {
        const isValid = await checkImageSize(url);
        if (isValid) {
          validImageUrls.push(url);
        }
      }

      // If no valid images found, you might want to add a placeholder
      if (validImageUrls.length === 0 && imageUrls.length > 0) {
        // Use the first available image as fallback (even if it might be 1x1)
        validImageUrls.push(imageUrls[0]);
      }

      const validImageObjects = validImageUrls.map((url, index) => ({
        id: index + 1,
        src: url,
        width: 800,
        height: 1000,
        color: "gray",
        alt: `Product image ${index + 1}`,
      }));

      setImageObjects(validImageObjects);
      setIsLoadingImages(false);
    };

    if (product.imageUrl || product.imageUrl2 || product.imageUrl3) {
      checkImagesAndSetState();
    } else {
      setIsLoadingImages(false);
    }
  }, [product.imageUrl, product.imageUrl2, product.imageUrl3]);

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

  return (
      <section className="flat-spacing">
        <div className="tf-main-product section-image-zoom">
          <div className="container">
            <div className="row">
              {/* Product default */}
              <div className="col-md-6">
                <div className="tf-product-media-wrap sticky-top">
                  {isLoadingImages ? (
                      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '400px' }}>
                        <div className="text-center">
                          <div className="spinner-border" role="status">
                            <span className="visually-hidden">Loading...</span>
                          </div>
                          <p className="mt-2">Loading images...</p>
                        </div>
                      </div>
                  ) : imageObjects.length > 0 ? (
                      <Slider1
                          setActiveColor={setActiveColor}
                          activeColor={activeColor}
                          firstItem={imageObjects[0]?.src}
                          slideItems={imageObjects}
                      />
                  ) : (
                      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '400px', backgroundColor: '#f8f9fa' }}>
                        <div className="text-center">
                          <i className="icon-image" style={{ fontSize: '48px', color: '#ccc' }}></i>
                          <p className="mt-2 text-muted">No images available</p>
                        </div>
                      </div>
                  )}
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
                              onClick={() => addToWishlist(product)}
                              className="box-icon hover-tooltip text-caption-2 wishlist btn-icon-action"
                          >
                            <span className="icon icon-heart" />
                            <span className="tooltip text-caption-2">
                            {isAddedtoWishlist(product)
                                ? "Already Wishlished"
                                : "Wishlist"}
                          </span>
                          </a>
                        </div>
                        <a
                            href={product.affLink}
                            className="btn-style-3 text-btn-uppercase"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                          Buy it now
                        </a>
                      </div>
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
      </section>
  );
}