import React from "react";

export const AddToCart= () => {

  const doAddToCart = async () => {
    try {
      const response = await fetch('/cart/add.js', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: 48475839922405,
          //48475839922405 30 day serving
          //48475917615333 90 day serving
          quantity: 1,
          properties: {
            formula: "123_ABCDE",
            _computedPrice: "155.99" //price override
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
    <button onClick={doAddToCart}>
      Add to Cart
    </button>
  );
};
