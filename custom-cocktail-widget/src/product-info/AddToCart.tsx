import React from "react";

interface IAddToCart {
  variantId: string;
  price?: string | null;
  formula?: string;
  setWarningMessage: React.Dispatch<React.SetStateAction<string>>;
}

export const AddToCart: React.FC<IAddToCart> = ({
  variantId, price, formula, setWarningMessage
}) => {

  async function doAddToCart() {
    if(!formula || formula?.length <= 0){
      setWarningMessage("Please add ingredients to your custom cocktail");
      return;
    }

    const res = await fetch('/cart/add.js', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id: variantId,
        quantity: 1,
        properties: {
          formula: formula,
          _computedPrice: price
        },
        sections: ['cart-drawer', 'cart-icon-bubble'],
        sections_url: window.location.pathname
      })
    });

    const data = await res.json();
    const parser = new DOMParser();

    // Update drawer section
    if (data.sections?.['cart-drawer']) {
      const doc = parser.parseFromString(data.sections['cart-drawer'], 'text/html');
      const newInner = doc.querySelector('#CartDrawer')?.innerHTML;

      const current = document.querySelector('#CartDrawer');

      if (current && newInner) {
        current.innerHTML = newInner;
      }
    }

    // Update cart icon bubble
    if (data.sections['cart-icon-bubble']) {
      const parser = new DOMParser();
      const doc = parser.parseFromString(data.sections['cart-icon-bubble'], "text/html");

      const newBubble = doc.querySelector('[id="shopify-section-cart-icon-bubble"]');
      const currentBubble = document.querySelector('.cart-count-bubble, .cart-count, #cart-icon-bubble');

      if (newBubble && currentBubble) {
        currentBubble.innerHTML = newBubble.innerHTML;
      }
    }

    // Open drawer AFTER content exists
    const drawer = document.querySelector('cart-drawer');

    if (drawer) {
      drawer.classList.remove('is-empty');

      // @ts-ignore
      drawer.open();
    }
  }

  return (
    <button className={"cc-product__add-to-cart-btn"} onClick={doAddToCart}>
      Add to Cart
    </button>
  );
};
