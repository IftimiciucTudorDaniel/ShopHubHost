import ProductCard1 from "@/components/productCards/ProductCard1";
import { getTodaysTopClickedProducts } from "@/utlis/analytics.js";
import React, { useEffect, useState } from "react";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

export default function Products2({ title, parentClass }) {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        getTodaysTopClickedProducts()
            .then((topProducts) => {
                const productDetailsPromises = topProducts.map((topProduct) => {
                    return fetch(`http://188.214.88.51:5001/umbraco/delivery/api/v2/content/item/${topProduct.productId}`)
                        .then((res) => res.json())
                        .then((productData) => ({
                            id: productData.id,
                            title: productData.name,
                            link: productData.route?.path || "#",
                            imageUrl1: productData.properties?.image1 || "",
                            imageUrl2: productData.properties?.image2 || "",
                            price: productData.properties?.price || null,
                            clicks: topProduct.clicks,
                            affLink: productData.properties?.affLink || "",
                            longDescription : productData.properties?.longDescription.markup,
                        }));
                });

                Promise.all(productDetailsPromises)
                    .then((fullProductDetails) => {
                        setProducts(fullProductDetails);
                    });
            })
            .catch((error) => console.error("Error fetching top clicked products:", error));
    }, []);

    return (
        <section className={parentClass}>
            <div className="container">
                <div className="heading-section text-center wow fadeInUp">
                    <h3 className="heading">{title}</h3>
                    <h3 className="heading">Best Selling</h3>
                    <p className="subheading text-secondary">
                        Browse our Top Trending: the hottest picks loved by all.
                    </p>
                </div>
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
                    pagination={{
                        clickable: true,
                        el: ".spd5",
                    }}
                >
                    {products.map((product, index) => (
                        <SwiperSlide key={index} className="swiper-slide">
                            <ProductCard1 product={product} />
                        </SwiperSlide>
                    ))}

                    <div className="sw-pagination-latest spd5 sw-dots type-circle justify-content-center" />
                </Swiper>
            </div>
        </section>
    );
}
