import Footer1 from "@/components/footers/Footer1";
import Header1 from "@/components/headers/Header1";
import Topbar6 from "@/components/headers/Topbar6";
import Products1 from "@/components/products/Products1";
import { Link } from "react-router-dom";
import React, {useEffect, useRef, useState} from "react";
import MetaComponent from "@/components/common/MetaComponent";
import {SwiperSlide} from "swiper/react";
const metadata = {
  title:
    "InDulap.ro",
};
export default function ShopFilterCanvasPage() {
    const [collections, setCollections] = useState([]);
    useEffect(() => {
        fetch("https://api.indulap.ro/umbraco/delivery/api/v2/content?filter=contentType%3AcollectionPage")
            .then((res) => res.json())
            .then((data) => {
                const collections = data.items.map((item) => {
                    const image = item.properties?.image?.[0];
                    const imageUrl = image ? `https://api.indulap.ro/${image.url}` : null;
                    const link = `/colectii/${item.name
                        .toLowerCase()
                        .normalize("NFD")
                        .replace(/[\u0300-\u036f]/g, "")
                        .replace(/\s+/g, "-")}`;
                    return {
                        title: item.name,
                        link: link || "#",
                        imageUrl: imageUrl,
                        alt: item.name,
                        description:item.description,
                        affLink: item.properties?.affLink || "",
                    };
                });
                setCollections(collections);
            });
    }, []);
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
              <h3 className="heading text-center">Listă Colectii</h3>
              <ul className="breadcrumbs d-flex align-items-center justify-content-center">
                <li>
                  <Link className="link" to={`/`}>
                    Homepage
                  </Link>
                </li>
                <li>
                  <i className="icon-arrRight" />
                </li>
                <li>Colectii</li>
              </ul>
            </div>

          </div>
        </div>
      </div>
        <section className="flat-spacing">
            <div className="container">
                <div className="row">
                    {collections.map((collection, index) => (
                        <div className="col-6 col-md-4 col-lg-3 mb-4" key={index}>
                            <Link
                                to={collection.link || "#"}
                                className="text-decoration-none"
                            >
                                <div className="card h-100 shadow-sm">
                                    {collection.imageUrl ? (
                                        <img
                                            src={collection.imageUrl}
                                            alt={collection.title}
                                            className="card-img-top"
                                            style={{
                                                height: "300px",
                                                width: "300px",
                                                objectFit: "cover",
                                            }}
                                        />
                                    ) : (
                                        <div className="card-img-top bg-secondary text-white text-center py-5">
                                            No image
                                        </div>
                                    )}
                                    <div className="card-body">
                                        <h6
                                            className="card-title text-center"
                                            dangerouslySetInnerHTML={{ __html: collection.title }}
                                        ></h6>
                                        <div className="text-center">
                                            <Link to={collection.link || "#"} className="btn btn-outline-dark btn-sm mt-2">
                                                Descoperă produsele!
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </section>

        <Footer1 />
    </>
  );
}
