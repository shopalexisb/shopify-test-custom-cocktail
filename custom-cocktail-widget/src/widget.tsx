import React, {useEffect, useState} from "react";
import { createRoot } from "react-dom/client";
import { ProductDetails } from "./product-info/ProductDetails";
import { ProductPurchase } from "./product-info/ProductPurchase";
import "./styles/main.scss"
import { CUSTOM_COCKTAIL_OPTIONS } from "./utils/product-option-util";
import { initiateDebugListener } from "./utils/debugger";
import { CustomerConfig } from "./utils/customer-config-util";

function Widget() {
  const [pcid, setPcid] = useState("");

  useEffect(() => {
    initiateDebugListener();
    setPcid(CustomerConfig.pcid)
  }, []);

  return (
    <div className={"cc-widget-wrapper"}>
      <ProductDetails />
      <ProductPurchase options={CUSTOM_COCKTAIL_OPTIONS} pcid={pcid} />
    </div>
  );
}

const el = document.getElementById("cc-widget");

if (el) {
  createRoot(el).render(<Widget />);
}
