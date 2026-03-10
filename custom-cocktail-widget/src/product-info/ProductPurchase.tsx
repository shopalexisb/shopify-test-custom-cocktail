import React, { useEffect, useState } from "react";
import { ProductOptionPills } from "./ProductOptionPills";
import { AddToCart } from "./AddToCart";
import { PricingMap, ServingSize } from "./CustomPrice";
import { getOptionByVariantId } from "../utils/product-option-util";
import { Site } from "../Site";
import { getFormattedPrice } from "../utils/currency-formatter-util";
import { fetchCustomCocktailCost } from "../api/CustomCocktail";

interface ProductOption {
  label: string;
  variantId: string;
}

interface ProductPurchaseProps {
  options: ProductOption[];
  pcid: string;
  siteData: Site;
  formula: string;
}

export const ProductPurchase: React.FC<ProductPurchaseProps> = ({
                                                                  options, pcid, siteData, formula
                                                                }) => {
  const [selectedVariant, setSelectedVariant] = useState<string>(
    options[0].variantId
  );

  const [customPricing, setCustomPricing] = useState<PricingMap>();

  useEffect(() => {
    if(formula.length){
      fetchCustomCocktailCost(pcid, formula).then(result => {
        setCustomPricing(result)
      });
    }
  }, [formula]);

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
      <AddToCart variantId={selectedVariant} formula={formula} price={rawPrice} />
    </div>
  );
};
