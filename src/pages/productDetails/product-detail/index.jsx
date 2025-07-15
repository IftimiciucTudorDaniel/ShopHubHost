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
    const slug = params.slug;

    const [product, setProduct] = useState(null);
    useEffect(() => {
        fetch(`https://api.indulap.ro/umbraco/delivery/api/products/slug/${slug}`)
            .then((res) => {
                if (!res.ok) {
                    throw new Error("Failed to fetch product");
                }
                return res.json();
            })
            .then((data) => {
                const mappedProduct = {
                    id: data.id,
                    title: data.title,
                    imageUrl: data.imageUrl1 || "",
                    imageUrl2: data.imageUrl2 || "",
                    imageUrl3: data.imageUrl3 || "",
                    alt: data.alt,
                    affLink: data.affLink,
                    price: data.price,
                    brands: data.brands,
                    color: data.color,
                    category: data.category,
                    collection: data.collection,
                    gen: data.gen,
                    material: data.material,
                    longDescription: data.longDescription || "",
                };
                setProduct(mappedProduct);
            })
            .catch((error) => {
                console.error("Error fetching product:", error);
                setProduct(null);
            });
    }, [slug]);


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
