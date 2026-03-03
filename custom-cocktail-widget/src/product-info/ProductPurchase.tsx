import React, { useState } from "react";
import { ProductOptionDropDown } from "./ProductOptionDropDown";
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
    <div>
      <ProductOptionDropDown
        options={options}
        selectedOption={selectedVariant}
        onChange={setSelectedVariant}
      />

      <AddToCart variantId={selectedVariant} />
    </div>
  );
};
