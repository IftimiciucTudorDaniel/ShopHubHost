import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Link } from "react-router-dom";
import { Navigation, Pagination } from "swiper/modules";

export default function Collections() {
  const [collections, setCollections] = useState([]);

    useEffect(() => {
        fetch("https://api.indulap.ro/umbraco/delivery/api/v2/content?filter=contentType:categoryPage")
            .then((res) => res.json())
            .then((data) => {
                const categories = data.items.map((item) => {
                    const image = item.properties?.image?.[0];
                    const imageUrl = image ? `https://indulap-001-site1.mtempurl.com${image.url}` : null;
                    return {
                        title: item.name,
                        link: item.route?.path || "#",
                        imageUrl: imageUrl,
                        alt: item.name
                    };
                });
                setCollections(categories);
            });
    }, []);


    return (
      <section className="flat-spacing-2 pb_0">
        <div className="container">
          <div className="heading-section-2 wow fadeInUp">
            <h3>Categories you might like</h3>
            <Link to={`/shop-collection`} className="btn-line">
              View All Collection
            </Link>
          </div>
          <div
              className="flat-collection-circle wow fadeInUp"
              data-wow-delay="0.1s"
          >
            <Swiper
                dir="ltr"
                slidesPerView={5}
                spaceBetween={20}
                breakpoints={{
                  1200: { slidesPerView: 5, spaceBetween: 20 },
                  1000: { slidesPerView: 4, spaceBetween: 20 },
                  768: { slidesPerView: 3, spaceBetween: 20 },
                  480: { slidesPerView: 2, spaceBetween: 15 },
                  0: { slidesPerView: 2, spaceBetween: 15 },
                }}
                modules={[Pagination, Navigation]}
                pagination={{
                  clickable: true,
                  el: ".spd54",
                }}
                navigation={{
                  prevEl: ".snbp12",
                  nextEl: ".snbn12",
                }}
            >
              {collections.map((collection, index) => (
                  <SwiperSlide key={index}>
                    <div className="collection-circle hover-img">
                      <Link to={`/shop-collection`} className="img-style">
                        <img
                            className="lazyload"
                            data-src={collection.imgSrc}
                            src={collection.imageUrl || "https://via.placeholder.com/363"}
                            alt={collection.alt}
                            width={363}
                            height={363}
                        />
                      </Link>
                      <div className="collection-content text-center">
                        <div>
                          <Link to={`/shop-collection`} className="cls-title">
                            <h6 className="text">{collection.title}</h6>
                            <i className="icon icon-arrowUpRight" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
              ))}
            </Swiper>
            <div className="d-flex d-lg-none sw-pagination-collection sw-dots type-circle justify-content-center spd54" />
            <div className="nav-prev-collection d-none d-lg-flex nav-sw style-line nav-sw-left snbp12">
              <i className="icon icon-arrLeft" />
            </div>
            <div className="nav-next-collection d-none d-lg-flex nav-sw style-line nav-sw-right snbn12">
              <i className="icon icon-arrRight" />
            </div>
          </div>
        </div>
      </section>
  );
}
