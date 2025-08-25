import React from "react";
import RangeSlider from "react-range-slider-input";
import { useLocation, Link } from "react-router-dom";

export default function FilterSidebar({
                                          allProps,
                                          selectedCategory,
                                          availableColors,
                                          availableBrands,
                                          availableCategories,
                                          availableMaterials
                                      }) {
    const {
        price,
        setPrice,
        color,
        setColor,
        brands,
        setBrands,
        category,
        setCategory,
        setMaterial,
        clearFilter,
    } = allProps;

    const formatColorName = (c) => c?.charAt(0).toUpperCase() + c?.slice(1);
    const location = useLocation();
    const mainCategory = location.pathname.split("/")[1];

    // Verifică dacă există filtre active
    const hasActiveFilters = () => {
        // Verifică dacă prețul nu este la valorile implicite (0-1500)
        const isPriceFiltered = price[0] !== 0 || price[1] !== 1500;

        // Verifică dacă sunt selectate branduri
        const hasBrandFilter = brands && brands.length > 0;

        // Verifică dacă sunt selectate materiale
        const hasMaterialFilter = allProps.material && allProps.material.length > 0;

        // Verifică dacă este selectată o culoare specifică (nu "All")
        const hasColorFilter = color && color !== "All";

        // Verifică dacă este selectată o categorie
        const hasCategoryFilter = category && category !== "";

        return isPriceFiltered || hasBrandFilter || hasMaterialFilter || hasColorFilter || hasCategoryFilter;
    };

    return (
        <aside className="tf-sidebar">
            <div className="tf-sidebar-wrapper">

                <div className="widget-facet facet-categories">
                    <h6 className="facet-title">Categorii de produse</h6>
                    <ul className="facet-content scrollable-list">
                        {availableCategories.map((cat) => {
                            const knownGenders = ["femei", "barbati", "fetita", "baieti"];
                            let path = "";

                            if (knownGenders.includes(mainCategory.toLowerCase())) {
                                // ✅ Caz normal: mainCategory este genul
                                path = `/${mainCategory.toLowerCase()}/${cat.toLowerCase()}`;
                            } else {
                                // ❌ mainCategory NU e genul — deci probabil e categoria completă gen "pantofi-barbati"
                                const parts = cat.toLowerCase().split("-");
                                if (parts.length === 2 && knownGenders.includes(parts[1])) {
                                    path = `/${parts[1]}/${parts[0]}`; // gen/categorie
                                } else {
                                    path = `/${cat.toLowerCase()}`; // fallback simplu
                                }
                            }

                            return (
                                <li key={cat}>
                                    <Link to={path} className="categories-item">
                                        {cat.split('-')[0]}
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                </div>

                <div className="widget-facet facet-price">
                    <h6 className="facet-title">Preț</h6>

                    <RangeSlider
                        min={0}
                        max={1500}
                        value={allProps.price}
                        onInput={(value) => allProps.setPrice(value)}
                    />

                    <div className="box-price-product mt-3">
                        <div className="box-price-item">
                            <span className="title-price">Preț minim</span>
                            <div className="price-val" data-currency="Ron">
                                {allProps.price[0]}
                            </div>
                        </div>
                        <div className="box-price-item">
                            <span className="title-price">Preț maxim</span>
                            <div className="price-val" data-currency="Ron">
                                {allProps.price[1]}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="widget-facet facet-fieldset">
                    <h6 className="facet-title">Branduri</h6>
                    <div className="box-fieldset-item scrollable-list">
                        {availableBrands.map((brand) => (
                            <fieldset
                                key={brand}
                                className="fieldset-item"
                                onClick={() => allProps.setBrands(brand)}
                            >
                                <input
                                    type="checkbox"
                                    name="brand"
                                    className="tf-check"
                                    readOnly
                                    checked={allProps.brands.includes(brand)}
                                />
                                <label>
                                    {brand}
                                </label>
                            </fieldset>
                        ))}
                    </div>
                </div>

                <div className="widget-facet facet-fieldset">
                    <h6 className="facet-title">Material</h6>
                    <div className="box-fieldset-item scrollable-list">
                        {availableMaterials.map((material) => (
                            <fieldset
                                key={material}
                                className="fieldset-item"
                                onClick={() => allProps.setMaterial(material)}
                            >
                                <input
                                    type="checkbox"
                                    name="brand"
                                    className="tf-check"
                                    readOnly
                                    checked={allProps.material.includes(material)}
                                />
                                <label>
                                    {material}
                                </label>
                            </fieldset>
                        ))}
                    </div>
                </div>

                <div className="widget-facet facet-color ">
                    <h6 className="facet-title">Culori</h6>
                    <div className="facet-color-box scrollable-list">
                        {availableColors.map((c, index) => (
                            <div
                                key={index}
                                onClick={() => allProps.setColor(c)}
                                className={`color-item color-check ${
                                    allProps.color === c ? "active" : ""
                                }`}
                            >
                                {formatColorName(c)}
                            </div>
                        ))}
                        <div
                            onClick={() => allProps.setColor("All")}
                            className={`color-item color-check ${
                                allProps.color === "All" ? "active" : ""
                            }`}
                        >
                            Toate culorile
                        </div>
                    </div>
                </div>

                {/* Afișează butonul doar dacă există filtre active */}
                {hasActiveFilters() && (
                    <div className="tf-widget-filter">
                        <button className="btn btn-outline-primary" onClick={clearFilter}>
                            Ștergeți filtrele
                        </button>
                    </div>
                )}
            </div>
        </aside>
    );
}