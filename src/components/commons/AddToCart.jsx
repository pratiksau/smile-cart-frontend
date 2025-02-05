import React from "react";

import { Button } from "neetoui";
import useCartItemsStore from "stores/useCartItemsStore";

const AddToCart = ({ slug }) => {
  const { isInCart, toggleIsInCart } = useCartItemsStore(store => ({
    isInCart: store.cartItems.includes(slug),
    toggleIsInCart: store.toggleIsInCart,
  }));

  const handleClick = e => {
    e.preventDefault();
    e.stopPropagation();
    toggleIsInCart(slug);
  };

  return (
    <Button
      label={isInCart ? "Remove from cart" : "Add to cart"}
      size="large"
      onClick={handleClick}
    />
  );
};

export default AddToCart;
