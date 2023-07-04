import React from 'react';
import { global } from 'styled-jsx/css';

const ProductList = ({ products }) => {
  return (
	<div className='container'>
  	<h1>Farmers Market</h1>
  	<h2>Product List</h2>
  	<table>
    	<thead>
      	<tr>
        	<th>ID</th>
        	<th>Seller</th>
        	<th>Name</th>
        	<th>Price</th>
        	<th>Quantity</th>
        	<th>Sold</th>
      	</tr>
    	</thead>
    	<tbody>
      	{products.map((product) => (
        	<tr key={product.id}>
          	<td>{product.id}</td>
          	<td>{product.seller}</td>
          	<td>{product.name}</td>
          	<td>{product.price}</td>
          	<td>{product.quantity}</td>
          	<td>{product.sold ? 'Yes' : 'No'}</td>
        	</tr>
      	))}
    	</tbody>
  	</table>
	</div>
  );
};

export default ProductList;