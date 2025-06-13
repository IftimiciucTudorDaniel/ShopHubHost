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
    return (
        <aside className="tf-sidebar">
            <div className="tf-sidebar-wrapper">

                <div className="widget-facet facet-categories">
                    <h6 className="facet-title">Product Categories</h6>
                    <ul className="facet-content scrollable-list">
                        {availableCategories.map((cat) => (
                            <li key={cat}>
                                <Link
                                    to={`/${mainCategory}/${cat.toLowerCase()}`}
                                    className="categories-item"
                                >
                                    {cat}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="widget-facet facet-price">
                    <h6 className="facet-title">Price</h6>

                    <RangeSlider
                        min={0}
                        max={1000}
                        value={allProps.price}
                        onInput={(value) => allProps.setPrice(value)}
                    />

                    <div className="box-price-product mt-3">
                        <div className="box-price-item">
                            <span className="title-price">Min price</span>
                            <div className="price-val" data-currency="$">
                                {allProps.price[0]}
                            </div>
                        </div>
                        <div className="box-price-item">
                            <span className="title-price">Max price</span>
                            <div className="price-val" data-currency="$">
                                {allProps.price[1]}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="widget-facet facet-fieldset">
                    <h6 className="facet-title">Brands</h6>
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
                    <h6 className="facet-title">Colors</h6>
                    <div className="facet-color-box scrollable-list">
                        {availableColors.map((c, index) => (
                            <div
                                key={index}
                                onClick={() => allProps.setColor(c)}
                                className={`color-item color-check ${
                                    allProps.color === c ? "active" : ""
                                }`}
                            >
                                <span className={`color ${c.toLowerCase().replace(/\s+/g, '-')}`} />
                                {formatColorName(c)}
                            </div>
                        ))}
                        <div
                            onClick={() => allProps.setColor("All")}
                            className={`color-item color-check ${
                                allProps.color === "All" ? "active" : ""
                            }`}
                        >
                            <span className="color all-colors" />
                            All Colors
                        </div>
                    </div>
                </div>


                {/*<div className="tf-widget-filter">*/}
                {/*    <h4 className="title-widget">Categories</h4>*/}
                {/*    <ul className="list-checkbox">*/}
                {/*        {availableCategories.map((cat) => (*/}
                {/*            <li key={cat}>*/}
                {/*                <label>*/}
                {/*                    <input*/}
                {/*                        type="radio"*/}
                {/*                        name="category"*/}
                {/*                        checked={category === cat}*/}
                {/*                        onChange={() => setCategory(cat)}*/}
                {/*                    />*/}
                {/*                    <span>{cat}</span>*/}
                {/*                </label>*/}
                {/*            </li>*/}
                {/*        ))}*/}
                {/*        <li>*/}
                {/*            <label>*/}
                {/*                <input*/}
                {/*                    type="radio"*/}
                {/*                    name="category"*/}
                {/*                    checked={!category}*/}
                {/*                    onChange={() => setCategory("")}*/}
                {/*                />*/}
                {/*                <span>All Categories</span>*/}
                {/*            </label>*/}
                {/*        </li>*/}
                {/*    </ul>*/}
                {/*</div>*/}

                <div className="tf-widget-filter">
                    <button className="btn btn-outline-primary" onClick={clearFilter}>
                        Clear Filters
                    </button>
                </div>
            </div>
        </aside>
    );
}
