import Footer1 from "@/components/footers/Footer1";
import Header1 from "@/components/headers/Header1";
import Topbar6 from "@/components/headers/Topbar6";
import Products11 from "@/components/products/Products11";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import React from "react";
import MetaComponent from "@/components/common/MetaComponent";
const metadata = {
  title:
    "Shop Left Sidebar || Modave - Multipurpose Reactjs eCommerce Template",
  description: "Modave - Multipurpose Reactjs eCommerce Template",
};
export default function ShopLeftSidebarPage() {

    const { gender, category } = useParams();


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
                            <h3 className="heading text-center">{category}</h3>
                            <ul className="breadcrumbs d-flex align-items-center justify-content-center">
                                <li>
                                    <Link className="link" to={`/`}>
                                        Homepage
                                    </Link>
                                </li>
                                <li>
                                    <i className="icon-arrRight" />
                                </li>
                                <li>{category}</li>
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