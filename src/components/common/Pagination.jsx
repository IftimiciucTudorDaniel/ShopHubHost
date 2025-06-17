import React, {useEffect} from "react";

export default function Pagination({ currentPage, totalPages, onPageChange }) {
    if (totalPages <= 1) return null; // ✅ Hide pagination if only one page


    const handlePageClick = (page) => {
        if (page >= 1 && page <= totalPages && page !== currentPage) {
            onPageChange(page);
        }
    };

    const renderPageNumbers = () => {
        const pages = new Set();
        const maxVisible = 1;

        // Always show first page
        pages.add(1);

        // Pages around current
        for (let i = currentPage - maxVisible; i <= currentPage + maxVisible; i++) {
            if (i > 1 && i < totalPages) {
                pages.add(i);
            }
        }

        // Always show last page
        pages.add(totalPages);

        const sortedPages = Array.from(pages).sort((a, b) => a - b);

        const result = [];
        let prev = 0;
        sortedPages.forEach((page) => {
            if (page - prev > 1) {
                result.push("...");
            }
            result.push(page);
            prev = page;
        });

        return result.map((page, index) => (
            <li
                key={index}
                className={`pagination-number ${page === currentPage ? "active" : ""}`}
                onClick={() => typeof page === "number" && handlePageClick(page)}
            >
                <div className="pagination-item text-button">{page}</div>
            </li>
        ));
    };

    return (
        <ul className="pagination pt-5 gap-2 user-select-none cursor-pointer">
            <li onClick={() => handlePageClick(currentPage - 1)}>
                <a
                    className={`pagination-item text-button ${
                        currentPage === 1 ? "disabled" : ""
                    }`}
                >
                    <i className="icon-arrLeft" />
                </a>
            </li>
            {renderPageNumbers()}
            <li onClick={() => handlePageClick(currentPage + 1)}>
                <a
                    className={`pagination-item text-button ${
                        currentPage === totalPages ? "disabled" : ""
                    }`}
                >
                    <i className="icon-arrRight" />
                </a>
            </li>
        </ul>
    );
}
