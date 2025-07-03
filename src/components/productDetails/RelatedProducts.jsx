import React, { useEffect, useState } from "react";
import { getTopClickedProducts } from "@/utlis/analytics.js";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import ProductCard1 from "../productCards/ProductCard1";

export default function RelatedProducts({product}) {
    const [products, setProducts] = useState([]);
    const [topProducts, setTopProducts] = useState([]);

    useEffect(() => {
        fetch(`https://api.indulap.ro/umbraco/delivery/api/products?category=${product.category}`)
            .then((res) => res.json())
            .then((data) => {
                const items = data
                    .filter((item) => item.id !== product.id)
                    .slice(0, 4);

                const formatted = items.map((item) => ({
                    id: item.id,
                    title: item.title,
                    link: item.affLink || "#",
                    imageUrl1: item.imageUrl1 || "",
                    imageUrl2: item.imageUrl2 || "",
                    alt: item.title,
                    price: item.price || null,
                }));

                setProducts(formatted);
            })
            .catch((error) => console.error("Error fetching products:", error));
    }, [product]);
console.log(product.category);
    useEffect(() => {
        const fetched = getTopClickedProducts(products);
        setTopProducts(fetched);
    }, [products]);
    return (
        <section className="flat-spacing">
            <div className="container flat-animate-tab">
                <ul
                    className="tab-product justify-content-sm-center wow fadeInUp"
                    data-wow-delay="0s"
                    role="tablist"
                >
                    <li className="nav-tab-item" role="presentation">
                        <a href="#ralatedProducts" className="active" data-bs-toggle="tab">
                            Related Products
                        </a>
                    </li>
                    {/*<li className="nav-tab-item" role="presentation">*/}
                    {/*    <a href="#recentlyViewed" data-bs-toggle="tab">*/}
                    {/*        Recently Viewed*/}
                    {/*    </a>*/}
                    {/*</li>*/}
                </ul>
                <div className="tab-content">
                    <div className="tab-pane active show" id="ralatedProducts" role="tabpanel">
                        <Swiper
                            className="swiper tf-sw-latest"
                            dir="ltr"
                            spaceBetween={15}
                            breakpoints={{
                                0: { slidesPerView: 2, spaceBetween: 15 },
                                768: { slidesPerView: 3, spaceBetween: 30 },
                                1200: { slidesPerView: 4, spaceBetween: 30 },
                            }}
                            modules={[Pagination]}
                            pagination={{ clickable: true, el: ".spd4" }}
                        >
                            {products.map((product, i) => (
                                <SwiperSlide key={i} className="swiper-slide">
                                    <ProductCard1 product={product} />
                                </SwiperSlide>
                            ))}
                            <div className="sw-pagination-latest spd4 sw-dots type-circle justify-content-center" />
                        </Swiper>
                    </div>

                    <div className="tab-pane" id="recentlyViewed" role="tabpanel">
                        <Swiper
                            className="swiper tf-sw-latest"
                            dir="ltr"
                            spaceBetween={15}
                            breakpoints={{
                                0: { slidesPerView: 2, spaceBetween: 15 },
                                768: { slidesPerView: 3, spaceBetween: 30 },
                                1200: { slidesPerView: 4, spaceBetween: 30 },
                            }}
                            modules={[Pagination]}
                            pagination={{ clickable: true, el: ".spd5" }}
                        >
                            {topProducts.map((product, i) => (
                                <SwiperSlide key={i} className="swiper-slide">
                                    <ProductCard1 product={product} />
                                </SwiperSlide>
                            ))}
                            <div className="sw-pagination-latest spd5 sw-dots type-circle justify-content-center" />
                        </Swiper>
                    </div>
                </div>
            </div>
        </section>
    );
}
