import "./styles/style.scss";
import { useEffect, useState } from "react";

import Context from "@/context/Context";
// import CartModal from "@/components/modals/CartModal";
import QuickView from "@/components/modals/QuickView";
import QuickAdd from "@/components/modals/QuickAdd";
// import Compare from "@/components/modals/Compare";
import MobileMenu from "@/components/modals/MobileMenu";
import SearchModal from "@/components/modals/SearchModal";
import SizeGuide from "@/components/modals/SizeGuide";
import Wishlist from "@/components/modals/Wishlist";
import Categories from "@/components/modals/Categories";
import { Route, Routes, useLocation } from "react-router-dom";
import HomePage from "./pages";
import HomeFashionElegentNestPage from "./pages/homes/home-fashion-eleganceNest";
import ShopLeftSidebarPage from "./pages/products/shop-left-sidebar";
import ShopFilterCanvasPage from "./pages/products/shop-filter-canvas";
import ShopCategoriesTopPage1 from "./pages/products/shop-categories-top";
import WishListPage from "./pages/other-pages/wish-list";
import SearchResultPage from "./pages/products/search-result";
import ProductDetailPage from "./pages/productDetails/product-detail";
import ProductExternalPage from "./pages/productDetails/product-external";
import ContactPage from "./pages/other-pages/contact";
import PageNotFoundPage from "./pages/not-found";
import WOW from "@/utlis/wow";
// import CompareProductsPage from "./pages/other-pages/compare-products";
function App() {
  const { pathname } = useLocation();
  useEffect(() => {
    if (typeof window !== "undefined") {
      // Import the script only on the client side
      import("bootstrap/dist/js/bootstrap.esm").then(() => {
        // Module is imported, you can access any exported functionality if
      });
    }
  }, []);
  useEffect(() => {
    const handleScroll = () => {
      const header = document.querySelector("header");
      if (!header) return; // ✅ prevent error if header is not in DOM yet
      header.classList.toggle("sticky", window.scrollY > 50);
      if (window.scrollY > 100) {
        header.classList.add("header-bg");
      } else {
        header.classList.remove("header-bg");
      }
    };

    window.addEventListener("scroll", handleScroll);

    // Cleanup function to remove event listener on component unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []); // Empty dependency array means this effect runs once on mount and cleans up on unmount

  const [scrollDirection, setScrollDirection] = useState("down");

  useEffect(() => {
    setScrollDirection("up");
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > 250) {
        if (currentScrollY > lastScrollY.current) {
          // Scrolling down
          setScrollDirection("down");
        } else {
          // Scrolling up
          setScrollDirection("up");
        }
      } else {
        // Below 250px
        setScrollDirection("down");
      }

      lastScrollY.current = currentScrollY;
    };

    const lastScrollY = { current: window.scrollY };

    // Add scroll event listener
    window.addEventListener("scroll", handleScroll);

    // Cleanup: remove event listener when component unmounts
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [pathname]);
  useEffect(() => {
    // Dynamically import Bootstrap
    import("bootstrap")
      .then((bootstrap) => {
        // Close any open modal
        const modalElements = document.querySelectorAll(".modal.show");
        modalElements.forEach((modal) => {
          const modalInstance = bootstrap.Modal.getInstance(modal);
          if (modalInstance) {
            modalInstance.hide();
          }
        });

        // Close any open offcanvas
        const offcanvasElements = document.querySelectorAll(".offcanvas.show");
        offcanvasElements.forEach((offcanvas) => {
          const offcanvasInstance = bootstrap.Offcanvas.getInstance(offcanvas);
          if (offcanvasInstance) {
            offcanvasInstance.hide();
          }
        });
      })
      .catch((error) => {
        console.error("Error loading Bootstrap:", error);
      });
  }, [pathname]); // Runs every time the route changes

  useEffect(() => {
    const header = document.querySelector("header");
    if (header) {
      if (scrollDirection == "up") {
        header.style.top = "0px";
      } else {
        header.style.top = "-185px";
      }
    }
  }, [scrollDirection]);
  useEffect(() => {
    const wow = new WOW({
      mobile: false,
      live: false,
    });
    wow.init();
  }, [pathname]);
  return (
    <>
      <Context>
        <div id="wrapper">
          <Routes>
            <Route path="/">
              <Route index element={<HomeFashionElegentNestPage />} />
              <Route
                path="home-fashion-eleganceNest"
                element={<HomeFashionElegentNestPage />}
              />

              {/*<Route path="femei" element={<ShopLeftSidebarPage />} />*/}
              {/*<Route path="femei/:category" element={<ShopLeftSidebarPage />} />*/}
              {/*/!*<Route path="/shop/:mainCategory/:subCategory" element={<Products11 />} />*!/*/}

              {/*<Route path="barbati" element={<ShopLeftSidebarPage />} />*/}
              {/*<Route path="barbati/:category" element={<ShopLeftSidebarPage />} />*/}

              {/*<Route path="fetite" element={<ShopLeftSidebarPage />} />*/}
              {/*<Route path="fetite/:category" element={<ShopLeftSidebarPage />} />*/}

              {/*<Route path="baieti" element={<ShopLeftSidebarPage />} />*/}
              {/*<Route path="baieti/:category" element={<ShopLeftSidebarPage />} />*/}

              <Route path=":gender" element={<ShopLeftSidebarPage />} />
              <Route path=":gender/:category" element={<ShopLeftSidebarPage />} />


              <Route path="colectii" element={<ShopLeftSidebarPage />} />
              <Route path="colectii/:slug" element={<ShopLeftSidebarPage />} />
              <Route path="colectii/:slug/:gender" element={<ShopLeftSidebarPage />} />
              <Route path="colectii/:category" element={<ShopLeftSidebarPage />} />

              <Route path="brand" element={<ShopLeftSidebarPage />} />
              <Route path="brand/:brand" element={<ShopLeftSidebarPage />} />

              {/*<Route path="baieti" element={<ShopLeftSidebarPage />} />*/}
              {/*<Route path="baieti/:category" element={<ShopLeftSidebarPage />} />*/}

              <Route
                path="toate-colectiile"
                element={<ShopFilterCanvasPage />}
              />
              <Route
                path="toate-categoriile"
                element={<ShopCategoriesTopPage1 />}
              />
              {/*<Route*/}
              {/*  path="shop-categories-top-02"*/}
              {/*  element={<ShopCategoriesTopPag2 />}*/}
              {/*/>*/}
              {/*<Route path="shop-collection" element={<ShopCollectionPage />} />*/}
              <Route path="wish-list" element={<WishListPage />} />

              <Route path="search-result" element={<SearchResultPage />} />

              <Route
                  path="detalii-produs/:slug"
                  element={<ProductDetailPage />}
              />


              <Route
                path="product-external/:id"
                element={<ProductExternalPage />}
              />


              <Route path="contact" element={<ContactPage />} />
              <Route path="404" element={<PageNotFoundPage />} />
              <Route path="*" element={<PageNotFoundPage />} />
            </Route>
          </Routes>
        </div>
        {/*<CartModal />*/}
        <QuickView />
        <QuickAdd />
        {/*<Compare />*/}
        <MobileMenu />

        {/*<NewsLetterModal />*/}
        <SearchModal />
        <SizeGuide />
        <Wishlist />
        <Categories />
      </Context>
    </>
  );
}

export default App;
