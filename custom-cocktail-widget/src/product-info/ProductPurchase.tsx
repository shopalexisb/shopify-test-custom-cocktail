import React, { useState } from "react";
import { ProductOptionPills } from "./ProductOptionPills";
import { AddToCart } from "./AddToCart";

interface ProductOption {
  label: string;
  variantId: number;
}

interface ProductPurchaseProps {
  options: ProductOption[];
}

export const ProductPurchase: React.FC<ProductPurchaseProps> = ({
                                                                  options
                                                                }) => {
  const [selectedVariant, setSelectedVariant] = useState<number>(
    options[0].variantId
  );

  return (
    <div className={"cc-product__purchase"}>
      <ProductOptionPills
        options={options}
        selectedOption={selectedVariant}
        onChange={setSelectedVariant}
      />

      <AddToCart variantId={selectedVariant} />
    </div>
  );
};
