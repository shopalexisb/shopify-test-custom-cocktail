import React from "react";
import { createRoot } from "react-dom/client";
import { ProductDetails } from "./product-info/ProductDetails";
import {AddToCart} from "./product-info/AddToCart";

function Widget() {
  return (
    <div>
      <ProductDetails/>
      <span>Typescript Test</span>
      <AddToCart/>
    </div>

  );
}

const el = document.getElementById("cc-widget");

if (el) {
  createRoot(el).render(<Widget />);
}
