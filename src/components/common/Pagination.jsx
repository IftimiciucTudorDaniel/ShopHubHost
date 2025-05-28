import React from "react";

export default function Pagination({ currentPage, totalPages, onPageChange }) {
    const handlePageClick = (page) => {
        if (page >= 1 && page <= totalPages && page !== currentPage) {
            onPageChange(page);
        }
    };

    const renderPageNumbers = () => {
        const pages = [];
        const maxVisible = 2;

        if (currentPage > maxVisible + 2) {
            pages.push(1, "...");
        } else {
            for (let i = 1; i < currentPage; i++) {
                if (i <= currentPage - maxVisible) continue;
                pages.push(i);
            }
        }

        for (let i = currentPage - maxVisible; i <= currentPage + maxVisible; i++) {
            if (i > 1 && i < totalPages) {
                pages.push(i);
            }
        }

        if (currentPage < totalPages - maxVisible - 1) {
            pages.push("...", totalPages);
        } else {
            for (let i = currentPage + 1; i <= totalPages; i++) {
                if (i >= currentPage + maxVisible + 1) continue;
                pages.push(i);
            }
        }

        return pages.map((page, index) => (
            <li
                key={index}
                className={page === currentPage ? "active" : ""}
                onClick={() => typeof page === "number" && handlePageClick(page)}
            >
                <div className="pagination-item text-button">{page}</div>
            </li>
        ));
    };

    return (
        <>
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
        </>
    );
}
