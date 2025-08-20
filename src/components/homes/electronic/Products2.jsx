import ProductCard1 from "@/components/productCards/ProductCard1";
import React, { useEffect, useState } from "react";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { getAllTimeTopProducts } from "@/utlis/analytics.js";

export default function Products2({ title, parentClass }) {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);

        getAllTimeTopProducts(4)
            .then((topProducts) => {
                console.log('All-time top products:', topProducts);

                const productDetailsPromises = topProducts.map((topProduct) => {
                    return Promise.race([
                        fetch(`https://api.indulap.ro/umbraco/delivery/api/v2/content/item/${topProduct.productId}`),
                        new Promise((_, reject) =>
                            setTimeout(() => reject(new Error('Timeout')), 10000)
                        )
                    ])
                        .then((res) => {
                            if (!res.ok) throw new Error(`HTTP ${res.status}`);
                            return res.json();
                        })
                        .then((productData) => {
                            const mappedProduct = {
                                id: productData.id,
                                title: productData.name,
                                link: productData.route?.path || "#",
                                imageUrl1: productData.properties?.image1 || "",
                                imageUrl2: productData.properties?.image2 || "",
                                price: productData.properties?.price || null,
                                clicks: topProduct.clicks,
                                affLink: productData.properties?.affLink || "",
                                longDescription: productData.properties?.longDescription?.markup || "",
                                isOnSale: false,
                                originalPrice: null,
                                brand: productData.properties?.brand || "",
                                color: productData.properties?.color || "",
                                category: productData.properties?.category || "",
                                sku: productData.properties?.sku || "",
                                gen: productData.properties?.gen || "",
                                material: productData.properties?.material || "",
                                shortDescription: productData.properties?.shortDescription || "",
                            };

                            return mappedProduct;
                        })
                        .catch((error) => {
                            console.error(`Error fetching product ${topProduct.productId}:`, error);
                            return null;
                        });
                });

                Promise.all(productDetailsPromises)
                    .then((fullProductDetails) => {
                        const validProducts = fullProductDetails.filter(product => product !== null);
                        console.log('Valid products all-time:', validProducts);
                        setProducts(validProducts);
                    });
            })
            .catch((error) => {
                console.error("❌ Error fetching all-time top clicked products:", error);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    if (loading) {
        return (
            <section className={parentClass}>
                <div className="container">
                    <div className="heading-section text-center">
                        <h3 className="heading">Cel mai bine vândut</h3>
                        <p>Se încarcă...</p>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section className={parentClass}>
            <div className="container">
                <div className="heading-section text-center wow fadeInUp">
                    <h3 className="heading">{title || "Cel mai bine vândut"}</h3>
                    <p className="subheading text-secondary">
                        Răsfoiți secțiunea noastră de Tendințe: cele mai tari alegeri îndrăgite de toți.
                    </p>
                </div>

                {products.length > 0 ? (
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
                ) : (
                    <div className="text-center">
                        <p>Nu există date de click-uri încă.</p>
                    </div>
                )}
            </div>
        </section>
    );
}