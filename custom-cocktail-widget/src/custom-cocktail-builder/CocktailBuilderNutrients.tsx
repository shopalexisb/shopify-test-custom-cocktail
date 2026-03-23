import React from "react";
import { Nutrient } from "./ProductIngredient";

interface ProductPurchaseProps {
  nutrients: Nutrient[];
 }

export const CocktailBuilderNutrients: React.FC<ProductPurchaseProps> = ({
                                                                           nutrients
                                                                }) => {

  return (
    <div className={"cc-builder__nutrient-widget"}>
      {nutrients
        .filter(nutrient => nutrient.percentage > 0)
        .map((nutrient, index) => (
          <div key={index}>
            <span>{nutrient.name}</span>
            <span>{nutrient.percentage} %</span>
          </div>
        ))}
    </div>
  );
};
