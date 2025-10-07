import React from "react";
import "./style.scss";
import carbonIcon from "../../../product-list-with-cart-main/product-list-with-cart-main/assets/images/icon-carbon-neutral.svg";
import confrimedIcon from "../../../product-list-with-cart-main/product-list-with-cart-main/assets/images/icon-order-confirmed.svg";

function BtnConfirmOrder() {
  return (
    <div className="buttonAlertWrapper">
      <div className="alertCarbonNeutral">
        <img src={carbonIcon} alt="carbon Icon" />
        <p>
          this is a <b>carbon-neutral</b> delivery
        </p>
      </div>
      <button>confirm order</button>
    </div>
  );
}

export default BtnConfirmOrder;
