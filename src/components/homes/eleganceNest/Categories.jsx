import { collections2 } from "@/data/collections";
import { Swiper, SwiperSlide } from "swiper/react";
import { Link } from "react-router-dom";
import {useEffect, useState} from "react";
import {Navigation, Pagination} from "swiper/modules";
export default function Categories() {
    const [collections, setCollections] = useState([]);

    useEffect(() => {
        fetch("https://api.indulap.ro/umbraco/delivery/api/v2/content?filter=contentType%3AcategoryPage&skip=0&take=2000")
            .then((res) => res.json())
            .then((data) => {
                const categories = data.items
                    .map((item) => ({
                        title: item.name,
                        link: item.route?.path || "#",
                        imageUrl: item.properties?.image1 || null,
                        alt: item.name,
                        affLink: item.properties?.affLink || "",
                        brands: item.brands
                    }))
                    .slice(7, 20);

                setCollections(categories);
            });
    }, []);


    return (
        <section className="flat-spacing">
            <div className="container">
                <div className="heading-section-2 wow fadeInUp">
                    <h3 className="heading">Descoperă Categoriile</h3>
                    <Link to={`/toate-categoriile`} className="btn-line">
                        Vizualizeaza Toate Categoriile
                    </Link>
                </div>
            </div>
            <div
                className="container-full slider-layout-left wow fadeInUp user-select-none"
                data-wow-delay="0.1s"
            >
                <Swiper
                    dir="ltr"
                    spaceBetween={15}
                    breakpoints={{
                        0: { slidesPerView: 2.2, spaceBetween: 15 },
                        568: { slidesPerView: 3.2, spaceBetween: 20 },
                        968: { slidesPerView: 4.2, spaceBetween: 20 },
                        1224: { slidesPerView: 6.2, spaceBetween: 20 },
                    }}
                    modules={[Pagination, Navigation]}
                    pagination={{
                        clickable: true,
                        el: ".spd54",
                    }}
                    navigation={{
                        prevEl: ".snbp12",
                        nextEl: ".snbn12",
                    }}
                >
                    {collections.map((collection, index) => (
                        <SwiperSlide key={index}>
                            <div className="collection-position-2 hover-img">
                                <a className="img-style">
                                    <img
                                        className="lazyload"
                                        data-src={collection.imageUrl}
                                        alt={collection.alt}
                                        src={collection.imageUrl || "https://via.placeholder.com/400"}
                                    />
                                </a>
                                <div className="content">
                                    {(() => {
                                        const parts = collection.title.toLowerCase().split("-");
                                        const [categorie, gen] = parts.length === 2 ? parts : [parts[0], "altele"];
                                        const generatedUrl = `/${gen}/${categorie}`;

                                        return (
                                            <Link className="cls-btn" to={generatedUrl}>
                                                <h6 className="text">{collection.title.split('-')[0]}</h6>
                                                <i className="icon icon-arrowUpRight" />
                                            </Link>
                                        );
                                    })()}

                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </section>
    );
}
