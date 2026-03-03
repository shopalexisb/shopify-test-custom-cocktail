import React, { useEffect, useState } from "react";
import { CustomProduct, ProductOption } from "./CustomProduct";

export const ProductDetails= () => {
  const [ccProductData, setCCProductData] = useState<CustomProduct>();

  const fetchProductDetails = async (
  ): Promise<CustomProduct> => {
    try {
      const productResponse = await fetch('https://stagingapi2.shop.com/store-products/v3/Product/Skus/13993,13992?siteId=260&api_key=759ef1fc9e4c4e8bbf900db5f4b7caba');
      const result = await productResponse.json();
      const productData = result[0];
      const permutations =
        productData?.optionData?.permutationData?.adjacentPermutations || {};
      const options: ProductOption[] = Object.values(permutations).map(
        (perm: any) => ({
          prompt: "Select Serving Size: ",
          value: perm.permutationString,
          sku: perm.merchantSKU
        })
      );
      return {
        imageUrl: productData.mainImage?.imageUrl,
        title: productData.catalogName,
        description: productData.description,
        options
      };
    } catch (error) {
      console.error(`Error getting custom cocktail product details: `, error);
      throw new Error("Custom cocktail product details not retrieved");
    }
  };

  useEffect(() => {
    const loadProduct = async () => {
      try {
        const product = await fetchProductDetails();
        setCCProductData(product);
      } catch (error) {
        console.error(error);
      }
    };

    loadProduct();
  }, []);

  return (
    <div className="cc-product">
      <div className="cc-product__title"
           dangerouslySetInnerHTML={{
             __html: ccProductData?.title || ""
           }}
      />
      <div className="cc-product-wrapper">
        <img className="cc-product__img" alt={"custom cocktail"} src={ccProductData?.imageUrl}/>
        <div className="cc-product__description"
             dangerouslySetInnerHTML={{
               __html: ccProductData?.description || ""
             }}
        />
      </div>
    </div>
  );
};
