import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import Listview from "@/components/products/Listview.jsx";


export default function ShopCategories() {
    const [categories, setCategories] = useState([]);
    const productsRef = useRef(null); // dacă folosești `ref` pentru ceva

    useEffect(() => {
        fetch("https://api.indulap.ro/umbraco/delivery/api/v2/content?filter=contentType%3AcategoryPage&skip=0&take=200")
            .then((res) => res.json())
            .then((data) => {
                const categories = data.items.map((item) => ({
                    title: item.name,
                    link: item.route?.path || "#",
                    imageUrl: item.properties?.image1 || null,
                    alt: item.name,
                    affLink: item.properties?.affLink || "",
                }));

                setCategories(categories);
            });
    }, []);

    return (
        <section className="flat-spacing">
            <div className="container">
                <div className="row">
                    {categories.map((cat, index) => (
                        <div className="col-6 col-md-4 col-lg-3 mb-4" key={index}>
                            <Link
                                to={`/${cat.title.split('-')[1].toLowerCase()}/${cat.title.split('-')[0].toLowerCase()}`}
                                className="text-decoration-none"
                            >
                                <div className="card h-100 shadow-sm">
                                    {cat.imageUrl ? (
                                        <img
                                            src={cat.imageUrl}
                                            alt={cat.alt}
                                            className="card-img-top"
                                            style={{
                                                height: "300px",
                                                width: "300px",
                                                objectFit: "cover",
                                            }}
                                        />
                                    ) : (
                                        <div className="card-img-top bg-secondary text-white text-center py-5">No image</div>
                                    )}
                                    <div className="card-body">
                                        <h6 className="card-title text-center">{cat.title.split('-')[0]}</h6>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

