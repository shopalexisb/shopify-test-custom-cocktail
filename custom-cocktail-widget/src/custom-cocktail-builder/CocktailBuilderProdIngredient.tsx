import React from "react";
import { ProductIngredient } from "./ProductIngredient";
import { Info } from "../assets/icons/Info";
import { CocktailBuilderNutrients } from "./CocktailBuilderNutrients";

interface ProductPurchaseProps {
  prodIngredient: ProductIngredient;
  onAddDose: (letter: string, actionType: string) => void;
  onSubtractDose: (letter: string, actionType: string) => void;
  isMaxedOutDoses: boolean;
  isOpen: boolean;
  onNutrientsToggle: (letter: string) => void;
}

export const CocktailBuilderProdIngredient: React.FC<ProductPurchaseProps> = ({
                                                                  prodIngredient, onAddDose, onSubtractDose, isMaxedOutDoses, isOpen, onNutrientsToggle
                                                                }) => {

  return (
    <div className={"cc-builder__prod"}>
      <div className={"cc-builder__prod-title"}>{prodIngredient.name}</div>
      <img className={"cc-builder__prod-img"} alt={prodIngredient.name} src={prodIngredient.imageUrl} />
      <div className={"cc-builder__prod-letter"}>{prodIngredient.letter}</div>
      <div className={"cc-builder__prod-nutrient-info"}><span className={"cc-builder__prod-nutrient-info__text"}>See Nutrient Info</span>
        <Info size={20} onClick={() => onNutrientsToggle(prodIngredient.letter)}/>
      </div>
      <div className={"cc-builder__nutrient-wrapper"}>
        { isOpen && (
          <CocktailBuilderNutrients nutrients={prodIngredient.nutrients} />
        )}
      </div>
      <div className={"cc-builder__prod-action"}>
        <button onClick={() => onSubtractDose(prodIngredient.letter, "subtract")}
                disabled={prodIngredient.dosesSelected === 0}
                className={`cc-builder__prod-action-btn cc-builder__prod-action-btn--subtract ${prodIngredient.dosesSelected === 0 ? 'cc-builder__prod-action-btn--disabled' : ''}`}
        />
        <div className={"cc-builder__prod-count"}>{prodIngredient.dosesSelected}</div>
        <button onClick={() => onAddDose(prodIngredient.letter, "add")}
                disabled={prodIngredient.dosesSelected === prodIngredient.maxDoses || isMaxedOutDoses}
                className={`cc-builder__prod-action-btn cc-builder__prod-action-btn--add ${prodIngredient.dosesSelected === prodIngredient.maxDoses || isMaxedOutDoses ? 'cc-builder__prod-action-btn--disabled' : ''}`}
        />
      </div>
    </div>
  );
};
