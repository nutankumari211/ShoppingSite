import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams, useNavigate } from 'react-router-dom';
import Navbar from './Navbar';

function Products() {
  const { category } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`https://dummyjson.com/products${category ? `?category=${category}` : ''}`);
        setProducts(response.data.products); // Assuming the products are in the response data
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, [category]); // Update products when the category changes

  const handleProductClick = (productId) => {
    navigate(`/products/${productId}`);
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <Navbar />
      <div className="row row-cols-1 row-cols-md-3 g-4">
        {products.map((product) => (
          <div key={product.id} className="col mb-4">
            <div className="card h-100 border-0 product-card" onClick={() => handleProductClick(product.id)}>
              <Link to={`/products/${product.id}`} className="text-decoration-none">
                <div className="card-img-overlay d-flex align-items-end">
                  <h5 className="card-title text-white">{product.title}</h5>
                </div>
                <img
                  src={product.thumbnail}
                  className="card-img-top rounded-top"
                  alt={product.title}
                  style={{ height: '200px', objectFit: 'cover' }}
                />
              </Link>
              <div className="card-body">
                <p className="card-text mb-3 text-muted" style={{ fontSize: '1.2rem' }}>
                  {product.description}
                </p>
                <p className="card-text mb-2" style={{ fontSize: '1.5rem', color: '#28a745' }}>
                  ${product.price}
                </p>
                <div className="d-flex justify-content-between align-items-center">
                  <p className="card-text" style={{ fontSize: '1.2rem', color: '#28a745' }}>
                    Rating: {product.rating}
                  </p>
                  <p className="card-text" style={{ fontSize: '1.2rem', color: '#007bff' }}>
                    {product.stock} in stock
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default Products;
