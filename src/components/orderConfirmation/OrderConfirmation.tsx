import React from "react";
import ProductList from "../../dataLists/ProductList";
import "./style.scss";
import iconOrderConfirmed from "../../images/icon-order-confirmed.svg";

type Props = {
  productAmount: { [key: number]: number };
  onClose: () => void;
};
const OrderConfirmation = ({ onClose, productAmount }: Props) => {
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
    <div className="orderConfirmationWrapper">
      <img
        src={iconOrderConfirmed}
        alt="icon order confirmed"
        className="iconOrderConfirmed"
      />
      <p className="confirmedTitle">Order Confirmed</p>
      <p className="comment">We hope you enjoy your food!</p>

      <div className="orderedProducts">
        {itemsInCart.map(([id, amount]) => {
          const product = ProductList.find((p) => p.id === Number(id));
          if (!product) return null;

          const price = Number(product.price);
          const totalPrice = price * amount;

          return (
            <div key={id} className="orderedItem">
              <div className="thumbnailInfoWrapper">
                <img
                  src={product.image.thumbnail}
                  alt={product.name}
                  className="thumbnail"
                />
                <div className="itemInfoWrapper">
                  <span>{product.description}</span>
                  <div className="amountSinglePriceWrapper">
                    <span className="amount">x{amount}</span>
                    <span className="singlePrice">@ ${price.toFixed(2)}</span>
                  </div>
                </div>
              </div>
              <span className="totalPrice">${totalPrice.toFixed(2)}</span>
            </div>
          );
        })}
        <div className="totalOrderWrapper">
          <p className="totalOrder">Order Total:</p>
          <p className="totalAmount">${orderTotal.toFixed(2)}</p>
        </div>
      </div>

      <button className="newOrderBtn" onClick={onClose}>
        Start New Order
      </button>
    </div>
  );
};

export default OrderConfirmation;
