import React from "react";
import "./productsList.style.css";

const ProductList = ({ products }) => {
  console.log(products, "products");

  return (
    <div className="product-list-container">
      <h2>Available Products</h2>
      <div className="product-boxes">
        {products.map((product, index) => (
          <div key={index} className="product-box">
            <strong>{product.name}</strong>
            <p>Type: {product.type}</p>
            <p>Price: ${product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
