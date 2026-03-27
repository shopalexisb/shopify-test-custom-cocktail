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
import { fetchCustomCocktailForCustomer } from "./api/CustomCocktail";
import { CustomCocktailData } from "./custom-cocktail-builder/CustomCocktailData";
import { CustomerCocktails } from "./customer-cocktail-info/CustomerCocktails";
import { SaveCustomCocktail } from "./custom-cocktail-builder/SaveCustomCocktail";
import {getSelectedCocktail} from "./utils/cocktail-template-util";

function Widget() {
  const [pcid, setPcid] = useState("");
  const [siteId, setSiteId] = useState("");
  const [siteData] = useAtom(siteApiData(siteId));

  const [ccData, setCCData] = useState<CustomCocktailData>({
    currentFormula: "",
    prodIngredients: [],
    selectedTemplate: ""
  });

  useEffect(() => {
    initiateDebugListener();
    setPcid(CustomerConfig.pcid)
    setSiteId(MarketConfig.siteId)
  }, []);

  useEffect(() => {
    fetchCustomCocktailForCustomer(pcid, ccData.selectedTemplate).then(result => {
      setCCData(result);
    });
  }, [pcid, ccData.selectedTemplate]);

  const handleSelectTemplate = (id: string) => {
    setCCData((prev) => ({
      ...prev,
      selectedTemplate: id
    }));
  };

  const selectedCocktail = getSelectedCocktail(ccData);

  return (
    <div className={"cc-widget-wrapper"}>
      <div className={"cc-widget-wrapper__details"}>
        <ProductDetails />
        <ProductPurchase options={CUSTOM_COCKTAIL_OPTIONS} pcid={pcid} siteData={siteData} formula={ccData.currentFormula} />
        <CustomerCocktails savedCocktails={ccData.savedCocktailTemplates} selectedTemplate={ccData.selectedTemplate} onSelect={(id) => handleSelectTemplate(id)}/>
        <SaveCustomCocktail pcid={pcid} formula={ccData.currentFormula} templateId={ccData.selectedTemplate} templateName={selectedCocktail?.name}/>
      </div>
      <CocktailBuilder ccData={ccData} setCCData={setCCData}/>
    </div>
  );
}

const el = document.getElementById("cc-widget");

if (el) {
  createRoot(el).render(<Widget />);
}
