import React, { useEffect, useState } from "react";
import "./App.scss";
import "./components/fonts/Fonts.scss";
import Products from "./components/products/Products";
import Cart from "./components/cart/Cart";
import OrderConfirmation from "./components/orderConfirmation/OrderConfirmation";

function App() {
  const [productAmount, setProductAmount] = useState<{ [key: number]: number }>(
    {}
  );
  const [orderConfirmed, setOrderConfirmed] = useState(false);

  const handleAddToCart = (id: number) => {
    setProductAmount((prev) => ({
      ...prev,
      [id]: 1,
    }));
  };

  const increaseAmount = (id: number) => {
    setProductAmount((prev) => ({
      ...prev,
      [id]: (prev[id] || 0) + 1,
    }));
  };

  const decreaseAmount = (id: number) => {
    setProductAmount((prev) => {
      const newAmount = Math.max((prev[id] || 0) - 1, 0);

      if (newAmount === 0) {
        const { [id]: _, ...rest } = prev;
        return rest;
      }
      return {
        ...prev,
        [id]: newAmount,
      };
    });
  };

  const rmvProductComplete = (id: number) => {
    setProductAmount((prev) => {
      const { [id]: _, ...rest } = prev;
      return rest;
    });
  };

  useEffect(() => {
    if (orderConfirmed) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [orderConfirmed]);

  return (
    <>
      <div className="appWrapper">
        <div className="titleProductsWrapper">
          <h1 className="mainTitle">Desserts</h1>

          <div className="desktopProductsWrapper">
            <Products
              productAmount={productAmount}
              onAdd={handleAddToCart}
              onIncrease={increaseAmount}
              onDecrease={decreaseAmount}
            />
          </div>
        </div>

        <div className="desktopCartWrapper">
          <Cart
            productAmount={productAmount}
            onRemove={rmvProductComplete}
            onConfirmOrder={() => setOrderConfirmed(true)}
          />
        </div>
      </div>

      {orderConfirmed && (
        <>
          <div className="overlayBackground"></div>
          <OrderConfirmation
            productAmount={productAmount}
            onClose={() => {
              setOrderConfirmed(false);
              setProductAmount({});
            }}
          />
        </>
      )}
    </>
  );
}

export default App;
