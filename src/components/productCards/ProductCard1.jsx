import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CountdownTimer from "../common/Countdown";
import { useContextElement } from "@/context/Context";
import { handleProductClickLocalLocal } from "@/utlis/analytics.js";
import { slugify } from "@/utlis/slugify.js";

export default function ProductCard1({ product, gridClass = "" }) {
    const {
        wishlist,
        addToWishlist,
        setQuickViewItem,
        isAddedtoWishlist,
    } = useContextElement();

    const [validImages, setValidImages] = useState({
        imageUrl1: null,
        imageUrl2: null,
        isLoading: true
    });

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

    // Validate images when component mounts or product changes
    useEffect(() => {
        const validateImages = async () => {
            const imageUrls = [product.imageUrl1, product.imageUrl2].filter(Boolean);
            const validatedImages = {
                imageUrl1: null,
                imageUrl2: null,
                isLoading: false
            };

            // Check each image
            for (const url of imageUrls) {
                const isValid = await checkImageSize(url);
                if (isValid) {
                    if (!validatedImages.imageUrl1) {
                        validatedImages.imageUrl1 = url;
                    } else if (!validatedImages.imageUrl2) {
                        validatedImages.imageUrl2 = url;
                    }
                }
            }

            // Fallback: if no valid images found but original images exist, use the first one
            if (!validatedImages.imageUrl1 && imageUrls.length > 0) {
                validatedImages.imageUrl1 = imageUrls[0];
            }

            setValidImages(validatedImages);
        };

        if (product.imageUrl1 || product.imageUrl2) {
            validateImages();
        } else {
            setValidImages({ imageUrl1: null, imageUrl2: null, isLoading: false });
        }
    }, [product.imageUrl1, product.imageUrl2]);

    return (
        <div
            className={`card-product wow fadeInUp ${gridClass} ${
                product.isOnSale ? "on-sale" : ""
            } ${product.sizes ? "card-product-size" : ""}`}
        >
            <div className="card-product-wrapper">
                <Link
                    to={`/detalii-produs/${slugify(product.title)}`}
                    className="product-img"
                    onClick={() => {
                        handleProductClickLocal(product.id);
                        handleProductClickLocal(product.id, product.title);
                    }}
                >
                    {validImages.isLoading ? (
                        // Loading placeholder
                        <div
                            className="d-flex justify-content-center align-items-center bg-light"
                            style={{ width: '100%', height: '400px' }}
                        >
                            <div className="spinner-border spinner-border-sm" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>
                        </div>
                    ) : validImages.imageUrl1 ? (
                        <>
                            <img
                                className="lazyload img-product"
                                src={validImages.imageUrl1}
                                alt={product.alt || product.title || "Product"}
                                width={600}
                                height={800}
                            />
                            {validImages.imageUrl2 && validImages.imageUrl2 !== validImages.imageUrl1 && (
                                <img
                                    className="lazyload img-hover"
                                    src={validImages.imageUrl2}
                                    alt={product.alt || product.title || "Product"}
                                    width={600}
                                    height={800}
                                />
                            )}
                        </>
                    ) : (
                        // No valid images placeholder
                        <div
                            className="d-flex justify-content-center align-items-center bg-light"
                            style={{ width: '100%', height: '400px' }}
                        >
                            <div className="text-center text-muted">
                                <i className="icon-image" style={{ fontSize: '48px' }}></i>
                                <p className="mt-2">No image</p>
                            </div>
                        </div>
                    )}
                </Link>

                <div className="list-product-btn">
                    <button
                        onClick={() => addToWishlist(product)}
                        className="box-icon wishlist btn-icon-action"
                    >
                        <span className="icon icon-heart" />
                        <span className="tooltip">
                            {isAddedtoWishlist(product) ? "Already Wishlisted" : "Wishlist"}
                        </span>
                    </button>

                    <a
                        href="#quickView"
                        onClick={() => setQuickViewItem(product)}
                        data-bs-toggle="modal"
                        className="box-icon quickview tf-btn-loading"
                    >
                        <span className="icon icon-eye" />
                        <span className="tooltip">Quick View</span>
                    </a>
                </div>
                <div className="list-btn-main">
                    <Link
                        to={product.affLink}
                        className="btn-main-product"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Buy Now
                    </Link>
                </div>
            </div>
            <div className="card-product-info">
                <Link
                    to={`/detalii-produs/${slugify(product.title)}`}
                    className="title link"
                    onClick={() => {
                        handleProductClickLocal(product.id);
                        handleProductClickLocal(product.id, product.title);
                    }}
                >
                    {product.title}
                </Link>
                <span className="price">{product.price} Ron</span>
            </div>
        </div>
    );
}