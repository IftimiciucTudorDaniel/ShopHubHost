import React from "react";

export default function Pagination({ currentPage, totalPages, onPageChange }) {
    if (totalPages <= 1) return null; // ✅ Hide pagination if only one page

    const handlePageClick = (page) => {
        if (page >= 1 && page <= totalPages && page !== currentPage) {
            onPageChange(page);
        }
    };

    const renderPageNumbers = () => {
        const pages = [];
        const maxVisible = 1; // ✅ Show 1 before and 1 after

        // Show first page and ellipsis if needed
        if (currentPage > maxVisible + 2) {
            pages.push(1, "...");
        } else {
            for (let i = 1; i < currentPage; i++) {
                if (i <= currentPage - maxVisible && i !== 1) continue;
                pages.push(i);
            }
        }

        // Pages around current
        for (let i = currentPage - maxVisible; i <= currentPage + maxVisible; i++) {
            if (i >= 1 && i <= totalPages && !pages.includes(i)) {
                pages.push(i);
            }
        }

        // Show ellipsis and last page if needed
        if (currentPage < totalPages - maxVisible - 1) {
            pages.push("...", totalPages);
        } else {
            for (let i = currentPage + 1; i <= totalPages; i++) {
                if (i >= currentPage + maxVisible + 2) continue;
                pages.push(i);
            }
        }

        return pages.map((page, index) => (
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
        <ul className="pagination pt-5">
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
