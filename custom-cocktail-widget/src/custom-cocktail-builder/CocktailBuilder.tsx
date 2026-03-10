import React, {useEffect, useState} from "react";
import { Site } from "../Site";
import { CustomCocktailData } from "./CustomCocktailData";
import {CocktailBuilderProdIngredient} from "./CocktailBuilderProdIngredient";

interface ProductPurchaseProps {
  pcid: string;
  siteData: Site;
  ccData: CustomCocktailData;
}

export const CocktailBuilder: React.FC<ProductPurchaseProps> = ({
                                                                  pcid, siteData, ccData
                                                                }) => {

  return (
    <div className={"cc-builder"}>
      <div className={"cc-builder__title"}>Select Ingredients to Build Your Custom Cocktail</div>
      <div>current formula: {ccData.currentFormula}</div>
      <div className={"cc-builder__prod-wrapper"}>
        {ccData.prodIngredients.map((prod) => (
          <CocktailBuilderProdIngredient prodIngredient={prod} />
        ))}
      </div>
    </div>
  );
};
