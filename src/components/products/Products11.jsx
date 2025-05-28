import LayoutHandler from "./LayoutHandler";
import Sorting from "./Sorting";
import Listview from "./Listview";
import GridView from "./GridView";
import { useEffect, useReducer, useState } from "react";
import FilterModal from "./FilterModal";
import { initialState, reducer } from "@/reducer/filterReducer";
import FilterMeta from "./FilterMeta";
import FilterSidebar from "./FilterSidebar";
import { useParams } from "react-router-dom";
import Pagination from "@/components/common/Pagination";


export default function Products11({ selectedCategory, gen }) {
  const [products, setProducts] = useState([]);
  const [availableColors, setAvailableColors] = useState([]);
  const [availableBrands, setAvailableBrands] = useState([]);
  const [availableCategories, setAvailableCategories] = useState([]);
  const [availableMaterials, setAvailableMaterials] = useState([]);availableMaterials

  const { category: routeCategory, slug, brand: routeBrand } = useParams();
  const [loading, setLoading] = useState(false);
  const [activeLayout, setActiveLayout] = useState(4);

  const normalize = (str) =>
      String(str || "")
          .toLowerCase()
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .replace(/\s+/g, "-");


  const [state, dispatch] = useReducer(reducer, initialState);
  const {
    price, color, brands, category, filtered, sortingOption, sorted, material
  } = state;

  const allProps = {
    ...state,
    setPrice: (value) => dispatch({ type: "SET_PRICE", payload: value }),
    setMaterial: (newmat) => {
      const updated = material.includes(newmat)
          ? material.filter((b) => b !== newmat)
          : [...material, newmat];
      dispatch({ type: "SET_MATERIAL", payload: updated });
    },
    removeMaterial: (materialToRemove) => {
      dispatch({ type: "SET_MATERIAL", payload: material.filter((b) => b !== materialToRemove) });
    },
    setColor: (value) =>
        value === color
            ? dispatch({ type: "SET_COLOR", payload: "All" })
            : dispatch({ type: "SET_COLOR", payload: value }),
    setCategory: (value) =>
        value === category
            ? dispatch({ type: "SET_CATEGORY", payload: "" })
            : dispatch({ type: "SET_CATEGORY", payload: value }),
    setBrands: (newBrand) => {
      const updated = brands.includes(newBrand)
          ? brands.filter((b) => b !== newBrand)
          : [...brands, newBrand];
      dispatch({ type: "SET_BRANDS", payload: updated });
    },
    removeBrand: (brandToRemove) => {
      dispatch({ type: "SET_BRANDS", payload: brands.filter((b) => b !== brandToRemove) });
    },
    setSortingOption: (value) =>
        dispatch({ type: "SET_SORTING_OPTION", payload: value }),
    toggleFilterWithOnSale: () => dispatch({ type: "TOGGLE_FILTER_ON_SALE" }),
    setCurrentPage: (value) =>
        dispatch({ type: "SET_CURRENT_PAGE", payload: value }),
    setItemPerPage: (value) => {
      dispatch({ type: "SET_CURRENT_PAGE", payload: 1 });
      dispatch({ type: "SET_ITEM_PER_PAGE", payload: value });
    },
    clearFilter: () => dispatch({ type: "CLEAR_FILTER" }),
  };

  useEffect(() => {
    const gender = gen;
    const categoryParam = selectedCategory;
    const brand = routeBrand;
    const collection = slug;

    const queryParams = new URLSearchParams();
    if (gender) queryParams.append("gen", gen);
    if (categoryParam) queryParams.append("category", categoryParam);
    if (brand) queryParams.append("brand", brand);
    if (collection) queryParams.append("collection", collection);

    setLoading(true);
    fetch(`https://fashionhub-001-site1.jtempurl.com/umbraco/delivery/api/products?${queryParams.toString()}`)
        .then(res => res.json())
        .then(data => {
          setProducts(data);
          dispatch({ type: "SET_FILTERED", payload: data });
          setLoading(false);

          setAvailableMaterials([...new Set(data.map((p) => p.material).filter(Boolean))]);
          setAvailableColors([...new Set(data.map((p) => p.color).filter(Boolean))]);
          setAvailableBrands([...new Set(data.map((p) => p.brands).filter(Boolean))]);
          setAvailableCategories([...new Set(data.map((p) => p.category).filter(Boolean))]);
        });
  }, [gen, selectedCategory, routeBrand, slug]);

  useEffect(() => {
    const normalize = (str) =>
        String(str || "")
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .replace(/\s+/g, "-");

    products.forEach((p, i) => {
      if (typeof p.color !== "string") {
        console.warn(`Non-string color at index ${i}:`, p.color);
      }
    });

    let filteredArrays = [];

    if (material.length > 0) {
      filteredArrays.push(
          products.filter(p =>
              p.material &&
              material.some(selectedMat => normalize(p.material) === normalize(selectedMat))
          )
      );
    }


    // Brand din URL
    if (routeBrand) {
      filteredArrays.push(products.filter(
          (p) => normalize(p.brands) === normalize(routeBrand)
      ));
    }

    // Collection din URL
    if (slug) {
      filteredArrays.push(products.filter(
          (p) => normalize(p.collection) === normalize(slug)
      ));
    }

    // Categorie selectată
    if (selectedCategory) {
      filteredArrays.push(products.filter(
          (p) => normalize(p.category).includes(normalize(selectedCategory))
      ));
    }

    if (brands.length > 0) {
      filteredArrays.push(
          products.filter((p) => {
            const productBrands = typeof p.brands === "string"
                ? p.brands.split(",").map((b) => normalize(b.trim()))
                : Array.isArray(p.brands)
                    ? p.brands.map((b) => normalize(b))
                    : [];

            return brands.some((selectedBrand) =>
                productBrands.includes(normalize(selectedBrand))
            );
          })
      );
    }

    // Culoare selectată
    if (color !== "All") {
      filteredArrays.push(products.filter(
          (p) => p.color && normalize(p.color) === normalize(color)
      ));
    }


    // Preț
    filteredArrays.push(products.filter(
        (p) => p.price >= price[0] && p.price <= price[1]
    ));

    const commonItems = products.filter((item) =>
        filteredArrays.every((arr) => arr.includes(item))
    );


    dispatch({ type: "SET_FILTERED", payload: commonItems });

    // Updatăm opțiunile disponibile
  }, [price, color, brands, products, category,material , slug, routeBrand, selectedCategory]);
  useEffect(() => {
    dispatch({ type: "CLEAR_FILTER" });
  }, [selectedCategory, routeBrand, slug]);
  useEffect(() => {
    let sortedItems = [...filtered];
    switch (sortingOption) {
      case "Price Ascending":
        sortedItems.sort((a, b) => a.price - b.price);
        break;
      case "Price Descending":
        sortedItems.sort((a, b) => b.price - a.price);
        break;
      case "Title Ascending":
        sortedItems.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case "Title Descending":
        sortedItems.sort((a, b) => b.title.localeCompare(a.title));
        break;
    }
    dispatch({ type: "SET_SORTED", payload: sortedItems });
    dispatch({ type: "SET_CURRENT_PAGE", payload: 1 });
  }, [filtered, sortingOption]);
  const startIndex = (state.currentPage - 1) * state.itemsPerPage;
  const endIndex = startIndex + state.itemsPerPage;
  const paginatedProducts = sorted.slice(startIndex, endIndex);

  const totalPages = Math.ceil(sorted.length / state.itemsPerPage);
  return (
      <>
        <section className="flat-spacing">
          <div className="container">
            <div className="tf-shop-control">
              <div className="tf-control-filter">
                <button className="filterShop tf-btn-filter hidden-mx-1200">
                  <span className="icon icon-filter" />
                  <span className="text">Filters</span>
                </button>
                <a
                    href="#filterShop"
                    data-bs-toggle="offcanvas"
                    aria-controls="filterShop"
                    className="tf-btn-filter show-mx-1200"
                >
                  <span className="icon icon-filter" />
                  <span className="text">Filters</span>
                </a>
              </div>
              <ul className="tf-control-layout">
                <LayoutHandler setActiveLayout={setActiveLayout} activeLayout={activeLayout} hasSidebar />
              </ul>
              <div className="tf-control-sorting">
                <p className="d-none d-lg-block text-caption-1">Sort by:</p>
                <Sorting allProps={allProps} />
              </div>
            </div>
            <div className="wrapper-control-shop">
              <FilterMeta productLength={sorted.length} allProps={allProps} />
              <div className="row">
                {/* DESKTOP Sidebar - doar pe ecrane mari */}
                <div className="col-xl-3 d-none d-xl-block">
                  <FilterSidebar
                      allProps={allProps}
                      selectedCategory={selectedCategory}
                      availableColors={availableColors}
                      availableBrands={availableBrands}
                      availableCategories={availableCategories}
                      availableMaterials={availableMaterials}
                  />

                </div>

                {/* MOBIL Sidebar - offcanvas Bootstrap activat din butonul Filters */}
                <div
                    className="offcanvas offcanvas-start"
                    tabIndex="-1"
                    id="filterShop"
                    aria-labelledby="filterShopLabel"
                >
                  <div className="offcanvas-header">
                    <h5 className="offcanvas-title" id="filterShopLabel">Filters</h5>
                    <button
                        type="button"
                        className="btn-close"
                        data-bs-dismiss="offcanvas"
                        aria-label="Close"
                    ></button>
                  </div>
                  <div className="offcanvas-body">
                    <FilterSidebar
                        allProps={allProps}
                        selectedCategory={selectedCategory}
                        availableColors={availableColors}
                        availableBrands={availableBrands}
                        availableCategories={availableCategories}
                        availableMaterials={availableMaterials}
                    />
                  </div>
                </div>

                <div className="col-xl-9">
                  {loading ? (
                      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "300px" }}>
                        <div className="spinner-border text-primary" role="status">
                          <span className="visually-hidden">Loading...</span>
                        </div>
                      </div>
                  ) : activeLayout === 1 ? (
                      <div className="tf-list-layout wrapper-shop" id="listLayout">
                        <Listview products={paginatedProducts} />
                      </div>
                  ) : (
                      <div className={`tf-grid-layout wrapper-shop tf-col-${activeLayout}`} id="gridLayout">
                        <GridView products={paginatedProducts} />
                      </div>
                  )}
                  <ul className="wg-pagination justify-content-center">
                    <Pagination
                        currentPage={state.currentPage}
                        totalPages={totalPages}
                        onPageChange={(page) =>
                            dispatch({ type: "SET_CURRENT_PAGE", payload: page })
                        }
                    />
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
        <FilterModal allProps={allProps} />
      </>
  );
}
