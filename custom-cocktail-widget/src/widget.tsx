import React from "react";
import { createRoot } from "react-dom/client";
import { ProductDetails } from "./product-info/ProductDetails";
import { ProductPurchase } from "./product-info/ProductPurchase";


const PROD_VARIANT_CUSTOM_COCKTAIL_30 = 48475839922405;
const PROD_VARIANT_CUSTOM_COCKTAIL_90 = 48475917615333;

function Widget() {
  const options = [
    { label: "30 Day Supply", variantId: PROD_VARIANT_CUSTOM_COCKTAIL_30 },
    { label: "90 Day Supply", variantId: PROD_VARIANT_CUSTOM_COCKTAIL_90 }
  ];

  return (
    <div>
      <ProductDetails />
      <ProductPurchase options={options} />
    </div>

  );
}

const el = document.getElementById("cc-widget");

if (el) {
  createRoot(el).render(<Widget />);
}
