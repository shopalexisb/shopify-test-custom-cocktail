import React, {useEffect, useState} from "react";
import { ProductOptionPills } from "./ProductOptionPills";
import { AddToCart } from "./AddToCart";
import {CustomPrice} from "./CustomPrice";

interface ProductOption {
  label: string;
  variantId: number;
}

interface ProductPurchaseProps {
  options: ProductOption[];
  pcid: string
}

export const ProductPurchase: React.FC<ProductPurchaseProps> = ({
                                                                  options, pcid
                                                                }) => {
  const [selectedVariant, setSelectedVariant] = useState<number>(
    options[0].variantId
  );
  const [productPrice, setProductPrice] = useState("Price Varies");

  useEffect(() => {
    if(pcid){
      fetchCustomPrice();
    }
  }, [pcid]);

  const fetchCustomPrice = async (
  ): Promise<CustomPrice> => {
    try {
      const priceResponse = await fetch(`https://stagingapi2.shop.com/custom-cocktail-service/v1/custom-cocktails?siteType=SHP&siteCountry=USA&languageCode=en&preferredCustomerId=${pcid}&cocktailType=CC&api_key=759ef1fc9e4c4e8bbf900db5f4b7caba`);
      const result = await priceResponse.json();
      console.log("price results: " + JSON.stringify(result));
      return {
        regularPrice: result.cocktail.price30.price,
        salePrice: result.cocktail.price30.price,
        isOnSale: result.cocktail.fullPrice.isSaleOn,
        cashback: result.cocktail.price30.cashbackAmount
      };
    } catch (error) {
      console.error(`Error getting custom cocktail cost: `, error);
      throw new Error("Custom cocktail cost not retrieved");
    }
  };

  const handleVariantChange = async (id: number) => {
    setSelectedVariant(id);
    const selectedOption = options.find(opt => opt.variantId === id);
    if (selectedOption) {
      //fetch from cc api
      try {
        const price = await fetchCustomPrice();
        setProductPrice(price.regularPrice);
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <div className={"cc-product__purchase"}>
      <ProductOptionPills
        options={options}
        selectedOption={selectedVariant}
        onChange={handleVariantChange}
      />
      <div className={"cc-product__price"}>{productPrice}</div>
      <AddToCart variantId={selectedVariant} />
    </div>
  );
};
