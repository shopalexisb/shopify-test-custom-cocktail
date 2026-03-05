import React, {useEffect, useState} from "react";
import { ProductOptionPills } from "./ProductOptionPills";
import { AddToCart } from "./AddToCart";
import { PricingMap, ServingSize } from "./CustomPrice";
import { getOptionByVariantId } from "../utils/product-option-util";

interface ProductOption {
  label: string;
  variantId: string;
}

interface ProductPurchaseProps {
  options: ProductOption[];
  pcid: string
}

export const ProductPurchase: React.FC<ProductPurchaseProps> = ({
                                                                  options, pcid
                                                                }) => {
  const [selectedVariant, setSelectedVariant] = useState<string>(
    options[0].variantId
  );

  const [customPricing, setCustomPricing] = useState<PricingMap>();

  useEffect(() => {
    if(pcid){
      fetchCustomPrice().then(result => {
        setCustomPricing(result)
      });
    }
  }, [pcid]);

  const fetchCustomPrice = async (
  ): Promise<PricingMap> => {
    try {
      const priceResponse = await fetch(`https://stagingapi2.shop.com/custom-cocktail-service/v1/custom-cocktails?siteType=SHP&siteCountry=USA&languageCode=en&preferredCustomerId=${pcid}&cocktailType=CC&api_key=759ef1fc9e4c4e8bbf900db5f4b7caba`);
      const result = await priceResponse.json();
      console.log("price results: " + JSON.stringify(result));
      const pricingMap = {} as PricingMap;
      pricingMap[30] = {
        regularPrice: result.cocktail.price30.price,
        salePrice: result.cocktail.price30.price,
        cashback: result.cocktail.price30.cashbackAmount,
        isOnSale: result.cocktail.fullPrice.isSaleOn
      };
      pricingMap[90] = {
        regularPrice: result.cocktail.price.price,
        salePrice: result.cocktail.price.price,
        cashback: result.cocktail.price.cashbackAmount,
        isOnSale: result.cocktail.fullPrice.isSaleOn
      };
      return pricingMap;
    } catch (error) {
      console.error(`Error getting custom cocktail cost: `, error);
      throw new Error("Custom cocktail cost not retrieved");
    }
  };

  const option = selectedVariant
    ? getOptionByVariantId(selectedVariant)
    : undefined;

  const productPrice =
    customPricing && option
      ? `$${customPricing[option.servingSize as ServingSize]?.salePrice ?? ""}`
      : "Price Varies";

  return (
    <div className={"cc-product__purchase"}>
      <ProductOptionPills
        options={options}
        selectedOption={selectedVariant}
        onChange={setSelectedVariant}
      />
      <div className={"cc-product__price"}>{productPrice}</div>
      <AddToCart variantId={selectedVariant} />
    </div>
  );
};
