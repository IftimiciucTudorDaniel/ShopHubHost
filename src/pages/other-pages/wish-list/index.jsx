import React from "react";
import Wishlist from "@/components/otherPages/Wishlist";
import MetaComponent from "@/components/common/MetaComponent.jsx";
import Topbar6 from "@/components/headers/Topbar6.jsx";
import Header1 from "@/components/headers/Header1.jsx";
import {Link} from "react-router-dom";
import Footer1 from "@/components/footers/Footer1.jsx";

export default function WishListPage() {
    return (
        <>
            <Topbar6 bgColor="bg-main" />
            <Header1 />
            <div
                className="page-title"
                style={{ backgroundImage: "url(/images/section/page-title.jpg)" }}
            >
                <div className="container">
                    <h3 className="heading text-center">Your Wishlist</h3>
                    <ul className="breadcrumbs d-flex align-items-center justify-content-center">
                        <li>
                            <Link className="link" to={`/`}>
                                Homepage
                            </Link>
                        </li>
                        <li>
                            <i className="icon-arrRight" />
                        </li>
                        <li>
                            <Link className="link" to={`/shop-default-grid`}>
                                Shop
                            </Link>
                        </li>
                        <li>
                            <i className="icon-arrRight" />
                        </li>
                        <li>Wishlist</li>
                    </ul>
                </div>
            </div>
            <Wishlist />
            <Footer1 />
        </>
    );
}
