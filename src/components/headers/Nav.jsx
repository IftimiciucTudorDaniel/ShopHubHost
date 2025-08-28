import { Link, useLocation } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import ProductCard1 from "../productCards/ProductCard1";
import { API_HOST } from "@/config.js";

export default function Nav() {
    const { pathname } = useLocation();
    const [navigationData, setNavigationData] = useState({
        categories: {
            femei: [],
            barbati: [],
            fetite: [],
            baieti: []
        },
        collectionsWithGenders: []
    });
    const [topProducts, setTopProducts] = useState([]);
    const [allTimeTopProducts, setAllTimeTopProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const cachedNavData = localStorage.getItem("navigationData");
        const cachedTop = localStorage.getItem("topProducts");
        const cachedAllTime = localStorage.getItem("allTimeTopProducts");

        if (cachedNavData && cachedTop && cachedAllTime) {
            setNavigationData(JSON.parse(cachedNavData));
            setTopProducts(JSON.parse(cachedTop));
            setAllTimeTopProducts(JSON.parse(cachedAllTime));
            setLoading(false);
            return;
        }

        const fetchNavigationData = async () => {
            try {
                setLoading(true);

                const [navResponse, topProductsResponse, allTimeProductsResponse] = await Promise.all([
                    fetch(`${API_HOST}/api/NavigationApi/menu-data`),
                    fetch(`${API_HOST}/api/NavigationApi/top-products?take=4`),
                    fetch(`${API_HOST}/api/NavigationApi/all-time-top-products?take=4`)
                ]);

                const navData = await navResponse.json();
                const topProductsData = await topProductsResponse.json();
                const allTimeProductsData = await allTimeProductsResponse.json();

                setNavigationData(navData);
                setTopProducts(topProductsData);
                setAllTimeTopProducts(allTimeProductsData);

                // salvez în cache
                localStorage.setItem("navigationData", JSON.stringify(navData));
                localStorage.setItem("topProducts", JSON.stringify(topProductsData));
                localStorage.setItem("allTimeTopProducts", JSON.stringify(allTimeProductsData));

            } catch (error) {
                console.error("Error fetching navigation data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchNavigationData();
    }, []);

    // Extract data for easier access
    const { categories, collectionsWithGenders } = navigationData;
    const { femei, barbati, fetite, baieti } = categories;

    if (loading) {
        return (
            <li>
                <span className="item-link">Se încarcă...</span>
            </li>
        );
    }

    return (
        <>
            <li className="menu-item">
                <a href="/" className="item-link">
                    Acasă
                </a>
            </li>

            <li className="menu-item">
                <a href="#" className="item-link">
                    Produse
                    <i className="icon icon-arrow-down" />
                </a>
                <div className="sub-menu mega-menu">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-2">
                                <div className="mega-menu-item">
                                    <div className="menu-heading">Femei ({femei.length})</div>
                                    <ul className="menu-list">
                                        {femei.slice(0, 15).map((link) => (
                                            <li key={link.name}>
                                                <Link to={link.href} className="menu-link-text">
                                                    {link.name?.split("-")[0]}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>

                            <div className="col-lg-2">
                                <div className="mega-menu-item">
                                    <div className="menu-heading">Fetite ({fetite.length})</div>
                                    <ul className="menu-list">
                                        {fetite.slice(0, 15).map((link) => (
                                            <li key={link.name}>
                                                <Link to={link.href} className="menu-link-text">
                                                    {link.name?.split("-")[0]}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>

                            <div className="col-lg-2">
                                <div className="mega-menu-item">
                                    <div className="menu-heading">Barbati ({barbati.length})</div>
                                    <ul className="menu-list">
                                        {barbati.slice(0, 15).map((link) => (
                                            <li key={link.name}>
                                                <Link to={link.href} className="menu-link-text">
                                                    {link.name?.split("-")[0]}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>

                            <div className="col-lg-2">
                                <div className="mega-menu-item">
                                    <div className="menu-heading">Baieti ({baieti.length})</div>
                                    <ul className="menu-list">
                                        {baieti.slice(0, 15).map((link) => (
                                            <li key={link.name}>
                                                <Link to={link.href} className="menu-link-text">
                                                    {link.name?.split("-")[0]}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>

                            <div className="col-lg-4">
                                <div className="wrapper-sub-shop">
                                    <div className="menu-heading">Alegerile de top de astăzi</div>
                                    {topProducts.length > 0 ? (
                                        <Swiper
                                            dir="ltr"
                                            className="swiper tf-product-header"
                                            slidesPerView={2}
                                            spaceBetween={20}
                                        >
                                            {topProducts.map((product, index) => (
                                                <SwiperSlide key={index} className="swiper-slide">
                                                    <ProductCard1 product={{...product, colors: null}} />
                                                </SwiperSlide>
                                            ))}
                                        </Swiper>
                                    ) : (
                                        <p>Se încarcă produsele populare...</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </li>

            <li className="menu-item">
                <a href="#" className="item-link">
                    Colecții
                    <i className="icon icon-arrow-down" />
                </a>
                <div className="sub-menu mega-menu">
                    <div className="container">
                        <div className="row">
                            {collectionsWithGenders.map((collection, collectionIndex) => (
                                <div key={collectionIndex} className="col-lg-3">
                                    <div className="mega-menu-item">
                                        <div className="menu-heading">
                                            <Link to={collection.link} className="collection-main-link">
                                                {collection.name} ({collection.genders.length})
                                            </Link>
                                        </div>
                                        <ul className="menu-list">
                                            {collection.genders.map((gender, genderIndex) => (
                                                <li key={genderIndex} className="menu-item-li">
                                                    <Link to={gender.link} className="menu-link-text">
                                                        {gender.name} ({gender.productCount})
                                                    </Link>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            ))}

                            {/* Cel mai vândut - dacă mai rămâne spațiu */}
                            {collectionsWithGenders.length < 4 && (
                                <div className="col-lg-3">
                                    <div className="menu-heading">Cel mai vândut</div>
                                    <div className="sec-cls-header">
                                        <div className="collection-position hover-img">
                                            {allTimeTopProducts.length > 0 ? (
                                                <Link to={`/shop-collection`} className="img-style">
                                                    <ProductCard1
                                                        product={{
                                                            ...allTimeTopProducts[0],
                                                            colors: null
                                                        }}
                                                    />
                                                </Link>
                                            ) : (
                                                <p>Se încarcă...</p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </li>

            <li>
                <a href="/contact" className="item-link">
                    Contactează-ne
                </a>
            </li>
        </>
    );
}