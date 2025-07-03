import React, {useEffect, useState} from "react";
import {slides} from "@/data/heroSlides.js";

export default function MarqueeSection2({ parentClass = "tf-marquee" }) {
  const [slide, setSlide] = useState([]);
  useEffect(() => {
    fetch("https://api.indulap.ro/umbraco/delivery/api/v2/content?filter=name%3AAbout")
        .then((res) => res.json())
        .then((data) => {
          const props = data?.items?.[0]?.properties;

          if (!props) return;
          const slides = {
            unu: props.text1 || "",
            doi: props.text2 || "",
          }
          setSlide(slides);
        })
  .catch(err => console.error("Fetch error:", err));
  }, []);
  return (
    <section className={parentClass}>
      <div className="marquee-wrapper">
        <div className="initial-child-container">
          <div className="marquee-child-item">
            <p className="text-btn-uppercase">
              {slides.unu}
            </p>
          </div>
          <div className="marquee-child-item">
            <span className="icon icon-lightning-line" />
          </div>
          <div className="marquee-child-item">
            <p className="text-btn-uppercase">
              {slides.doi}
            </p>
          </div>
          <div className="marquee-child-item">
            <span className="icon icon-lightning-line" />
          </div>
          {/* 2 */}
          <div className="marquee-child-item">
            <p className="text-btn-uppercase">
              {slide.unu}
            </p>
          </div>
          <div className="marquee-child-item">
            <span className="icon icon-lightning-line" />
          </div>
          <div className="marquee-child-item">
            <p className="text-btn-uppercase">
              {slide.doi}
            </p>
          </div>
          <div className="marquee-child-item">
            <span className="icon icon-lightning-line" />
          </div>
          {/* 3 */}
          <div className="marquee-child-item">
            <p className="text-btn-uppercase">
              {slide.unu}
            </p>
          </div>
          <div className="marquee-child-item">
            <span className="icon icon-lightning-line" />
          </div>
          <div className="marquee-child-item">
            <p className="text-btn-uppercase">
              {slide.doi}
            </p>
          </div>
          <div className="marquee-child-item">
            <span className="icon icon-lightning-line" />
          </div>
          {/* 4 */}
          <div className="marquee-child-item">
            <p className="text-btn-uppercase">
              {slide.unu}
            </p>
          </div>
          <div className="marquee-child-item">
            <span className="icon icon-lightning-line" />
          </div>
          <div className="marquee-child-item">
            <p className="text-btn-uppercase">
              {slide.doi}
            </p>
          </div>
          <div className="marquee-child-item">
            <span className="icon icon-lightning-line" />
          </div>
          {/* 5 */}
          <div className="marquee-child-item">
            <p className="text-btn-uppercase">
              {slide.unu}
            </p>
          </div>
          <div className="marquee-child-item">
            <span className="icon icon-lightning-line" />
          </div>
          <div className="marquee-child-item">
            <p className="text-btn-uppercase">
              {slide.doi}
            </p>
          </div>
          <div className="marquee-child-item">
            <span className="icon icon-lightning-line" />
          </div>
          {/* 6 */}
          <div className="marquee-child-item">
            <p className="text-btn-uppercase">
              {slide.unu}
            </p>
          </div>
          <div className="marquee-child-item">
            <span className="icon icon-lightning-line" />
          </div>
          <div className="marquee-child-item">
            <p className="text-btn-uppercase">
              {slide.doi}
            </p>
          </div>
          <div className="marquee-child-item">
            <span className="icon icon-lightning-line" />
          </div>
          <div className="marquee-child-item">
            <p className="text-btn-uppercase">
              {slide.unu}
            </p>
          </div>
          <div className="marquee-child-item">
            <span className="icon icon-lightning-line" />
          </div>
          <div className="marquee-child-item">
            <p className="text-btn-uppercase">
              {slide.doi}
            </p>
          </div>
          <div className="marquee-child-item">
            <span className="icon icon-lightning-line" />
          </div>
          <div className="marquee-child-item">
            <p className="text-btn-uppercase">
              {slide.unu}
            </p>
          </div>
          <div className="marquee-child-item">
            <span className="icon icon-lightning-line" />
          </div>
          <div className="marquee-child-item">
            <p className="text-btn-uppercase">
              {slide.doi}
            </p>
          </div>
          <div className="marquee-child-item">
            <span className="icon icon-lightning-line" />
          </div>
          <div className="marquee-child-item">
            <p className="text-btn-uppercase">
              {slide.unu}
            </p>
          </div>
          <div className="marquee-child-item">
            <span className="icon icon-lightning-line" />
          </div>
          <div className="marquee-child-item">
            <p className="text-btn-uppercase">
              {slide.doi}
            </p>
          </div>
          <div className="marquee-child-item">
            <span className="icon icon-lightning-line" />
          </div>
          <div className="marquee-child-item">
            <p className="text-btn-uppercase">
              {slide.unu}
            </p>
          </div>
          <div className="marquee-child-item">
            <span className="icon icon-lightning-line" />
          </div>
          <div className="marquee-child-item">
            <p className="text-btn-uppercase">
              {slide.doi}
            </p>
          </div>
          <div className="marquee-child-item">
            <span className="icon icon-lightning-line" />
          </div>
          <div className="marquee-child-item">
            <p className="text-btn-uppercase">
              {slide.unu}
            </p>
          </div>
          <div className="marquee-child-item">
            <span className="icon icon-lightning-line" />
          </div>
          <div className="marquee-child-item">
            <p className="text-btn-uppercase">
              {slide.doi}
            </p>
          </div>
          <div className="marquee-child-item">
            <span className="icon icon-lightning-line" />
          </div>
          <div className="marquee-child-item">
            <p className="text-btn-uppercase">
              {slide.unu}
            </p>
          </div>
          <div className="marquee-child-item">
            <span className="icon icon-lightning-line" />
          </div>
          <div className="marquee-child-item">
            <p className="text-btn-uppercase">
              {slide.doi}
            </p>
          </div>
          <div className="marquee-child-item">
            <span className="icon icon-lightning-line" />
          </div>
          <div className="marquee-child-item">
            <p className="text-btn-uppercase">
              {slide.unu}
            </p>
          </div>
          <div className="marquee-child-item">
            <span className="icon icon-lightning-line" />
          </div>
          <div className="marquee-child-item">
            <p className="text-btn-uppercase">
              {slide.doi}
            </p>
          </div>
          <div className="marquee-child-item">
            <span className="icon icon-lightning-line" />
          </div>
          <div className="marquee-child-item">
            <p className="text-btn-uppercase">
              {slide.unu}
            </p>
          </div>
          <div className="marquee-child-item">
            <span className="icon icon-lightning-line" />
          </div>
          <div className="marquee-child-item">
            <p className="text-btn-uppercase">
              {slide.doi}
            </p>
          </div>
          <div className="marquee-child-item">
            <span className="icon icon-lightning-line" />
          </div>
          <div className="marquee-child-item">
            <p className="text-btn-uppercase">
              {slide.unu}
            </p>
          </div>
          <div className="marquee-child-item">
            <span className="icon icon-lightning-line" />
          </div>
          <div className="marquee-child-item">
            <p className="text-btn-uppercase">
              {slide.doi}
            </p>
          </div>
          <div className="marquee-child-item">
            <span className="icon icon-lightning-line" />
          </div>
          <div className="marquee-child-item">
            <p className="text-btn-uppercase">
              {slide.unu}
            </p>
          </div>
          <div className="marquee-child-item">
            <span className="icon icon-lightning-line" />
          </div>
          <div className="marquee-child-item">
            <p className="text-btn-uppercase">
              {slide.doi}
            </p>
          </div>
          <div className="marquee-child-item">
            <span className="icon icon-lightning-line" />
          </div>
          <div className="marquee-child-item">
            <p className="text-btn-uppercase">
              {slide.unu}
            </p>
          </div>
          <div className="marquee-child-item">
            <span className="icon icon-lightning-line" />
          </div>
          <div className="marquee-child-item">
            <p className="text-btn-uppercase">
              {slide.doi}
            </p>
          </div>
          <div className="marquee-child-item">
            <span className="icon icon-lightning-line" />
          </div>
          <div className="marquee-child-item">
            <p className="text-btn-uppercase">
              {slide.unu}
            </p>
          </div>
          <div className="marquee-child-item">
            <span className="icon icon-lightning-line" />
          </div>
          <div className="marquee-child-item">
            <p className="text-btn-uppercase">
              {slide.doi}
            </p>
          </div>
          <div className="marquee-child-item">
            <span className="icon icon-lightning-line" />
          </div>
          <div className="marquee-child-item">
            <p className="text-btn-uppercase">
              {slide.unu}
            </p>
          </div>
          <div className="marquee-child-item">
            <span className="icon icon-lightning-line" />
          </div>
          <div className="marquee-child-item">
            <p className="text-btn-uppercase">
              {slide.doi}
            </p>
          </div>
          <div className="marquee-child-item">
            <span className="icon icon-lightning-line" />
          </div>
          <div className="marquee-child-item">
            <p className="text-btn-uppercase">
              {slide.unu}
            </p>
          </div>
          <div className="marquee-child-item">
            <span className="icon icon-lightning-line" />
          </div>
          <div className="marquee-child-item">
            <p className="text-btn-uppercase">
              {slide.doi}
            </p>
          </div>
          <div className="marquee-child-item">
            <span className="icon icon-lightning-line" />
          </div>
          <div className="marquee-child-item">
            <p className="text-btn-uppercase">
              {slide.unu}
            </p>
          </div>
          <div className="marquee-child-item">
            <span className="icon icon-lightning-line" />
          </div>
          <div className="marquee-child-item">
            <p className="text-btn-uppercase">
              {slide.doi}
            </p>
          </div>
          <div className="marquee-child-item">
            <span className="icon icon-lightning-line" />
          </div>
          <div className="marquee-child-item">
            <p className="text-btn-uppercase">
              {slide.unu}
            </p>
          </div>
          <div className="marquee-child-item">
            <span className="icon icon-lightning-line" />
          </div>
          <div className="marquee-child-item">
            <p className="text-btn-uppercase">
              {slide.doi}
            </p>
          </div>
          <div className="marquee-child-item">
            <span className="icon icon-lightning-line" />
          </div>
          <div className="marquee-child-item">
            <p className="text-btn-uppercase">
              {slide.unu}
            </p>
          </div>
          <div className="marquee-child-item">
            <span className="icon icon-lightning-line" />
          </div>
          <div className="marquee-child-item">
            <p className="text-btn-uppercase">
              {slide.doi}
            </p>
          </div>
          <div className="marquee-child-item">
            <span className="icon icon-lightning-line" />
          </div>
          <div className="marquee-child-item">
            <p className="text-btn-uppercase">
              {slide.unu}
            </p>
          </div>
          <div className="marquee-child-item">
            <span className="icon icon-lightning-line" />
          </div>
          <div className="marquee-child-item">
            <p className="text-btn-uppercase">
              {slide.doi}
            </p>
          </div>
          <div className="marquee-child-item">
            <span className="icon icon-lightning-line" />
          </div>
          <div className="marquee-child-item">
            <p className="text-btn-uppercase">
              {slide.unu}
            </p>
          </div>
          <div className="marquee-child-item">
            <span className="icon icon-lightning-line" />
          </div>
          <div className="marquee-child-item">
            <p className="text-btn-uppercase">
              {slide.doi}
            </p>
          </div>
          <div className="marquee-child-item">
            <span className="icon icon-lightning-line" />
          </div>
          <div className="marquee-child-item">
            <p className="text-btn-uppercase">
              {slide.unu}
            </p>
          </div>
          <div className="marquee-child-item">
            <span className="icon icon-lightning-line" />
          </div>
          <div className="marquee-child-item">
            <p className="text-btn-uppercase">
              {slide.doi}
            </p>
          </div>
          <div className="marquee-child-item">
            <span className="icon icon-lightning-line" />
          </div>
          <div className="marquee-child-item">
            <p className="text-btn-uppercase">
              {slide.unu}
            </p>
          </div>
          <div className="marquee-child-item">
            <span className="icon icon-lightning-line" />
          </div>
          <div className="marquee-child-item">
            <p className="text-btn-uppercase">
              {slide.doi}
            </p>
          </div>
          <div className="marquee-child-item">
            <span className="icon icon-lightning-line" />
          </div>
          <div className="marquee-child-item">
            <p className="text-btn-uppercase">
              {slide.unu}
            </p>
          </div>
          <div className="marquee-child-item">
            <span className="icon icon-lightning-line" />
          </div>
          <div className="marquee-child-item">
            <p className="text-btn-uppercase">
              {slide.doi}
            </p>
          </div>
          <div className="marquee-child-item">
            <span className="icon icon-lightning-line" />
          </div>
          <div className="marquee-child-item">
            <p className="text-btn-uppercase">
              {slide.unu}
            </p>
          </div>
          <div className="marquee-child-item">
            <span className="icon icon-lightning-line" />
          </div>
          <div className="marquee-child-item">
            <p className="text-btn-uppercase">
              {slide.doi}
            </p>
          </div>
          <div className="marquee-child-item">
            <span className="icon icon-lightning-line" />
          </div>
          <div className="marquee-child-item">
            <p className="text-btn-uppercase">
              {slide.unu}
            </p>
          </div>
          <div className="marquee-child-item">
            <span className="icon icon-lightning-line" />
          </div>
          <div className="marquee-child-item">
            <p className="text-btn-uppercase">
              {slide.doi}
            </p>
          </div>
          <div className="marquee-child-item">
            <span className="icon icon-lightning-line" />
          </div>
        </div>
      </div>
    </section>
  );
}
