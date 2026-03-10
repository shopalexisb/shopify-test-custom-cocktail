import React, {useEffect, useState} from "react";
import { ProductIngredient } from "./ProductIngredient";

interface ProductPurchaseProps {
  prodIngredient: ProductIngredient;
}

export const CocktailBuilderProdIngredient: React.FC<ProductPurchaseProps> = ({
                                                                  prodIngredient
                                                                }) => {

  return (
    <div className={"cc-builder__prod"}>
      <div className={"cc-builder__prod-title"}>{prodIngredient.name}</div>
      <img className={"cc-builder__prod-img"} alt={prodIngredient.name} src={prodIngredient.imageUrl} />
      <div className={"cc-builder__prod-letter"}>{prodIngredient.letter}</div>
      <div className={"cc-builder__prod-action"}>
        <button className={"cc-builder__prod-action-btn cc-builder__prod-action-btn--subtract"}></button>
        <div className={"cc-builder__prod-count"}>{prodIngredient.dosesSelected}</div>
        <button className={"cc-builder__prod-action-btn cc-builder__prod-action-btn--add"}></button>
      </div>
      <div></div>
    </div>
  );
};
