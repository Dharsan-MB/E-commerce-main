import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const SearchResults = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      const query = new URLSearchParams(location.search).get('query');
      if (query) {
        try {
          const response = await axios.get(`http://localhost:5000/api/products/search?query=${query}`);
          const products = response.data;

          // Check which category the product belongs to and navigate to the appropriate page
          if (products.some(product => product.category === 'Fruits')) {
            navigate('/fruits');
          } else if (products.some(product => product.category === 'Vegetables')) {
            navigate('/vegetables');
          } else if (products.some(product => product.category === 'Groceries')) {
            navigate('/groceries');
          } else {
            alert('No products found.');
          }
        } catch (error) {
          console.error('Error fetching products:', error);
        }
      }
    };

    fetchProducts();
  }, [location.search, navigate]);

  return null;
};

export default SearchResults;