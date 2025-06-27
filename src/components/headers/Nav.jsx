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
  productStyles,
  barbati,
  swatchLinks,
} from "@/data/menu";
import {getAllTimeTopClickedProducts, getTodaysTopClickedProducts} from "@/utlis/analytics.js";

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


    const brandsPerColumn = 10;
    let k=2;
    for (let i = 0; i < brands.length && k>0; i += brandsPerColumn) {
        chunkedBrands.push(brands.slice(i, i + brandsPerColumn));
        k--;
    }
    useEffect(() => {
    getTodaysTopClickedProducts()
        .then((topProducts) => {
          const productDetailsPromises = topProducts.map((topProduct) => {
            return fetch(`https://api.indulap.ro/umbraco/delivery/api/v2/content/item/${topProduct.productId}`)
                .then((res) => res.json())
                .then((productData) => ({
                  id: productData.id,
                  title: productData.name,
                  link: productData.route?.path || "#",
                  imageUrl1: productData.properties?.image1 || "",
                  imageUrl2: productData.properties?.image2 || "",
                  price: productData.properties?.price || null,
                  clicks: topProduct.clicks,
                }));
          });

          Promise.all(productDetailsPromises)
              .then((fullProductDetails) => {
                setProducts(fullProductDetails);
              });
        })
        .catch((error) => console.error("Error fetching top clicked products:", error));
  }, []);

    // useEffect(() => {
    //     getAllTimeTopClickedProducts()
    //         .then((productsAll) => {
    //             const productDetailsPromises = productsAll.map((productsAll) => {
    //                 return fetch(`https://api.indulap.ro/umbraco/delivery/api/v2/content/item/${productsAll.productId}`)
    //                     .then((res) => res.json())
    //                     .then((productData) => ({
    //                         id: productData.id,
    //                         title: productData.name,
    //                         link: productData.route?.path || "#",
    //                         imageUrl1: productData.properties?.image1 || "",
    //                         imageUrl2: productData.properties?.image2 || "",
    //                         price: productData.properties?.price || null,
    //                         clicks: topProduct.clicks,
    //                     }));
    //             });
    //
    //             Promise.all(productDetailsPromises)
    //                 .then((fullProductDetails) => {
    //                     setProductsAll(fullProductDetails);
    //                 });
    //         })
    //         .catch((error) => console.error("Error fetching top clicked products:", error));
    // }, []);
    useEffect(() => {
        const fetchCollections = async () => {
            try {
                const res = await fetch("https://api.indulap.ro/umbraco/delivery/api/v2/content?filter=contentType%3AcollectionPage&page=1&pageSize=10\n");
                const data = await res.json();

                const collections = data.items.map((item) => {
                    const image = item.properties?.image?.[0];
                    const imageUrl = image ? `https://indulap-001-site1.mtempurl.com${image.url}` : null;

                    // Construiește link-ul dinamic pentru colecție
                    const link = `/colectii/${item.name
                        .toLowerCase()
                        .normalize("NFD")
                        .replace(/[\u0300-\u036f]/g, "")
                        .replace(/\s+/g, "-")}`;

                    return {
                        name: item.name,
                        link: link,  // Link-ul dinamic pentru colecție
                        imageUrl: imageUrl,
                        alt: item.name,
                        description: item.description || "",
                    };
                });

                // Dacă vrei să elimini duplicatele pe baza numelui
                const uniqueCollections = Array.from(
                    new Map(
                        collections.map((item) => [
                            item.name.toLowerCase(),
                            item,
                        ])
                    ).values()
                );

                setCollections(uniqueCollections);  // Setează colecțiile unice
            } catch (error) {
                console.error("Error fetching collections:", error);
            }
        };

        fetchCollections();
    }, []);

    useEffect(() => {
        const fetchBrands = async () => {
            try {
                const res = await fetch("https://api.indulap.ro/umbraco/delivery/api/brands?take=20");
                const data = await res.json();

                const allBrands = [...(data.group1 || []), ...(data.group2 || [])];


                const middle = Math.ceil(allBrands.length / 2);
                const chunked = [
                    allBrands.slice(0, middle),
                    allBrands.slice(middle)
                ];

                setChunkedBrands(chunked);
            } catch (error) {
                console.error("Error fetching brands:", error);
            }
        };

        fetchBrands();
    }, []);




    useEffect(() => {
    const fetchFemeiLinks = async () => {
      try {
        const res = await fetch("https://api.indulap.ro/umbraco/delivery/api/v2/content?filter=contentType%3AcategoryPage&skip=0&take=200");
        const data = await res.json();

          const femeiCategoriesRaw = data.items.filter((item) =>
              item.name.toLowerCase().includes("femei")
          );
          const uniqueFemeiCategories = Array.from(
              new Map(
                  femeiCategoriesRaw.map((item) => [
                      item.name.toLowerCase(),
                      {
                          name: item.name,
                          href: `/femei/${item.name
                              .replace(/\s*-\s*femei/i, "") // elimină " - Femei"
                              .toLowerCase()
                              .normalize("NFD")
                              .replace(/[\u0300-\u036f]/g, "")
                              .replace(/\s+/g, "-")
                          }`,
                      },
                  ])
              ).values()
          );

          const barbatiCategoriesRaw = data.items.filter((item) =>
              item.name.toLowerCase().includes("barbati")
          );
        const uniqueBarbatiCategories = Array.from(
            new Map(
                barbatiCategoriesRaw.map((item) => [
                    item.name.toLowerCase(),
                    {
                        name: item.name,
                        href: `/barbati/${item.name
                            .replace(/\s*-\s*barbati/i, "") // elimină " - Femei"
                            .toLowerCase()
                            .normalize("NFD")
                            .replace(/[\u0300-\u036f]/g, "")
                            .replace(/\s+/g, "-")
                        }`,
                    },
                ])
            ).values()
        );
          const baietiCategoriesRaw = data.items.filter((item) =>
              item.name.toLowerCase().includes("baieti")
          );
        const uniqueBaietiCategories = Array.from(
            new Map(
                baietiCategoriesRaw.map((item) => [
                    item.name.toLowerCase(),
                    {
                        name: item.name,
                        href: `/baieti/${item.name
                            .replace(/\s*-\s*baieti/i, "") // elimină " - Femei"
                            .toLowerCase()
                            .normalize("NFD")
                            .replace(/[\u0300-\u036f]/g, "")
                            .replace(/\s+/g, "-")
                        }`,
                    },
                ])
            ).values()
        );
          const fetiteCategoriesRaw = data.items.filter((item) =>
              item.name.toLowerCase().includes("fetite")
          );
        const uniqueFetiteCategories = Array.from(
            new Map(
                fetiteCategoriesRaw.map((item) => [
                    item.name.toLowerCase(),
                    {
                        name: item.name,
                        href: `/fetite/${item.name
                            .replace(/\s*-\s*fetite/i, "") // elimină " - Femei"
                            .toLowerCase()
                            .normalize("NFD")
                            .replace(/[\u0300-\u036f]/g, "")
                            .replace(/\s+/g, "-")
                        }`,
                    },
                ])
            ).values()
        );

        setFemeiLinks(uniqueFemeiCategories);
        setBarbatLinks(uniqueBarbatiCategories);
        setBaietiLinks(uniqueBaietiCategories);
        setFetiteLinks(uniqueFetiteCategories);
      } catch (error) {
        console.error("❌ Failed to fetch Femei categories:", error);
      }
    };

    fetchFemeiLinks();
  }, []);




  return (
    <>
      {" "}
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
          Home
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
          Shop
          <i className="icon icon-arrow-down" />
        </a>
        <div className="sub-menu mega-menu">
          <div className="container">
            <div className="row">
              <div className="col-lg-2">
                <div className="mega-menu-item">
                  <div className="menu-heading">Femei</div>
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
                  <div className="menu-heading">Fetite</div>
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
                  <div className="menu-heading">Barbati</div>
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
                  <div className="menu-heading">Baieti</div>
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
                  <div className="menu-heading">Today's Top Picks</div>
                  <Swiper
                    dir="ltr"
                    className="swiper tf-product-header"
                    slidesPerView={2}
                    spaceBetween={20}
                  >
                    {products
                      .slice(1, 5)
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
          Products
          <i className="icon icon-arrow-down" />
        </a>
        <div className="sub-menu mega-menu">
          <div className="container">
            <div className="row">
                <div className="col-lg-3">
                    <div className="mega-menu-item">
                        <div className="menu-heading">Colectii</div>
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
                        <div className="menu-heading">Branduri</div>
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
                        <div className="menu-heading">Mai multe branduri</div>
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
                <div className="menu-heading">Best seller</div>
                <div className="sec-cls-header">
                  <div className="collection-position hover-img">
                    <Link to={`/shop-collection`} className="img-style">
                      <img
                        className="lazyload"
                        data-src="/images/collections/cls-header.jpg"
                        alt="banner-cls"
                        src="/images/collections/cls-header.jpg"
                        width={300}
                        height={400}
                      />
                    </Link>
                    <div className="content">
                      <div className="title-top">
                        <h4 className="title">
                          <Link
                            to={`/shop-collection`}
                            className="link text-white wow fadeInUp"
                          >
                            Shop our top picks
                          </Link>
                        </h4>
                        <p className="desc text-white wow fadeInUp">
                          Reserved for special occasions
                        </p>
                      </div>
                      <div>
                        <Link
                          to={`/shop-collection`}
                          className="tf-btn btn-md btn-white"
                        >
                          <span className="text">Shop Now</span>
                          <i className="icon icon-arrowUpRight" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </li>
        <a href="/contact" className="item-link">
            Contactează-ne
        </a>
    </>
  );
}
