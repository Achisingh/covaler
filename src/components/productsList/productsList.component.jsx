import React, { useState, useEffect } from "react";
import "./productsList.style.css";

const ProductList = ({ products }) => {
  const [cart, setCart] = useState([]);
  const [isMember, setIsMember] = useState(false);
  const [total, setTotal] = useState(0);
  const [discountedPrice, setDiscountedPrice] = useState(0);

  // Add to Cart on button Click for products
  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  // Calculate cart total without discount
  const calculateCartTotal = () => {
    let total = 0;
    for (let product of cart) {
      total += product.price * (product.numNights || 1);
    }
    return total;
  };

  // Discount applied
  const calculateDiscountedPrice = () => {
    const cartTotal = calculateCartTotal();
    let price = cartTotal;

    if (cartTotal >= 1000) {
      price *= 0.9;
    } else if (cartTotal >= 500) {
      price *= 0.95;
    }

    if (isMember) {
      price *= 0.9;
    }

    return price;
  };

  // Update states on useEffects
  useEffect(() => {
    const price = calculateDiscountedPrice();
    setTotal(calculateCartTotal());
    setDiscountedPrice(price);
  }, [cart, isMember]);

  return (
    <div>
      {/* Show products */}
      <div className="product-list-container">
        <h2>Available Products</h2>
        <div className="product-boxes">
          {products.map((product, index) => (
            <div key={index} className="product-box">
              <strong>{product.name}</strong>
              <p>Type: {product.type}</p>
              <p>Price: ${product.price}</p>
              <label>
                <input
                  type="number"
                  min="1"
                  defaultValue="1"
                  onChange={(e) =>
                    (product.numNights = parseInt(e.target.value))
                  }
                />
                Nights
              </label>

              <button onClick={() => addToCart(product, product.numNights)}>
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </div>
      {/* Checkbox for member products */}
      <div>
        <label>
          <input
            type="checkbox"
            checked={isMember}
            onChange={() => setIsMember(!isMember)}
          />
          Member
        </label>
      </div>
      {/* Show Both totals */}
      <div className="cart-total">
        <h2>Cart Total</h2>
        <p>Total : {total.toFixed(2)}</p>
        <h2>Discount Total</h2>
        <p>Total : {discountedPrice.toFixed(2)}</p>
      </div>
      {/* Show Cart products */}
      <div className="product-list-container">
        <h2>Cart Items</h2>
        <div className="product-boxes">
          {cart.map((product, index) => (
            <div key={index} className="product-box">
              <strong>{product.name}</strong>
              <p>Type: {product.type}</p>
              <p>Price: ${product.price}</p>
              <p>Nights: {product.numNights ? product.numNights : 1}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductList;
