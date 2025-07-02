import Footer1 from "@/components/footers/Footer1";
import Header1 from "@/components/headers/Header1";
import Topbar6 from "@/components/headers/Topbar6";
import Breadcumb from "@/components/productDetails/Breadcumb";
import Descriptions1 from "@/components/productDetails/descriptions/Descriptions1";
import Details1 from "@/components/productDetails/details/Details1";
import RelatedProducts from "@/components/productDetails/RelatedProducts";
import React from "react";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import MetaComponent from "@/components/common/MetaComponent";
const metadata = {
  title: "InDulap.ro",
};

export default function ProductDetailPage() {
  let params = useParams();
  const id = params.id;

    const [product, setProduct] = useState(null);
    useEffect(() => {
        fetch(`https://api.indulap.ro/umbraco/delivery/api/v1/content/item/${id}`)
            .then((res) => {
                if (!res.ok) {
                    throw new Error("Failed to fetch product");
                }
                return res.json();
            })
            .then((data) => {
                const imageUrl1 = data.properties?.image1 || null;
                const imageUrl2 = data.properties?.image2 || null;
                const imageUrl3 = data.properties?.image3 || null;
                const mappedProduct = {
                    id: data.id,
                    title: data.name,
                    imageUrl: imageUrl1 || "",
                    imageUrl2: imageUrl2 || "",
                    imageUrl3: imageUrl3 || "",
                    alt: data.name,
                    affLink: data.properties?.affLink || "",
                    price: data.properties?.price || null,
                    brands: data.properties?.brand || null,
                    color: data.properties?.color || null,
                    category: data.properties?.categories?.[0]?.name || [],
                    longDescription: data.properties?.longDescription?.markup || "",

                };
                setProduct(mappedProduct);
            })
            .catch((error) => {
                console.error("Error fetching product:", error);
                setProduct(null); // Optional: Handle error state
            });
    }, [id]);

    if (!product) return <div>Loading...</div>;
    return (
        <>
            <MetaComponent meta={metadata}/>
            <Topbar6 bgColor="bg-main"/>
            <Header1/>
            <Breadcumb product={product}/>
            <Details1 product={product}/>
            <Descriptions1 product={product}/>
            <RelatedProducts product={product}/>
            <Footer1 hasPaddingBottom/>
        </>
    );
}
