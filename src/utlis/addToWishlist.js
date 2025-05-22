function addToWishlist(product) {
  const current = JSON.parse(localStorage.getItem("wishlist")) || [];
  const updated = [...current, product];
  localStorage.setItem("wishlist", JSON.stringify(updated));
}
