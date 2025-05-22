import React, {useEffect, useState} from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import { Link } from "react-router-dom";
import { Pagination } from "swiper/modules";
import {getTodaysTopClickedProducts} from "@/utlis/analytics.js";
export default function Hero() {
    const [slide, setSlide] = useState([]);
    useEffect(() => {
        fetch(`https://githubhost.netlify.app/umbraco/delivery/api/v2/content?filter=name%3AAbout`)
            .then((res) => {
                if (!res.ok) {
                    throw new Error("Failed to fetch slider");
                }
                return res.json();
            })
            .then((data) => {
                const content = data.items?.[0];
                const slides = [
                    {
                        imgSrc: content?.properties?.imageUrl1 || null,
                        alt: "Slide 1",
                        heading: content?.properties?.title || "",
                        text: content?.properties?.subTitle || "",
                        btnText: content?.properties?.butonName || "",
                    },
                    {
                        imgSrc: content?.properties?.imageUrl2 || null,
                        alt: "Slide 2",
                        heading: content?.properties?.title2 || "",
                        text: content?.properties?.subtitle2 || "",
                        btnText: content?.properties?.butonName2 || "",
                    },
                    {
                        imgSrc: content?.properties?.imageUrl3 || null,
                        alt: "Slide 3",
                        heading: content?.properties?.title3 || "",
                        text: content?.properties?.subtitle3 || "",
                        btnText: content?.properties?.butonName3 || "",
                    },
                ];
                setSlide(slides);
            })
            .catch((error) => {
                console.error("Error fetching slider:", error);
                setSlide(null);
            });
    }, []);

    return (
    <section className="tf-slideshow slider-style2 slider-effect-fade">
      <Swiper
        dir="ltr"
        spaceBetween={0}
        loop={true}
        autoplay={false}
        breakpoints={{
          1024: { slidesPerView: 1 },
          768: { slidesPerView: 1 },
          320: { slidesPerView: 1 },
        }}
        modules={[Pagination]}
        pagination={{
          clickable: true,
          el: ".spd30",
        }}
      >
        {slide.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="wrap-slider">
              <img
                alt={slide.alt}
                src={slide.imgSrc}
                width={1920}
                height={803}
              />
              <div className="box-content">
                <div className="container">
                  <div className="content-slider">
                    <div className="box-title-slider">
                      <div className="fade-item fade-item-1 heading title-display">
                        {slide.heading.split("<br/>").map((line, i) => (
                          <React.Fragment key={i}>
                            {line}
                            <br />
                          </React.Fragment>
                        ))}
                      </div>
                      <p className="fade-item fade-item-2 body-text-1">
                        {slide.text}
                      </p>
                    </div>
                    <div className="fade-item fade-item-3 box-btn-slider">
                      <Link
                        to={`/shop-default-grid`}
                        className="tf-btn btn-fill"
                      >
                        <span className="text">{slide.btnText}</span>
                        <i className="icon icon-arrowUpRight" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="wrap-pagination">
        <div className="container">
          <div className="sw-dots sw-pagination-slider type-circle justify-content-center spd30" />
        </div>
      </div>
    </section>
  );
}
