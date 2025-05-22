import { allProducts } from "@/data/products";
import { openCartModal } from "@/utlis/openCartModal";
import { openWistlistModal } from "@/utlis/openWishlist";

import React, { useEffect, useState, createContext, useContext } from "react";

const DataContext = createContext();

export const useContextElement = () => useContext(DataContext);

export default function Context({ children }) {
  const [wishList, setWishList] = useState([]);
  const [quickViewItem, setQuickViewItem] = useState(null);
  const [quickAddItem, setQuickAddItem] = useState(1);

  const addToWishlist = (product) => {
    if (!wishList.find((item) => item.id === product.id)) {
      setWishList((prev) => [...prev, product]);
      openWistlistModal();
    }
  };

  const removeFromWishlist = (id) => {
    setWishList((prev) => prev.filter((item) => item.id !== id));
  };

  const isAddedtoWishlist = (id) => wishList.some((item) => item.id === id);


  useEffect(() => {
    let items = [];
    try {
      const raw = localStorage.getItem("wishlist");
      if (raw && raw !== "undefined") {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) {
          items = parsed;
        } else {
          localStorage.removeItem("wishlist");
        }
      }
    } catch (e) {
      console.error("Invalid JSON in wishlist:", e);
      localStorage.removeItem("wishlist");
    }
    setWishList(items);
  }, []);

  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishList));
  }, [wishList]);

  const contextValue = {
    removeFromWishlist,
    addToWishlist,
    isAddedtoWishlist,
    quickViewItem,
    wishList,
    setQuickViewItem,
    quickAddItem,
    setQuickAddItem,
  };

  return (
      <DataContext.Provider value={contextValue}>
        {children}
      </DataContext.Provider>
  );
}
