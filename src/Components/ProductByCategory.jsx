// ProductByCategory.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link, Routes, Route } from "react-router-dom";
import ProductDetail from "./ProductDetail";
import Navbar from "./Navbar";


function ProductByCategory() {
  const [products, setProducts] = useState([]);
  const { category } = useParams();

  useEffect(() => {
    const fetchProductsByCategory = async () => {
      try {
        const response = await axios.get(`https://dummyjson.com/products/category/${category}`);
        setProducts(response.data.products || []);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProductsByCategory();
  }, [category]);

  return (
    <>
       <Navbar /> 
       
      <div className="product-category-container">
        <h2 className="category-title">{category} Products</h2>
        <div className="product-grid">
          {products && products.length > 0 ? (
            products.map((product) => (
              <div key={product.id} className="product-card">
                <img src={product.thumbnail} alt={product.title} className="product-image" />
                <div className="product-details">
                  <h3 className="product-title">{product.title}</h3>
                  <p className="product-description">{product.description}</p>
                  <p className="product-price">Price: ${product.price}</p>
                  <Link to={`/products/${product.id}`} className="view-details-link">
                    View Details
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <p className="no-products-message">No products available for this category</p>
          )}
        </div>
        <Routes>
          <Route path="/products/:productId/*" element={<ProductDetail />} />
        </Routes>
      </div>
    </>
  );
}

export default ProductByCategory;
