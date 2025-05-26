import React, { useEffect, useRef, useState } from "react";

import { Link } from "react-router-dom";
import CurrencySelect from "../common/CurrencySelect";
import LanguageSelect from "../common/LanguageSelect";
import ToolbarBottom from "../headers/ToolbarBottom";
import ScrollTop from "../common/ScrollTop";
import { footerLinks } from "@/data/footerLinks";
export default function Footer1({
  border = true,
  dark = false,
  hasPaddingBottom = false,
}) {
  const [success, setSuccess] = useState(true);
  const [showMessage, setShowMessage] = useState(false);
  const [collections, setCollections] = useState([]);

  useEffect(() => {
    const fetchCollections = async () => {
      try {
        const res = await fetch("https://fashionhub-001-site1.jtempurl.com/umbraco/delivery/api/v2/content?filter=contentType%3AcollectionPage");
        const data = await res.json();

        const collections = data.items.map((item) => {
          const image = item.properties?.image?.[0];
          const imageUrl = image ? `https://localhost:44322${image.url}` : null;

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
        const uniqueCollections = Array.from(
            new Map(
                collections.map((item) => [
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
  const handleShowMessage = () => {
    setShowMessage(true);
    setTimeout(() => {
      setShowMessage(false);
    }, 2000);
  };

  const sendEmail = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    const email = e.target.email.value;

    try {
      const response = await axios.post(
        "https://express-brevomail.vercel.app/api/contacts",
        {
          email,
        }
      );

      if ([200, 201].includes(response.status)) {
        e.target.reset(); // Reset the form
        setSuccess(true); // Set success state
        handleShowMessage();
      } else {
        setSuccess(false); // Handle unexpected responses
        handleShowMessage();
      }
    } catch (error) {
      console.error("Error:", error.response?.data || "An error occurred");
      setSuccess(false); // Set error state
      handleShowMessage();
      e.target.reset(); // Reset the form
    }
  };
  useEffect(() => {
    const headings = document.querySelectorAll(".footer-heading-mobile");

    const toggleOpen = (event) => {
      const parent = event.target.closest(".footer-col-block");
      const content = parent.querySelector(".tf-collapse-content");

      if (parent.classList.contains("open")) {
        parent.classList.remove("open");
        content.style.height = "0px";
      } else {
        parent.classList.add("open");
        content.style.height = content.scrollHeight + 10 + "px";
      }
    };

    headings.forEach((heading) => {
      heading.addEventListener("click", toggleOpen);
    });

    // Clean up event listeners when the component unmounts
    return () => {
      headings.forEach((heading) => {
        heading.removeEventListener("click", toggleOpen);
      });
    };
  }, []); // Empty dependency array means this will run only once on mount
  return (
    <>
      <footer
        id="footer"
        className={`footer ${dark ? "bg-main" : ""} ${
          hasPaddingBottom ? "has-pb" : ""
        } `}
      >
        <div className={`footer-wrap ${!border ? "border-0" : ""}`}>
          <div className="footer-body">
            <div className="container">
              <div className="row">
                <div className="col-lg-4">
                  <div className="footer-infor">
                    <div className="footer-logo">
                      <Link to={`/`}>
                        <img
                          alt=""
                          src={
                            dark
                              ? "/images/logo/logo-white.svg"
                              : "/images/logo/logo.svg"
                          }
                        />
                      </Link>
                    </div>
                    <ul className="footer-info">
                      <li>
                        <i className="icon-mail" />
                        <p>themesflat@gmail.com</p>
                      </li>
                      <li>
                        <i className="icon-phone" />
                        <p>+40 (745) 757 086</p>
                      </li>
                    </ul>
                    {/*<ul*/}
                    {/*  className={`tf-social-icon  ${*/}
                    {/*    dark ? "style-white" : ""*/}
                    {/*  } `}*/}
                    {/*>*/}
                    {/*  {socialLinks.map((link, index) => (*/}
                    {/*    <li key={index}>*/}
                    {/*      <a href={link.href} className={link.className}>*/}
                    {/*        <i className={`icon ${link.iconClass}`} />*/}
                    {/*      </a>*/}
                    {/*    </li>*/}
                    {/*  ))}*/}
                    {/*</ul>*/}
                  </div>
                </div>
                <div className="col-lg-4">
                  <div className="footer-menu">
                    {footerLinks.map((section, sectionIndex) => (
                        <div className="footer-col-block" key={sectionIndex}>
                          <div className="footer-heading text-button footer-heading-mobile">
                            {section.heading}
                          </div>
                          <div className="tf-collapse-content">
                            <ul className="footer-menu-list">
                              {sectionIndex === 0 && (
                                  <li className="text-caption-1">
                                    <a
                                        href="#size-guide"
                                        data-bs-toggle="modal"
                                        className="footer-menu_item"
                                    >
                                      Size Guide
                                    </a>
                                  </li>
                              )}
                              {section.items
                                  .filter((item) => item.label !== "Size Guide")
                                  .map((item, itemIndex) => (
                                      <li className="text-caption-1" key={itemIndex}>
                                        {item.isLink ? (
                                            <Link to={item.href} className="footer-menu_item">
                                              {item.label}
                                            </Link>
                                        ) : (
                                            <a href={item.href} className="footer-menu_item">
                                              {item.label}
                                            </a>
                                        )}
                                      </li>
                                  ))}

                              {sectionIndex === 1 && collections.length > 0 && (
                                  <>
                                    {collections.map((collection, index) => (
                                        <li className="text-caption-1" key={`collection-${index}`}>
                                          <Link to={collection.link} className="footer-menu_item">
                                            {collection.name}
                                          </Link>
                                        </li>
                                    ))}
                                  </>
                              )}
                            </ul>
                          </div>
                        </div>
                    ))}
                  </div>
                </div>

                <div className="col-lg-4">
                  <div className="footer-col-block">
                    <div className="footer-heading text-button footer-heading-mobile">
                      Newletter
                    </div>
                    <div className="tf-collapse-content">
                      <div className="footer-newsletter">
                        <p className="text-caption-1">
                          Abonează-te la newsletterul nostru pentru a fi mereu la curent cu noutățile și ofertele exclusive.
                        </p>
                        <div
                          className={`tfSubscribeMsg  footer-sub-element ${
                            showMessage ? "active" : ""
                          }`}
                        >
                          {success ? (
                            <p style={{ color: "rgb(52, 168, 83)" }}>
                              You have successfully subscribed.
                            </p>
                          ) : (
                            <p style={{ color: "red" }}>Something went wrong</p>
                          )}
                        </div>
                        <form
                          onSubmit={sendEmail}
                          className={`form-newsletter subscribe-form ${
                            dark ? "style-black" : ""
                          }`}
                        >
                          <div className="subscribe-content">
                            <fieldset className="email">
                              <input
                                type="email"
                                name="email"
                                className="subscribe-email"
                                placeholder="Enter your e-mail"
                                tabIndex={0}
                                aria-required="true"
                              />
                            </fieldset>
                            <div className="button-submit">
                              <button
                                className="subscribe-button"
                                type="submit"
                              >
                                <i className="icon icon-arrowUpRight" />
                              </button>
                            </div>
                          </div>
                          <div className="subscribe-msg" />
                        </form>
                        <div className="tf-cart-checkbox">
                          <div className="tf-checkbox-wrapp">
                            <input
                              className=""
                              type="checkbox"
                              id="footer-Form_agree"
                              name="agree_checkbox"
                            />
                            <div>
                              <i className="icon-check" />
                            </div>
                          </div>
                          <label
                            className="text-caption-1"
                            htmlFor="footer-Form_agree"
                          >
                            Făcând clic pe abonare, sunteți de acord cu{" "}
                            <Link className="fw-6 link" to={`/term-of-use`}>
                              Terms of Service
                            </Link>{" "}
                            and{" "}
                            <a className="fw-6 link" href="#">
                              Privacy Policy
                            </a>
                            .
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <div className="container">
              <div className="row">
                <div className="col-12">
                  <div className="footer-bottom-wrap">
                    <div className="left">
                      <p className="text-caption-1">
                        ©{new Date().getFullYear()} Modave. All Rights Reserved.
                      </p>
                      <div className="tf-cur justify-content-end">
                        <div className="tf-currencies">
                          <CurrencySelect light={dark ? true : false} />
                        </div>
                        <div className="tf-languages">
                          <LanguageSelect
                            parentClassName={`image-select center style-default type-languages ${
                              dark ? "color-white" : ""
                            }`}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
      <ScrollTop hasPaddingBottom={hasPaddingBottom} />
      <ToolbarBottom />
    </>
  );
}
