import { useEffect, useRef, useState } from "react";

import { images } from "@/data/singleProductSliders";
import {logDev} from "@/utlis/helpers.js";

export default function Grid5({
  activeColor = "gray",
  setActiveColor = () => {},
  item,
}) {
  // const finalItems = [...images];
  // images[0].src = firstItem ?? images[0].src;
    let finalItems = [];

    if (item.hasOwnProperty("imageUrl1") && item.imageUrl1) {
        finalItems.push(item.imageUrl1);
    }

    if (item.hasOwnProperty("imageUrl2") && item.imageUrl2) {
        finalItems.push(item.imageUrl2);
    }

    if (item.hasOwnProperty("imageUrl3") && item.imageUrl3) {
        finalItems.push(item.imageUrl3);
    }

  // itemsFinal2[0].src = products[0].imgSrc;

  const observerRef = useRef(null);

  const scrollToTarget = () => {
    // Find the element with the specific data-value attribute
    const scrollContainerElemt = document.querySelector(".wrap-quick-view");
    const heightScroll = scrollContainerElemt.scrollTop;
    const targetElement = scrollContainerElemt.querySelector(
      `[data-scroll='${activeColor}']`
    );

    // Check if the element exists
    if (targetElement) {
      // Get the element's bounding rectangle
      setTimeout(() => {
        if (scrollContainerElemt?.scrollTop == heightScroll) {
          targetElement?.scrollIntoView({
            behavior: "smooth", // Smooth scrolling animation
            block: "center", // Center the element in the viewport
          });
        }
      }, 200);

      // Scroll only if the element is not already in view
    }
  };

  useEffect(() => {
    scrollToTarget();
  }, [activeColor]);

  useEffect(() => {
    const options = {
      rootMargin: "-50% 0px",
    };

    // Create the observer
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const scrollValue = entry.target.getAttribute("data-scroll");
          setActiveColor(scrollValue);
        }
      });
    }, options);

    // Observe all items
    const elements = document.querySelectorAll(".item-scroll-quickview");
    elements.forEach((el) => observer.observe(el));
    observerRef.current = observer;

    // Cleanup on unmount
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);
  return (
    <div className="tf-quick-view-image">
      <div className="wrap-quick-view wrapper-scroll-quickview">
        {/*{finalItems.map((link, index) => (*/}
        {/*  <a*/}
        {/*    className="quickView-item item-scroll-quickview"*/}
        {/*    data-scroll={link.dataScroll}*/}
        {/*    key={index}*/}
        {/*  >*/}
        {/*    <img*/}
        {/*      className="lazyload"*/}
        {/*      alt={""}*/}
        {/*      src={link.src}*/}
        {/*      width={600}*/}
        {/*      height={800}*/}
        {/*    />*/}
        {/*  </a>*/}
        {/*))}*/}
          {finalItems.length > 0 && finalItems.map((item, index) => (
              <a
                  className="quickView-item item-scroll-quickview"
                  key={index}
              >
                  <img
                      className="lazyload"
                      alt={""}
                      src={item}
                      width={600}
                      height={800}
                  />
              </a>
          ))}
      </div>
    </div>
  );
}
