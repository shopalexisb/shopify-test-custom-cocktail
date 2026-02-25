import React from "react";
import { createRoot } from "react-dom/client";
import { ProductDetails } from "./product-info/ProductDetails";

function Widget() {
  return (
    <div>
      <ProductDetails/>
      <span>Typescript Test</span>
      <button onClick={() => alert("Clicked!")}>
        Click me
      </button>
    </div>

  );
}

const el = document.getElementById("cc-widget");

if (el) {
  createRoot(el).render(<Widget />);
}
