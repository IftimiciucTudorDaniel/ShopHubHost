import React, {useState, useEffect, useRef} from "react";
import ProductCard1 from "../productCards/ProductCard1";

export default function SearchModal() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef(null);
  const modalRef = useRef(null);

  // Trigger search automatically on every change
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (query.trim().length > 0) {
        fetchResults(query);
      } else {
        setResults([]); // clear results if input is empty
      }
    }, 300); // debounce: 300ms delay

    return () => clearTimeout(delayDebounce); // clear timeout on cleanup
  }, [query]);

  const fetchResults = async (searchTerm) => {
    setLoading(true);
    try {
      const res = await fetch(
          `https://indulap-001-site1.mtempurl.com/umbraco/delivery/api/search?q=${encodeURIComponent(searchTerm)}`
      );
      const data = await res.json();
      setResults(data);
    } catch (err) {
      console.error("Search failed", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const modalElement = modalRef.current;

    const handleShown = () => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    };

    // Listen for Bootstrap's modal "shown" event
    modalElement?.addEventListener('shown.bs.modal', handleShown);

    return () => {
      modalElement?.removeEventListener('shown.bs.modal', handleShown);
    };
  }, []);

  return (
      <div className="modal fade modal-search" id="search" ref={modalRef}>
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="d-flex justify-content-between align-items-center">
              <h5>Search</h5>
              <span
                  className="icon-close icon-close-popup"
                  data-bs-dismiss="modal"
              />
            </div>
            <form className="form-search" onSubmit={(e) => e.preventDefault()}>
              <fieldset className="text">
                <input
                    ref={inputRef}
                    type="text"
                    placeholder="Search..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className=""
                    name="text"
                    tabIndex={0}
                    aria-required="true"
                    autoComplete="off"
                />
              </fieldset>
            </form>

            <div>
              <h6 className="mb_16">Search results</h6>
              {loading && <p>Loading...</p>}
              {!loading && results.length === 0 && query && (
                  <p>No results found.</p>
              )}
              <div className="tf-grid-layout tf-col-2 lg-col-3 xl-col-4">
                {results.map((product, i) => (
                    <ProductCard1 product={product} key={i} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
  );
}
