import Footer1 from "@/components/footers/Footer1";
import Header1 from "@/components/headers/Header1";
import Topbar6 from "@/components/headers/Topbar6";
import Products11 from "@/components/products/Products11";
import { useParams, useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import React from "react";
import MetaComponent from "@/components/common/MetaComponent";

const metadata = {
    title: "InDulap.ro",
};

export default function ShopLeftSidebarPage() {
    const { gender, category } = useParams();
    const location = useLocation();
    const path = location.pathname;

    // Funcție pentru a capitaliza prima literă
    const capitalizeFirst = (text) => {
        if (!text) return "";
        return text.charAt(0).toUpperCase() + text.slice(1);
    };

    return (
        <>
            <MetaComponent meta={metadata} />
            <Topbar6 bgColor="bg-main" />
            <Header1 />
            <div
                className="page-title"
                style={{ backgroundImage: "url(/images/section/page-title.jpg)" }}
            >
                <div className="container-full">
                    <div className="row">
                        <div className="col-12">
                            <h3 className="heading text-center">
                                {category ? capitalizeFirst(category.split("-").join(" ")) : ""}
                            </h3>
                            <ul className="breadcrumbs d-flex align-items-center justify-content-center">
                                <li>
                                    <Link to="/" className="text-black hover:text-blue-600 transition-colors">
                                        Acasă
                                    </Link>
                                </li>
                                {gender && (
                                    <li className="flex items-center">
                                        <span className="mx-2 text-gray-500">&gt;</span>
                                        <Link
                                            to={`/${gender}`}
                                            className="text-black hover:text-blue-600 transition-colors"
                                        >
                                            {capitalizeFirst(gender)}
                                        </Link>
                                    </li>
                                )}
                                {category && (
                                    <li className="flex items-center">
                                        <span className="mx-2 text-gray-500">&gt;</span>
                                        <span className="text-gray-700">
                                            {capitalizeFirst(category.split("-").join(" "))}
                                        </span>
                                    </li>
                                )}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <Products11 selectedCategory={category} gen={gender} />
            <Footer1 />
        </>
    );
}