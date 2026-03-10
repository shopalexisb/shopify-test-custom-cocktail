import React from "react";

interface IAddToCart {
  variantId: string;
  price?: string | null;
  formula?: string;
}

export const AddToCart: React.FC<IAddToCart> = ({
  variantId, price, formula
}) => {

  const doAddToCart = async () => {
    if(!price){
      console.error("price is undefined for custom cocktail");
      return;
    }

    try {
      const response = await fetch('/cart/add.js', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: variantId,
          quantity: 1,
          properties: {
            formula: formula,
            _computedPrice: price //price override
          }
        }),
      });

      if (response.ok) {
        //TODO: refresh the cart
        //Open the cart drawer
        document.querySelector<HTMLElement>('[href="/cart"]')?.click();
      }

    } catch (error) {
      console.error('Error adding custom cocktail to cart:', error);
    }
  };

  return (
    <button className={"cc-product__add-to-cart-btn"} onClick={doAddToCart}>
      Add to Cart
    </button>
  );
};
