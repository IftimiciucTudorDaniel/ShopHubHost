import { collectionItems } from "@/data/collections";
import React, {useEffect, useState} from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { useContextElement } from "@/context/Context";

import { Link } from "react-router-dom";
import { Pagination } from "swiper/modules";
export default function Collections() {
    const [collections, setCollections] = useState([]);
    useEffect(() => {
        fetch("https://indulap-001-site1.mtempurl.com/umbraco/delivery/api/v2/content?filter=contentType%3AcollectionPage")
            .then((res) => res.json())
            .then((data) => {
                const collections = data.items.map((item) => {
                    const image = item.properties?.image?.[0];
                    const imageUrl = image ? `https://indulap-001-site1.mtempurl.com/${image.url}` : null;
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
        <section className="flat-spacing">
            <div className="container">
                <Swiper
                    dir="ltr"
                    spaceBetween={15}
                    breakpoints={{
                        0: { slidesPerView: 1 },
                        668: { slidesPerView: 2, spaceBetween: 30 },
                        1024: { slidesPerView: 3, spaceBetween: 30 },
                    }}
                    className="swiper tf-sw-collection sw-lookbook-wrap"
                    modules={[Pagination]}
                    pagination={{
                        clickable: true,
                        el: ".spd29",
                    }}
                >
                    {collections.map((collection, index) => (
                        <SwiperSlide key={index}>
                            <div className="collection-position-3 hover-img wow fadeInUp user-select-none">
                                <a href={collection.link || "#"} className="img-style">
                                    <img
                                        className="lazyload"
                                        src={collection.imageUrl}
                                        width={615}
                                        height={819}
                                    />
                                </a>

                                <div className="content">
                                    <div className="archive-top">
                                        <h4 className="title">
                                            <Link
                                                to={collection.link}
                                                className="link"
                                                dangerouslySetInnerHTML={{ __html: collection.title || '#' }}
                                            ></Link>
                                        </h4>
                                    </div>
                                    <div className="archive-btn">
                                        <Link to={collection.link || "#"} className="btn-line">
                                            Descopera produsele!
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                    {/* Pagination */}
                    <div className="sw-pagination-collection sw-dots type-circle justify-content-center spd29" />
                </Swiper>
            </div>
        </section>
    );
}
