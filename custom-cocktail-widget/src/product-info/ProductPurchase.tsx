import React, {useEffect, useState} from "react";
import { ProductOptionPills } from "./ProductOptionPills";
import { AddToCart } from "./AddToCart";
import { PricingMap, ServingSize } from "./CustomPrice";
import { getOptionByVariantId } from "../utils/product-option-util";
import { Site } from "../Site";
import { getFormattedPrice } from "../utils/currency-formatter-util";
import { fetchCustomCocktailCost, fetchCustomCocktailForCustomer } from "../api/CustomCocktail";

interface ProductOption {
  label: string;
  variantId: string;
}

interface ProductPurchaseProps {
  options: ProductOption[];
  pcid: string;
  siteData: Site;
}

export const ProductPurchase: React.FC<ProductPurchaseProps> = ({
                                                                  options, pcid, siteData
                                                                }) => {
  const [selectedVariant, setSelectedVariant] = useState<string>(
    options[0].variantId
  );
  const [currentFormula, setCurrentFormula] = useState("");

  const [customPricing, setCustomPricing] = useState<PricingMap>();

  useEffect(() => {
    if(pcid){
      fetchCustomCocktailForCustomer(pcid).then(result => {
        setCurrentFormula(result.labelCode);
      });
    }
  }, [pcid]);

  useEffect(() => {
    if(currentFormula.length){
      fetchCustomCocktailCost(pcid, currentFormula).then(result => {
        setCustomPricing(result)
      });
    }
  }, [currentFormula]);

  const option = selectedVariant
    ? getOptionByVariantId(selectedVariant)
    : undefined;

  const isOnSale = customPricing && option
    ? customPricing[option.servingSize as ServingSize]?.isOnSale : false;

  const regularPrice = customPricing && option
    ? customPricing[option.servingSize as ServingSize]?.regularPrice
    : "";

  const salePrice = customPricing && option
    ? customPricing[option.servingSize as ServingSize]?.salePrice
    : "";

  const rawPrice = (isOnSale ? salePrice : null) || regularPrice || null;

  const productPrice = (rawPrice !== null && rawPrice !== "")
    ? getFormattedPrice(siteData, rawPrice)
    : "Price Varies";

  return (
    <div className={"cc-product__purchase"}>
      <ProductOptionPills
        options={options}
        selectedOption={selectedVariant}
        onChange={setSelectedVariant}
      />
      <div className={"cc-product__price"}>{productPrice}{isOnSale && <span className={"cc-product__price--sale"}>{getFormattedPrice(siteData, regularPrice)}</span>}</div>
      <AddToCart variantId={selectedVariant} />
    </div>
  );
};
