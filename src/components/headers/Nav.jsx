import { Link, useLocation } from "react-router-dom";
import React, {useState , useEffect} from "react";

import { products } from "@/data/products";
import { Swiper, SwiperSlide } from "swiper/react";
import ProductCard1 from "../productCards/ProductCard1";
import {
    blogLinks,
    demoItems,
    femei,
    otherPageLinks,
    otherShopMenus,
    productLinks,
    barbati,
    swatchLinks,
} from "@/data/menu";
import {getAllTimeTopProducts, getTodaysTopProducts} from "@/utlis/analytics.js";
import {API_HOST} from "@/config.js";

export default function Nav() {
    const { pathname } = useLocation();
    const [femeiLinks, setFemeiLinks] = useState([]);
    const [barbatLinks, setBarbatLinks] = useState([]);
    const [fetiteLinks, setFetiteLinks] = useState([]);
    const [baietiLinks, setBaietiLinks] = useState([]);
    const [collections, setCollections] = useState([]);
    const [products, setProducts] = useState([]);
    const [productsAll, setProductsAll] = useState([]);
    const [brands, setBrands] = useState([]);
    const [chunkedBrands, setChunkedBrands] = useState([[], []]);

    // Funcție pentru a verifica dacă o categorie are produse
    const checkCategoryHasProducts = async (categoryName) => {
        try {
            const response = await fetch(`${API_HOST}/umbraco/delivery/api/v2/content?filter=contentType%3AproductPage&skip=0&take=1&search=${encodeURIComponent(categoryName)}`);
            const data = await response.json();
            return data.total > 0;
        } catch (error) {
            console.error(`Error checking products for ${categoryName}:`, error);
            return false;
        }
    };

    // Funcție pentru a filtra categoriile care au produse
    const filterCategoriesWithProducts = async (categories) => {
        const categoriesWithProducts = [];

        for (const category of categories) {
            const hasProducts = await checkCategoryHasProducts(category.name);
            if (hasProducts) {
                categoriesWithProducts.push(category);
            }
        }

        return categoriesWithProducts;
    };

    useEffect(() => {
        getTodaysTopProducts(4)
            .then((topProducts) => {
                const productDetailsPromises = topProducts.map((topProduct) => {
                    return fetch(`${API_HOST}/umbraco/delivery/api/v2/content/item/${topProduct.productId}`)
                        .then((res) => res.json())
                        .then((productData) => ({
                            id: productData.id,
                            title: productData.name,
                            link: productData.route?.path || "#",
                            imageUrl1: productData.properties?.image1 || "",
                            imageUrl2: productData.properties?.image2 || "",
                            price: productData.properties?.price || null,
                            clicks: topProduct.clicks,
                        }))
                        .catch((error) => {
                            console.error(`Error fetching product ${topProduct.productId}:`, error);
                            return null;
                        });
                });
                Promise.all(productDetailsPromises)
                    .then((fullProductDetails) => {
                        const validProducts = fullProductDetails.filter(product => product !== null);
                        setProducts(validProducts);
                    });
            })
            .catch((error) => console.error("Error fetching top clicked products:", error));
    }, []);

    useEffect(() => {
        getAllTimeTopProducts(4)
            .then((productsAll) => {
                const productDetailsPromises = productsAll.map((productAll) => {
                    return fetch(`${API_HOST}/umbraco/delivery/api/v2/content/item/${productAll.productId}`)
                        .then((res) => res.json())
                        .then((productData) => ({
                            id: productData.id,
                            title: productData.name,
                            link: productData.route?.path || "#",
                            imageUrl1: productData.properties?.image1 || "",
                            imageUrl2: productData.properties?.image2 || "",
                            price: productData.properties?.price || null,
                            clicks: productAll.clicks,
                        }))
                        .catch((error) => {
                            console.error(`Error fetching all-time product ${productAll.productId}:`, error);
                            return null;
                        });
                });
                Promise.all(productDetailsPromises)
                    .then((fullProductDetails) => {
                        const validProducts = fullProductDetails.filter(product => product !== null);
                        setProductsAll(validProducts);
                    });
            })
            .catch((error) => console.error("Error fetching all time top clicked products:", error));
    }, []);

    useEffect(() => {
        const fetchCollections = async () => {
            try {
                const res = await fetch(`${API_HOST}/umbraco/delivery/api/v2/content?filter=contentType%3AcollectionPage&page=1&pageSize=50`);
                const data = await res.json();
                const collections = data.items.map((item) => {
                    const image = item.properties?.image?.[0];
                    const imageUrl = image ? `https://indulap-001-site1.mtempurl.com${image.url}` : null;

                    const link = `/colectii/${item.name
                        .toLowerCase()
                        .normalize("NFD")
                        .replace(/[\u0300-\u036f]/g, "")
                        .replace(/\s+/g, "-")}`;
                    return {
                        name: item.name,
                        link: link,
                        imageUrl: imageUrl,
                        alt: item.name,
                        description: item.description || "",
                    };
                });

                // Filtrează colecțiile care au produse
                const collectionsWithProducts = await filterCategoriesWithProducts(collections);

                const uniqueCollections = Array.from(
                    new Map(
                        collectionsWithProducts.map((item) => [
                            item.name.toLowerCase(),
                            item,
                        ])
                    ).values()
                );
                setCollections(uniqueCollections);
            } catch (error) {
                console.error("Error fetching collections:", error);
            }
        };
        fetchCollections();
    }, []);

    useEffect(() => {
        const fetchBrands = async () => {
            try {
                const res = await fetch(`${API_HOST}/umbraco/delivery/api/brands?take=40`);
                const data = await res.json();

                const allBrands = [...(data.group1 || []), ...(data.group2 || [])];

                // Verifică care branduri au produse
                const brandsWithProducts = [];
                for (const brand of allBrands) {
                    try {
                        const productRes = await fetch(`${API_HOST}/umbraco/delivery/api/v2/content?filter=contentType%3AproductPage&skip=0&take=1&search=${encodeURIComponent(brand.name)}`);
                        const productData = await productRes.json();
                        if (productData.total > 0) {
                            brandsWithProducts.push(brand);
                        }
                    } catch (error) {
                        console.error(`Error checking products for brand ${brand.name}:`, error);
                    }
                }

                const middle = Math.ceil(brandsWithProducts.length / 2);
                const chunked = [
                    brandsWithProducts.slice(0, middle),
                    brandsWithProducts.slice(middle)
                ];

                setChunkedBrands(chunked);
            } catch (error) {
                console.error("Error fetching brands:", error);
            }
        };

        fetchBrands();
    }, []);

    useEffect(() => {
        const fetchCategoriesWithProducts = async () => {
            try {
                const res = await fetch(`${API_HOST}/umbraco/delivery/api/v2/content?filter=contentType%3AcategoryPage&skip=0&take=200`);
                const data = await res.json();

                // Funcție pentru a verifica și filtra categoriile
                const filterCategoriesByGenderWithProducts = async (items, gender) => {
                    const categoriesRaw = items.filter((item) =>
                        item.name.toLowerCase().includes(gender.toLowerCase())
                    );

                    const categoriesWithProducts = [];
                    for (const category of categoriesRaw) {
                        try {
                            // Verifică dacă categoria are produse
                            const productRes = await fetch(`${API_HOST}/umbraco/delivery/api/v2/content?filter=contentType%3AproductPage&skip=0&take=1&search=${encodeURIComponent(category.name)}`);
                            const productData = await productRes.json();

                            if (productData.total > 0) {
                                categoriesWithProducts.push(category);
                            }
                        } catch (error) {
                            console.error(`Error checking products for category ${category.name}:`, error);
                        }
                    }

                    return Array.from(
                        new Map(
                            categoriesWithProducts.map((item) => [
                                item.name.toLowerCase(),
                                {
                                    name: item.name,
                                    href: `/${gender.toLowerCase()}/${item.name
                                        .replace(new RegExp(`\\s*-\\s*${gender}`, 'i'), "")
                                        .toLowerCase()
                                        .normalize("NFD")
                                        .replace(/[\u0300-\u036f]/g, "")
                                        .replace(/\s+/g, "-")
                                    }`,
                                },
                            ])
                        ).values()
                    );
                };

                // Procesează fiecare gen separat
                const [femeiCategories, barbatiCategories, baietiCategories, fetiteCategories] = await Promise.all([
                    filterCategoriesByGenderWithProducts(data.items, "femei"),
                    filterCategoriesByGenderWithProducts(data.items, "barbati"),
                    filterCategoriesByGenderWithProducts(data.items, "baieti"),
                    filterCategoriesByGenderWithProducts(data.items, "fetite")
                ]);

                setFemeiLinks(femeiCategories);
                setBarbatLinks(barbatiCategories);
                setBaietiLinks(baietiCategories);
                setFetiteLinks(fetiteCategories);

            } catch (error) {
                console.error("❌ Failed to fetch categories:", error);
            }
        };

        fetchCategoriesWithProducts();
    }, []);

    return (
        <>
            <li
                className={`menu-item ${
                    [...demoItems].some(
                        (elm) => elm.href.split("/")[1] == pathname.split("/")[1]
                    )
                        ? "active"
                        : ""
                } `}
            >
                <a href="/" className="item-link">
                    Acasă
                </a>
            </li>
            <li
                className={`menu-item ${
                    [
                        ...femei,
                        ...barbati,
                    ].some((elm) => elm.href.split("/")[1] == pathname.split("/")[1])
                        ? "active"
                        : ""
                } `}
            >
                <a href="#" className="item-link">
                    Produse
                    <i className="icon icon-arrow-down" />
                </a>
                <div className="sub-menu mega-menu">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-2">
                                <div className="mega-menu-item">
                                    <div className="menu-heading">Femei ({femeiLinks.length})</div>
                                    <ul className="menu-list">
                                        {femeiLinks.slice(0,15).map((link) => (
                                            <li key={link.name}>
                                                <Link to={link.href} className="menu-link-text">{link.name?.split("-")[0]}</Link>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                            <div className="col-lg-2">
                                <div className="mega-menu-item">
                                    <div className="menu-heading">Fetite ({fetiteLinks.length})</div>
                                    <ul className="menu-list">
                                        {fetiteLinks.slice(0,15).map((link) => (
                                            <li key={link.name}>
                                                <Link to={link.href} className="menu-link-text">{link.name?.split("-")[0]}</Link>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                            <div className="col-lg-2">
                                <div className="mega-menu-item">
                                    <div className="menu-heading">Barbati ({barbatLinks.length})</div>
                                    <ul className="menu-list">
                                        {barbatLinks.slice(0,15).map((link) => (
                                            <li key={link.name}>
                                                <Link to={link.href} className="menu-link-text">{link.name?.split("-")[0]}</Link>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                            <div className="col-lg-2">
                                <div className="mega-menu-item">
                                    <div className="menu-heading">Baieti ({baietiLinks.length})</div>
                                    <ul className="menu-list">
                                        {baietiLinks.slice(0,15).map((link) => (
                                            <li key={link.name}>
                                                <Link to={link.href} className="menu-link-text">{link.name?.split("-")[0]}</Link>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                            <div className="col-lg-4">
                                <div className="wrapper-sub-shop">
                                    <div className="menu-heading">Alegerile de top de astăzi</div>
                                    {products.length > 0 ? (
                                        <Swiper
                                            dir="ltr"
                                            className="swiper tf-product-header"
                                            slidesPerView={2}
                                            spaceBetween={20}
                                        >
                                            {products
                                                .slice(0, 4)
                                                .map((elm) => ({
                                                    ...elm,
                                                    colors: null,
                                                }))
                                                .map((product, index) => (
                                                    <SwiperSlide key={index} className="swiper-slide">
                                                        <ProductCard1 product={product} />
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
            <li
                className={`menu-item ${
                    [...productLinks, ...swatchLinks, ...barbati].some(
                        (elm) => elm.href.split("/")[1] == pathname.split("/")[1]
                    )
                        ? "active"
                        : ""
                } `}
            >
                <a href="#" className="item-link">
                    Colecții
                    <i className="icon icon-arrow-down" />
                </a>
                <div className="sub-menu mega-menu">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-3">
                                <div className="mega-menu-item">
                                    <div className="menu-heading">Colectii ({collections.length})</div>
                                    <ul className="menu-list">
                                        {collections.map((collection, index) => (
                                            <li
                                                key={index}
                                                className={`menu-item-li ${
                                                    pathname.split("/")[1] === collection.link.split("/")[1]
                                                        ? "active"
                                                        : ""
                                                }`}
                                            >
                                                <Link to={collection.link} className="menu-link-text">
                                                    {collection.name}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                            <div className="col-lg-3">
                                <div className="mega-menu-item">
                                    <div className="menu-heading">Branduri ({chunkedBrands[0]?.length || 0})</div>
                                    <ul className="menu-list">
                                        {chunkedBrands[0]?.map((brand) => (
                                            <li key={brand.name} className="menu-item-li">
                                                <Link to={brand.link} className="menu-link-text">{brand.name}</Link>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>

                            <div className="col-lg-3">
                                <div className="mega-menu-item">
                                    <div className="menu-heading">Mai multe branduri ({chunkedBrands[1]?.length || 0})</div>
                                    <ul className="menu-list">
                                        {chunkedBrands[1]?.map((brand) => (
                                            <li key={brand.name} className="menu-item-li">
                                                <Link to={brand.link} className="menu-link-text">{brand.name}</Link>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>

                            <div className="col-lg-3">
                                <div className="menu-heading">Cel mai vândut</div>
                                <div className="sec-cls-header">
                                    <div className="collection-position hover-img">
                                        {productsAll.length > 0 ? (
                                            <Link to={`/shop-collection`} className="img-style">
                                                <ProductCard1
                                                    product={{
                                                        ...productsAll[0],
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