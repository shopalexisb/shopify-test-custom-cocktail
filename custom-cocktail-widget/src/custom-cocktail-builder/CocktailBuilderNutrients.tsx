import React from "react";
import { Nutrient } from "./ProductIngredient";

interface ProductPurchaseProps {
  nutrients: Nutrient[];
 }

export const CocktailBuilderNutrients: React.FC<ProductPurchaseProps> = ({
                                                                           nutrients
                                                                }) => {

  const filteredNutrients = nutrients.filter(nutrient => nutrient.percentage > 0);

  return (
    <div className={"cc-builder__nutrient-widget"}>
      {filteredNutrients.length === 0 ? (
        <div className={"cc-builder__nutrient-widget-text"}>
          No significant nutrients for this product
        </div>
      ) : (
        filteredNutrients.map((nutrient, index) => (
          <div className={"cc-builder__nutrient-widget-text"} key={index}>
            <span>{nutrient.name}</span>
            <span>{nutrient.percentage}%</span>
          </div>
        ))
      )}
    </div>
  );
};
