import React, {useEffect, useState} from "react";
import { Link, useLocation } from "react-router-dom";
import LanguageSelect from "../common/LanguageSelect";
import CurrencySelect from "../common/CurrencySelect";
import {
  blogLinks,
  demoItems,
  otherPageLinks,
  otherShopMenus,
  productFeatures,
  productLinks,
  productStyles,
  barbati,
  femei,
  swatchLinks,
} from "@/data/menu";
import {getTodaysTopClickedProducts} from "@/utlis/analytics.js";

export default function MobileMenu() {
  const { pathname } = useLocation();
  const [femeiLinks, setFemeiLinks] = useState([]);
  const [barbatLinks, setBarbatLinks] = useState([]);
  const [fetiteLinks, setFetiteLinks] = useState([]);
  const [baietiLinks, setBaietiLinks] = useState([]);
  const [collections, setCollections] = useState([]);
  const [products, setProducts] = useState([]);
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
                }));
          });

          Promise.all(productDetailsPromises)
              .then((fullProductDetails) => {
                setProducts(fullProductDetails);
              });
        })
        .catch((error) => console.error("Error fetching top clicked products:", error));
  }, []);

  useEffect(() => {
    const fetchCollections = async () => {
      try {
        const res = await fetch("http://188.214.88.51:5001/umbraco/delivery/api/v2/content?filter=contentType%3AcollectionPage");
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
        const res = await fetch("http://188.214.88.51:5001/umbraco/delivery/api/brands?take=20");
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
        const res = await fetch("http://188.214.88.51:5001/umbraco/delivery/api/v2/content?filter=contentType%3AcategoryPage&skip=0&take=400");
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
                    }`, // <-- ACEASTA A PARANTEZĂ LIPSEȘTE!
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
                    }`, // <-- ACEASTA A PARANTEZĂ LIPSEȘTE!
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
                    }`, // <-- ACEASTA A PARANTEZĂ LIPSEȘTE!
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
    <div className="offcanvas offcanvas-start canvas-mb" id="mobileMenu">
      <span
        className="icon-close icon-close-popup"
        data-bs-dismiss="offcanvas"
        aria-label="Close"
      />
      <div className="mb-canvas-content">
        <div className="mb-body">
          <div className="mb-content-top">
            <ul className="nav-ul-mb" id="wrapper-menu-navigation">
              <li className="nav-mb-item active">
                <Link to="/" className="item-link fw-bold mb-1">
                  Home
                </Link>
                <div id="dropdown-menu-one" className="collapse">
                  <ul className="sub-nav-menu">
                    {demoItems.map((link, i) => (
                      <li key={i}>
                        <Link
                          to={link.href}
                          className={`sub-nav-link ${
                            pathname.split("/")[1] == link.href.split("/")[1]
                              ? "active"
                              : ""
                          } `}
                        >
                          {link.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
              <li className="nav-mb-item">
                <a
                  href="#dropdown-menu-two"
                  className={`collapsed mb-menu-link ${
                    [
                      ...femei,
                      ...barbati,
                      ...productStyles,
                      ...otherShopMenus,
                    ].some(
                      (elm) => elm.href.split("/")[1] == pathname.split("/")[1]
                    )
                      ? "active"
                      : ""
                  } `}
                  data-bs-toggle="collapse"
                  aria-expanded="true"
                  aria-controls="dropdown-menu-two"
                >
                  <span>Produse</span>
                  <span className="btn-open-sub" />
                </a>
                <div id="dropdown-menu-two" className="collapse">
                  <ul className="sub-nav-menu">
                    <li>
                      <a
                        href="#sub-shop-one"
                        className={`sub-nav-link collapsed ${
                          [...femei].some(
                            (elm) =>
                              elm.href.split("/")[1] == pathname.split("/")[1]
                          )
                            ? "active"
                            : ""
                        } `}
                        data-bs-toggle="collapse"
                        aria-expanded="true"
                        aria-controls="sub-shop-one"
                      >
                        <span>Femei</span>
                        <span className="btn-open-sub" />
                      </a>
                      <div id="sub-shop-one" className="collapse">
                        <ul className="sub-nav-menu sub-menu-level-2">
                          {femeiLinks.slice(0,15).map((link) => (
                              <li key={link.name}>
                                <Link to={link.href} className="menu-link-text">{link.name?.split("-")[0]}</Link>
                              </li>
                          ))}
                        </ul>
                      </div>
                    </li>
                    <li>
                      <a
                        href="#sub-shop-two"
                        className={`sub-nav-link collapsed ${
                          [...barbati].some(
                            (elm) =>
                              elm.href.split("/")[1] == pathname.split("/")[1]
                          )
                            ? "active"
                            : ""
                        } `}
                        data-bs-toggle="collapse"
                        aria-expanded="true"
                        aria-controls="sub-shop-two"
                      >
                        <span>Fetite</span>
                        <span className="btn-open-sub" />
                      </a>
                      <div id="sub-shop-two" className="collapse">
                        <ul className="sub-nav-menu sub-menu-level-2">
                          {fetiteLinks.slice(0,15).map((link) => (
                              <li key={link.name}>
                                <Link to={link.href} className="menu-link-text">{link.name?.split("-")[0]}</Link>
                              </li>
                          ))}
                        </ul>
                      </div>
                    </li>
                    <li>
                      <a
                        href="#sub-shop-three"
                        className={`sub-nav-link collapsed ${
                          [...productStyles].some(
                            (elm) =>
                              elm.href.split("/")[1] == pathname.split("/")[1]
                          )
                            ? "active"
                            : ""
                        } `}
                        data-bs-toggle="collapse"
                        aria-expanded="true"
                        aria-controls="sub-shop-three"
                      >
                        <span>Barbati</span>
                        <span className="btn-open-sub" />
                      </a>
                      <div id="sub-shop-three" className="collapse">
                        <ul className="sub-nav-menu sub-menu-level-2">
                          {barbatLinks.slice(0,15).map((link) => (
                              <li key={link.name}>
                                <Link to={link.href} className="menu-link-text">{link.name?.split("-")[0]}</Link>
                              </li>
                          ))}
                        </ul>
                      </div>
                    </li>
                    <li>
                      <a
                        href="#sub-shop-four"
                        className={`sub-nav-link collapsed ${
                          [...otherShopMenus].some(
                            (elm) =>
                              elm.href.split("/")[1] == pathname.split("/")[1]
                          )
                            ? "active"
                            : ""
                        } `}
                        data-bs-toggle="collapse"
                        aria-expanded="true"
                        aria-controls="sub-shop-four"
                      >
                        <span>Baieti</span>
                        <span className="btn-open-sub" />
                      </a>
                      <div id="sub-shop-four" className="collapse">
                        <ul className="sub-nav-menu sub-menu-level-2">
                          {baietiLinks.slice(0,15).map((link) => (
                              <li key={link.name}>
                                <Link to={link.href} className="menu-link-text">{link.name?.split("-")[0]}</Link>
                              </li>
                          ))}
                        </ul>
                      </div>
                    </li>
                  </ul>
                </div>
              </li>
              <li className="nav-mb-item">
                <a
                  href="#dropdown-menu-three"
                  className={`collapsed mb-menu-link ${
                    [...productLinks, ...swatchLinks, ...productFeatures].some(
                      (elm) => elm.href.split("/")[1] == pathname.split("/")[1]
                    )
                      ? "active"
                      : ""
                  } `}
                  data-bs-toggle="collapse"
                  aria-expanded="true"
                  aria-controls="dropdown-menu-three"
                >
                  <span>Shop</span>
                  <span className="btn-open-sub" />
                </a>
                <div id="dropdown-menu-three" className="collapse">
                  <ul className="sub-nav-menu">
                    <li>
                      <a
                        href="#sub-product-one"
                        className={`sub-nav-link collapsed ${
                          [...productLinks].some(
                            (elm) =>
                              elm.href.split("/")[1] == pathname.split("/")[1]
                          )
                            ? "active"
                            : ""
                        } `}
                        data-bs-toggle="collapse"
                        aria-expanded="true"
                        aria-controls="sub-product-one"
                      >
                        <span>Colectii</span>
                        <span className="btn-open-sub" />
                      </a>
                      <div id="sub-product-one" className="collapse">
                        <ul className="sub-nav-menu sub-menu-level-2">
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
                    </li>
                    <li>
                      <a
                        href="#sub-product-two"
                        className={`sub-nav-link collapsed ${
                          [...swatchLinks].some(
                            (elm) =>
                              elm.href.split("/")[1] == pathname.split("/")[1]
                          )
                            ? "active"
                            : ""
                        } `}
                        data-bs-toggle="collapse"
                        aria-expanded="true"
                        aria-controls="sub-product-two"
                      >
                        <span>Branduri</span>
                        <span className="btn-open-sub" />
                      </a>
                      <div id="sub-product-two" className="collapse">
                        <ul className="sub-nav-menu sub-menu-level-2">
                          {chunkedBrands[0]?.map((brand) => (
                              <li key={brand.name} className="menu-item-li">
                                <Link to={brand.link} className="menu-link-text">{brand.name}</Link>
                              </li>
                          ))}
                        </ul>
                      </div>
                    </li>
                    <li>
                      <a
                        href="#sub-product-three"
                        className={`sub-nav-link collapsed ${
                          [...productFeatures].some(
                            (elm) =>
                              elm.href.split("/")[1] == pathname.split("/")[1]
                          )
                            ? "active"
                            : ""
                        } `}
                        data-bs-toggle="collapse"
                        aria-expanded="true"
                        aria-controls="sub-product-three"
                      >
                        <span>Branduri</span>
                        <span className="btn-open-sub" />
                      </a>
                      <div id="sub-product-three" className="collapse">
                        <ul className="sub-nav-menu sub-menu-level-2">
                          {chunkedBrands[1]?.map((brand) => (
                              <li key={brand.name} className="menu-item-li">
                                <Link to={brand.link} className="menu-link-text">{brand.name}</Link>
                              </li>
                          ))}
                        </ul>
                      </div>
                    </li>
                  </ul>
                </div>
              </li>
              <li className="nav-mb-item">
                <a
                  href="#dropdown-menu-four"
                  className={`collapsed mb-menu-link ${
                    [...blogLinks].some(
                      (elm) => elm.href.split("/")[1] == pathname.split("/")[1]
                    )
                      ? "active"
                      : ""
                  } `}
                  data-bs-toggle="collapse"
                  aria-expanded="true"
                  aria-controls="dropdown-menu-four"
                >
                  <span>Blog</span>
                  <span className="btn-open-sub" />
                </a>
                <div id="dropdown-menu-four" className="collapse">
                  <ul className="sub-nav-menu">
                    {blogLinks.map((link, i) => (
                      <li key={i}>
                        <Link
                          to={link.href}
                          className={`sub-nav-link ${
                            pathname.split("/")[1] == link.href.split("/")[1]
                              ? "active"
                              : ""
                          } `}
                        >
                          {link.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
              <li className="nav-mb-item">
                <a
                  href="#dropdown-menu-five"
                  className={`collapsed mb-menu-link ${
                    [...otherPageLinks].some(
                      (elm) => elm.href.split("/")[1] == pathname.split("/")[1]
                    )
                      ? "active"
                      : ""
                  } `}
                  data-bs-toggle="collapse"
                  aria-expanded="true"
                  aria-controls="dropdown-menu-five"
                >
                  <span>Pages</span>
                  <span className="btn-open-sub" />
                </a>
                <div id="dropdown-menu-five" className="collapse">
                  <ul className="sub-nav-menu">
                    {otherPageLinks.map((link, i) => (
                      <li key={i}>
                        <Link
                          to={link.href}
                          className={`sub-nav-link ${
                            pathname.split("/")[1] == link.href.split("/")[1]
                              ? "active"
                              : ""
                          } `}
                        >
                          {link.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            </ul>
          </div>
          <div className="mb-other-content">
            <div className="group-icon">
              <Link to={`/wish-list`} className="site-nav-icon">
                <svg
                  className="icon"
                  width={18}
                  height={18}
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M20.8401 4.60987C20.3294 4.09888 19.7229 3.69352 19.0555 3.41696C18.388 3.14039 17.6726 2.99805 16.9501 2.99805C16.2276 2.99805 15.5122 3.14039 14.8448 3.41696C14.1773 3.69352 13.5709 4.09888 13.0601 4.60987L12.0001 5.66987L10.9401 4.60987C9.90843 3.57818 8.50915 2.99858 7.05012 2.99858C5.59109 2.99858 4.19181 3.57818 3.16012 4.60987C2.12843 5.64156 1.54883 7.04084 1.54883 8.49987C1.54883 9.95891 2.12843 11.3582 3.16012 12.3899L4.22012 13.4499L12.0001 21.2299L19.7801 13.4499L20.8401 12.3899C21.3511 11.8791 21.7565 11.2727 22.033 10.6052C22.3096 9.93777 22.4519 9.22236 22.4519 8.49987C22.4519 7.77738 22.3096 7.06198 22.033 6.39452C21.7565 5.72706 21.3511 5.12063 20.8401 4.60987V4.60987Z"
                    stroke="#181818"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                Wishlist
              </Link>
            </div>
            <ul className="mb-info">
              <li>
                <i className="icon icon-mail" />
                <p>office@alpacas.ro</p>
              </li>
              <li>
                <i className="icon icon-phone" />
                <p>315-666-6688</p>
              </li>
            </ul>
          </div>
        </div>
        <div className="mb-bottom">
          <div className="bottom-bar-language">
            <div className="tf-currencies">
              <CurrencySelect />
            </div>
            <div className="tf-languages">
              <LanguageSelect parentClassName="image-select center style-default type-languages" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
