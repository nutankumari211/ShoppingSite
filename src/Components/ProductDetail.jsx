import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Navbar from './Navbar';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProductDetail = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`https://dummyjson.com/products/${id}`);
        setProduct(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching product details:', error);
        setLoading(false);
      }
    };

    fetchProductDetail();
  }, [id]);

  useEffect(() => {
    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

      if (scrollTop + clientHeight >= scrollHeight - 10 && !loading) {
        // Load more data here (pagination)
        // You need to implement your own logic to load additional data
        console.log('Reached the bottom of the page! Load more data...');
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [loading]); // Include loading in dependencies to prevent multiple requests

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!product) {
    return <p>No product found</p>;
  }

  return (
    <>
      <Navbar />
      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px', paddingBottom: '100px', background: 'linear-gradient(to right, #fff, #f2f2f2)', boxShadow: '0 0 20px rgba(0, 0, 0, 0.1)', border: '1px solid #ddd', borderRadius: '8px' }}>
        <h2 style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#333', marginBottom: '10px' }}>{product.title}</h2>
        <p style={{ fontFamily: 'Arial, sans-serif', fontSize: '1.2rem', color: '#555', marginBottom: '20px' }}>{product.description}</p>
        <p style={{ fontSize: '1.5rem', color: '#28a745', marginBottom: '10px' }}>Price: ${product.price}</p>
        <p style={{ fontSize: '1.2rem', color: '#555', marginBottom: '10px' }}>Rating: {product.rating}</p>
        <p style={{ fontSize: '1.2rem', color: '#555', marginBottom: '10px' }}>Stock: {product.stock}</p>
        <p style={{ fontSize: '1.2rem', color: '#555', marginBottom: '10px' }}>Discount: {product.discountPercentage}% off</p>
        <p style={{ fontSize: '1.2rem', color: '#555', marginBottom: '10px' }}>Brand: {product.brand}</p>
        <img
          src={product.thumbnail}
          alt={product.title}
          style={{ width: '100%', maxHeight: '400px', objectFit: 'cover', marginBottom: '20px', borderRadius: '8px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)', transition: 'transform 0.3s ease-in-out', cursor: 'pointer' }}
          onMouseOver={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
          onMouseOut={(e) => (e.currentTarget.style.transform = 'scale(1)')}
        />

        <h3 style={{ fontSize: '1.8rem', color: '#333', marginBottom: '10px' }}>Images</h3>
        <div style={{ display: 'flex', overflowX: 'auto', gap: '10px', marginBottom: '20px' }}>
          {product.images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Product ${index}`}
              style={{
                width: '150px',
                height: '150px',
                objectFit: 'cover',
                borderRadius: '8px',
                boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
                transition: 'transform 0.3s ease-in-out',
                cursor: 'pointer',
              }}
              onClick={() => console.log(`Clicked on image ${index}`)}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default ProductDetail;
