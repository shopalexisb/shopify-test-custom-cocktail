import React from "react";
import { createRoot } from "react-dom/client";
import { ProductDetails } from "./product-info/ProductDetails";
import { AddToCart } from "./product-info/AddToCart";

const PROD_VARIANT_CUSTOM_COCKTAIL_30 = 48475839922405;
const PROD_VARIANT_CUSTOM_COCKTAIL_90 = 48475917615333;

function Widget() {
  return (
    <div>
      <ProductDetails/>
      <AddToCart variantId={PROD_VARIANT_CUSTOM_COCKTAIL_30} buttonText={"Add 30 day"}/>
      <AddToCart variantId={PROD_VARIANT_CUSTOM_COCKTAIL_90} buttonText={"Add 90 day"}/>
    </div>

  );
}

const el = document.getElementById("cc-widget");

if (el) {
  createRoot(el).render(<Widget />);
}
