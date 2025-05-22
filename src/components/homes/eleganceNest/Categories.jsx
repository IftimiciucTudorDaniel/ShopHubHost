import { collections2 } from "@/data/collections";
import { Swiper, SwiperSlide } from "swiper/react";
import { Link } from "react-router-dom";
import {useEffect, useState} from "react";
import {Navigation, Pagination} from "swiper/modules";
export default function Categories() {
    const [collections, setCollections] = useState([]);

    useEffect(() => {
        fetch("/umbraco/delivery/api/v2/content?filter=contentType%3AcategoryPage&skip=0&take=2000")
            .then((res) => res.json())
            .then((data) => {
                const categories = data.items.map((item) => {
                    const image = item.properties?.image?.[0];
                    const imageUrl = image ? `https://localhost:44322${image.url}` : null;
                    return {
                        title: item.name,
                        link: item.route?.path || "#",
                        imageUrl: imageUrl,
                        alt: item.name,
                        affLink: item.properties?.affLink || "",
                    };
                });
                setCollections(categories);
            });
    }, []);


    return (
        <section className="flat-spacing">
            <div className="container">
                <div className="heading-section-2 wow fadeInUp">
                    <h3 className="heading">Explore Collections</h3>
                    <Link to={`/shop-collection`} className="btn-line">
                        View All Collection
                    </Link>
                </div>
            </div>
            <div
                className="container-full slider-layout-right wow fadeInUp"
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
                                        data-src={collection.imgSrc}
                                        alt={collection.alt}
                                        src={collection.imageUrl || "https://via.placeholder.com/363"}
                                        width={363}
                                        height={483}
                                    />
                                </a>
                                <div className="content">
                                    <Link to={`/shop-collection`} className="cls-btn">
                                        <h6 className="text">{collection.title}</h6>
                                        <i className="icon icon-arrowUpRight" />
                                    </Link>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </section>
    );
}
