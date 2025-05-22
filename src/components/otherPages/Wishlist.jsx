import React from "react";
import ProductCard1 from "@/components/productCards/ProductCard1";
import Pagination from "../common/Pagination";
import { Link } from "react-router-dom";
import { useContextElement } from "@/context/Context";

export default function Wishlist() {
    const { wishList, removeFromWishlist } = useContextElement();

    if (!wishList || wishList.length === 0) {
        return (
            <div className="p-5">
                Your wishlist is empty. Start adding your favorite products to save them
                for later!{" "}
                <Link className="btn-line" to="/colectii/otter-days">
                    Explore Products
                </Link>
            </div>
        );
    }

    return (
        <section className="flat-spacing">
            <div className="container">
                <h3>Your Wishlist</h3>
                <div className="tf-grid-layout tf-col-2 md-col-3 xl-col-4">
                    {wishList.map((product) => (
                        <ProductCard1
                            key={product.id}
                            product={product}
                            onRemove={() => removeFromWishlist(product.id)}
                        />
                    ))}
                </div>

                <ul className="wg-pagination justify-content-center">
                    <Pagination />
                </ul>
            </div>
        </section>
    );
}
