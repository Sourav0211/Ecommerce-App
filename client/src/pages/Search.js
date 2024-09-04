import React from "react";
import Layout from "./../components/Layout/layout";
import { useSearch } from "../context/search";
import { useNavigate } from "react-router-dom";

const Search = () => {
  const navigate = useNavigate();
  const [values, setValues] = useSearch();
  return (
    <Layout title={"Search results"}>
      <div className="container">
        <div className="text-center">
          <h1>Search Results</h1>
          <h6>
            {values?.results.length < 1
              ? "No Products Found"
              : `Found ${values?.results.length}`}
          </h6>
          <div className="container ">
            {values?.results.map((p) => (
              <div className="product-card">
                <div className="product-image">
                  <img
                    src={`/api/v1/product/product-photo/${p._id}`}
                    alt={p.name}
                  />
                </div>
                <div className="product-details">
                  <h2 className="product-title">{p.name}</h2>
                  <p className="product-description">
                    {p.description.substring(0, 60)}...
                  </p>
                  <h4 className="product-price">
                    {" "}
                    {p.price.toLocaleString("en-US", {
                      style: "currency",
                      currency: "USD",
                    })}
                  </h4>
                  {/* <button className="add-to-cart-btn" onClick={() => {
                        setCart([...cart, p]);
                        localStorage.setItem(
                          "cart",
                          JSON.stringify([...cart, p])
                        );
                        toast.success("Item Added to cart");
                      }}>Add to Cart</button> */}
                  <button
                    className="view-btn"
                    onClick={() => navigate(`/product/${p.slug}`)}
                  >
                    View
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Search;
