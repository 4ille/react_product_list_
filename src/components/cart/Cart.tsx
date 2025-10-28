import React, { useState } from "react";
import "./style.scss";
import cakeIcon from "../../images/illustration-empty-cart.svg";
import removeIcon from "../../images/icon-remove-item.svg";
import carbonIcon from "../../images/icon-carbon-neutral.svg";
import ProductList from "../../dataLists/ProductList";
import Button from "@mui/material/Button";

type Props = {
  productAmount: { [key: number]: number };
  onRemove: (id: number) => void;
  onConfirmOrder: () => void;
};

function Cart({ onConfirmOrder, onRemove, productAmount }: Props) {
  console.log("Cart items:", productAmount);
  console.log("ProductList in Cart:", ProductList);

  const itemsInCart = Object.entries(productAmount).filter(
    ([id, amount]) => amount > 0
  );

  const totalAmount = itemsInCart.reduce(
    (sum, [id, amount]) => sum + amount,
    0
  );

  const orderTotal = itemsInCart.reduce((sum, [id, amount]) => {
    const product = ProductList.find((p) => p.id === Number(id));

    return sum + (product ? Number(product.price) * amount : 0);
  }, 0);

  return (
    <div className="cartWrapper">
      <p className="cartTitle">
        Your Cart <span className="numOfProducts">({totalAmount})</span>
      </p>

      {itemsInCart.length === 0 ? (
        <>
          <div className="cakeIconWrapper">
            <img src={cakeIcon} alt="cake Icon" />
          </div>
          <p className="alertNoItems">Your added items will appear here</p>
        </>
      ) : (
        <div className="cartItems">
          {itemsInCart.map(([id, amount]) => {
            const product = ProductList.find((p) => p.id === Number(id));
            const price = product ? Number(product.price) : 0;
            const totalPriceProduct = price * amount;

            return (
              <div key={id} className="cartItem">
                <span className="product">
                  {product?.description ?? `Product #${id}`}
                </span>
                <div className="cartItemInfoWrapper">
                  <div className="cartItemAmountPricesWrapper">
                    <span className="amount">x{amount}</span>
                    <span className="productSinglePrice">
                      @ ${price.toFixed(2)}
                    </span>
                    <span className="totalPriceProduct">
                      ${totalPriceProduct.toFixed(2)}
                    </span>
                  </div>

                  <button
                    className="removeIconWrapper"
                    onClick={() => onRemove(Number(id))}
                  >
                    <img
                      className="removeIcon"
                      src={removeIcon}
                      alt="remove Icon"
                    />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {itemsInCart.length > 0 && (
        <>
          <div className="orderTotal">
            <p>Order Total: </p>
            <span className="orderTotalSum">${orderTotal.toFixed(2)}</span>
          </div>

          <div className="buttonAlertWrapper">
            <div className="alertCarbonNeutral">
              <img className="carbonIcon" src={carbonIcon} alt="carbon Icon" />
              <p className="alertText">
                This is a <b>carbon-neutral</b> delivery
              </p>
            </div>
            <button className="confirmBtn" onClick={onConfirmOrder}>
              Confirm Order
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;
