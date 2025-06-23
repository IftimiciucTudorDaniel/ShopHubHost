import React, {useEffect, useState} from "react";

import { Link } from "react-router-dom";
export default function Banner() {
  const [collections, setCollections] = useState([]);
  useEffect(() => {
    fetch("https://indulap-001-site1.mtempurl.com/umbraco/delivery/api/v2/content?filter=contentType%3AcollectionPage")
        .then((res) => res.json())
        .then((data) => {
          const collections = data.items.map((item) => {
            const image = item.properties?.image?.[0];
            const imageUrl = image ? `https://indulap-001-site1.mtempurl.com/${image.url}` : null;
            return {
              imageUrl: imageUrl,
            };
          });
          setCollections(collections);
        });
  }, []);
  return (
    <section>
      <div className="container">
        <div className="flat-img-with-text">
          <div className="banner banner-left wow fadeInLeft">
            <img
              alt="banner"
              src="https://a.cdnmp.net/129520705/p/l/7/espadrile-hiba-galbene~8591997.jpg"
              width={400}
              height={400}
            />
          </div>
          <div className="banner-content">
            <div className="content-text wow fadeInUp">
              <h3 className="title text-center fw-5">
                Colecțiile Noi! <br />
                Te așteaptă!
              </h3>
              <p className="desc">Fii primul care le descopera</p>
            </div>
            <Link
              to={`/femei`}
              className="tf-btn btn-fill wow fadeInUp"
            >
              <span className="text">Explorează Colecțiile</span>
              <i className="icon icon-arrowUpRight" />
            </Link>
          </div>
          <div className="banner banner-right wow fadeInRight">
            <img
              alt="banner"
              src="https://a.cdnmp.net/129520705/p/l/7/cizme-kenzo-negre~8556197.jpg"
              width={400}
              height={400}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
