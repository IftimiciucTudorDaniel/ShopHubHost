import {productAdapter} from "@/utlis/productAdapter.js";

export async function fetchProduct(productId) {
    try{
    const res = await fetch(`/umbraco/delivery/api/v2/content/item/${productId}`);

    if (!res.ok) {
        throw new Error("Failed to fetch product");
    }
    return await res.json();
} catch (error) {
    console.error("Error fetching product:", error);
    throw error; // Aruncă eroarea pentru a fi gestionată în componentă
}
};
