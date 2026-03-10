import React, {useEffect, useState} from "react";
import { createRoot } from "react-dom/client";
import { ProductDetails } from "./product-info/ProductDetails";
import { ProductPurchase } from "./product-info/ProductPurchase";
import "./styles/main.scss"
import { CUSTOM_COCKTAIL_OPTIONS } from "./utils/product-option-util";
import { initiateDebugListener } from "./utils/debugger";
import { CustomerConfig } from "./utils/customer-config-util";
import { MarketConfig } from "./utils/market-config-util";
import { siteApiData } from "./siteAtom";
import { useAtom } from "jotai";
import { CocktailBuilder } from "./custom-cocktail-builder/CocktailBuilder";

function Widget() {
  const [pcid, setPcid] = useState("");
  const [siteId, setSiteId] = useState("");
  const [siteData] = useAtom(siteApiData(siteId));

  useEffect(() => {
    initiateDebugListener();
    setPcid(CustomerConfig.pcid)
    setSiteId(MarketConfig.siteId)
  }, []);

  return (
    <div className={"cc-widget-wrapper"}>
      <ProductDetails />
      <ProductPurchase options={CUSTOM_COCKTAIL_OPTIONS} pcid={pcid} siteData={siteData} />
      <CocktailBuilder pcid={pcid} siteData={siteData}/>
    </div>
  );
}

const el = document.getElementById("cc-widget");

if (el) {
  createRoot(el).render(<Widget />);
}
