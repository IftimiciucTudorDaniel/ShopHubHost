import { useState } from "react";

function ColorDropdown({ colors, selectedColor, onSelectColor }) {
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => setIsOpen(!isOpen);

    return (
        <div className="widget-facet facet-color">
            <h6 className="facet-title">Colors</h6>
            <div className="dropdown">
                <button className="dropdown-toggle" onClick={toggleDropdown}>
                    {selectedColor || "Select a color"}
                    <span className="arrow">{isOpen ? "▲" : "▼"}</span>
                </button>
                {isOpen && (
                    <div className="dropdown-menu">
                        {colors.map((color, index) => (
                            <div
                                key={index}
                                className={`dropdown-item ${selectedColor === color.name ? "active" : ""}`}
                                onClick={() => {
                                    onSelectColor(color.name);
                                    setIsOpen(false);
                                }}
                            >
                                <span className={`color-dot ${color.className}`} /> {color.name}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
export default ColorDropdown;