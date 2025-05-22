import { useState } from "react";

const sizes = [
  { id: "values-s", value: "S", price: 79.99, disabled: false },
  { id: "values-m", value: "M", price: 79.99, disabled: false },
  { id: "values-l", value: "L", price: 89.99, disabled: false },
  { id: "values-xl", value: "XL", price: 89.99, disabled: false },
  { id: "values-xxl", value: "XXL", price: 89.99, disabled: true },
];

export default function SizeSelect() {
  const [selectedSize, setSelectedSize] = useState("L"); // Default value is "L"

  const handleChange = (value) => {
    setSelectedSize(value);
  };
  return (
    <div className="variant-picker-item">
      <div className="d-flex justify-content-between mb_12">
        <div className="variant-picker-label">
          <a
              href="#size-guide"
              data-bs-toggle="modal"
              className="btn-style-4 flex-grow-1  fw-6 size-guide text-title link"
          >
            Size Guide
          </a>
        </div>
      </div>
    </div>
  );
}
