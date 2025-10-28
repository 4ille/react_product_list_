import React, { useState } from "react";
import "./style.scss";
import ProductList from "../../dataLists/ProductList";
import addToCartIcon from "../../images/icon-add-to-cart.svg";
import increaseIcon from "../../images/icon-increment-quantity.svg";
import decreaseIcon from "../../images/icon-decrement-quantity.svg";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

type Props = {
  productAmount: { [key: number]: number };
  onAdd: (id: number) => void;
  onIncrease: (id: number) => void;
  onDecrease: (id: number) => void;
};

function Products({ productAmount, onAdd, onIncrease, onDecrease }: Props) {
  return (
    <div className="productList">
      {ProductList.map((product) => (
        <div key={product.id} className="product">
          <div className="imageWrapper">
            <picture>
              <source
                media="(min-width: 1400px)"
                srcSet={product.image.desktop}
              />
              <source
                media="(min-width: 900px)"
                srcSet={product.image.tablet}
              />
              <img
                src={product.image.mobile}
                alt={product.name}
                className="image"
              />
            </picture>
          </div>

          <div className="btnWrapper">
            <Button
              className={`AddToCartBtn ${
                productAmount[product.id] > 0 ? "added" : ""
              }`}
              onClick={() => onAdd(product.id)}
            >
              {productAmount[product.id] > 0 ? (
                <>
                  <div
                    className="decreaseWrapper"
                    onClick={(e) => {
                      e.stopPropagation();
                      onDecrease(product.id);
                    }}
                  >
                    <img src={decreaseIcon} alt="decrease Icon" />
                  </div>

                  <div className="productAmountWrapper">
                    <span className="productAmount">
                      {productAmount[product.id]}
                    </span>
                  </div>

                  <div
                    className="increaseWrapper"
                    onClick={(e) => {
                      e.stopPropagation();
                      onIncrease(product.id);
                    }}
                  >
                    <img src={increaseIcon} alt="increase Icon" />
                  </div>
                </>
              ) : (
                <>
                  <img src={addToCartIcon} alt="Add to Cart Icon" />
                  <Typography> Add to Cart</Typography>
                </>
              )}
            </Button>
          </div>

          <div className="infoWrapper">
            <p className="name">{product.name}</p>
            <p className="description">{product.description}</p>
            <p className="price">${product.price.toFixed(2)}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Products;
