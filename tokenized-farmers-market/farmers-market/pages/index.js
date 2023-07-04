import React,{ useEffect, useState } from 'react';
import ProductList from './ProductList';

const HomePage = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
	// Fetch products from the smart contract or mock data
	const fetchedProducts = [
  	{ id: 1, seller: '0x123...', name: 'Product 1', price: 100, quantity: 5, sold: false },
  	{ id: 2, seller: '0x456...', name: 'Product 2', price: 200, quantity: 10, sold: false },
  	// Add more products if needed
	];
	setProducts(fetchedProducts);
  }, []);

  return (
	<div>
  	<ProductList products={products} />
	</div>
  );
};

export default HomePage;