import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import CountdownTimer from "../common/Countdown";
import { useContextElement } from "@/context/Context";
import { handleProductClick, handleGlobalProductClick } from "@/utlis/analytics.js";

export default function ProductCard1({ product, gridClass = "" }) {
    const {
        wishlist,
        addToWishlist,
        setQuickViewItem,
        isAddedtoWishlist,
    } = useContextElement();

    return (
        <div
            className={`card-product wow fadeInUp ${gridClass} ${
                product.isOnSale ? "on-sale" : ""
            } ${product.sizes ? "card-product-size" : ""}`}>
            <div className="card-product-wrapper">
                <Link
                    to={`/product-detail/${product.id}`}
                    className="product-img"
                    onClick={() => {
                        handleProductClick(product.id);
                        handleGlobalProductClick(product.id, product.title);
                    }}
                >
                    <img
                        className="lazyload img-product"
                        src={product.imageUrl1}
                        alt={product.alt || product.title || "Product"}
                        width={600}
                        height={800}
                    />
                    {product.imageUrl2 && (
                        <img
                            className="lazyload img-hover"
                            src={product.imageUrl2}
                            alt={product.alt || product.title || "Product"}
                            width={600}
                            height={800}
                        />
                    )}
                </Link>

                {/*{product.hotSale && (*/}
                {/*    <div className="marquee-product bg-main">*/}
                {/*        {[...Array(2)].map((_, i) => (*/}
                {/*            <div key={i} className="marquee-wrapper">*/}
                {/*                <div className="initial-child-container">*/}
                {/*                    {[...Array(5)].map((_, j) => (*/}
                {/*                        <React.Fragment key={j}>*/}
                {/*                            <div className="marquee-child-item">*/}
                {/*                                <p className="font-2 text-btn-uppercase fw-6 text-white">*/}
                {/*                                    Hot Sale 25% OFF*/}
                {/*                                </p>*/}
                {/*                            </div>*/}
                {/*                            <div className="marquee-child-item">*/}
                {/*                                <span className="icon icon-lightning text-critical" />*/}
                {/*                            </div>*/}
                {/*                        </React.Fragment>*/}
                {/*                    ))}*/}
                {/*                </div>*/}
                {/*            </div>*/}
                {/*        ))}*/}
                {/*    </div>*/}
                {/*)}*/}

                {/*{product.isOnSale && product.salePercentage && (*/}
                {/*    <div className="on-sale-wrap">*/}
                {/*        <span className="on-sale-item">-{product.salePercentage}</span>*/}
                {/*    </div>*/}
                {/*)}*/}

                {/*{product.sizes && (*/}
                {/*    <div className="variant-wrap size-list">*/}
                {/*        <ul className="variant-box">*/}
                {/*            {product.sizes.map((size) => (*/}
                {/*                <li key={size} className="size-item">*/}
                {/*                    {size}*/}
                {/*                </li>*/}
                {/*            ))}*/}
                {/*        </ul>*/}
                {/*    </div>*/}
                {/*)}*/}

                {/*{product.countdown && (*/}
                {/*    <div className="variant-wrap countdown-wrap">*/}
                {/*        <div className="variant-box">*/}
                {/*            <div*/}
                {/*                className="js-countdown"*/}
                {/*                data-timer={product.countdown}*/}
                {/*                data-labels="D :,H :,M :,S"*/}
                {/*            >*/}
                {/*                <CountdownTimer />*/}
                {/*            </div>*/}
                {/*        </div>*/}
                {/*    </div>*/}
                {/*)}*/}

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
                        href={product.affLink}
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
                        to={`/product-detail/${product.id}`}
                        className="title link"
                        onClick={() => {
                            handleProductClick(product.id);
                            handleGlobalProductClick(product.id, product.title);
                        }}
                    >
                        {product.title}
                    </Link>
                    <span className="price">{product.price} Ron</span>

                </div>
        </div>
    );
}
