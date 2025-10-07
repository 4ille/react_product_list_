import React from "react";
import "./style.scss";
import cakeIcon from "../../../product-list-with-cart-main/product-list-with-cart-main/assets/images/illustration-empty-cart.svg";
import removeIcon from "../../../product-list-with-cart-main/product-list-with-cart-main/assets/images/icon-remove-item.svg";

function cart() {
  return (
    <div className="cartWrapper">
      <h1 className="cartTitle">
        your cart ( <span className="numOfProducts"></span> ){" "}
      </h1>
      <p>
        order total <span className="totalAmount"></span>
      </p>
    </div>
  );
}

export default cart;
