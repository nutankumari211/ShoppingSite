import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
 // Import the CSS file for this component

function ProductCategories() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("https://dummyjson.com/products/categories");
        console.log("Response:", response.data);
        setCategories(response.data || []);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <>
      <h2>Categories</h2>
      <ul className="list-group custom-list-group">
        {categories && categories.length > 0 ? (
          categories.map((category) => (
            <li key={category} className="list-group-item">
              <Link to={`/products/category/${category}`}>{category}</Link>
            </li>
          ))
        ) : (
          <li className="list-group-item">No categories available</li>
        )}
      </ul>
    </>
  );
}

export default ProductCategories;
