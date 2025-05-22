
export function adaptUmbracoProduct(umbracoProduct) {
    return {
        id: umbracoProduct.id,
        title: umbracoProduct.name,
        price: umbracoProduct.price,
        oldPrice: umbracoProduct.oldPrice || null,
        imgSrc: umbracoProduct.images?.[0]?.url || "/images/no-image.jpg",
        images: umbracoProduct.images || [],
        categories: umbracoProduct.category || []
    };
}
