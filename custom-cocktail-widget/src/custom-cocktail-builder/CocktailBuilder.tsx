import React, { useState } from "react";
import { CustomCocktailData } from "./CustomCocktailData";
import { CocktailBuilderProdIngredient } from "./CocktailBuilderProdIngredient";
import {
  addIngredientToFormula, GREENS_INGREDIENT_LETTER, INGREDIENT_GREENS_SPECIAL_DOSAGE,
  subtractIngredientToFormula
} from "../utils/cocktail-formula-util";
import { getDosePerIngredient } from "../utils/cocktail-ingredient-util";

interface ProductPurchaseProps {
  ccData: CustomCocktailData;
  setCCData: React.Dispatch<React.SetStateAction<CustomCocktailData>>;
}

export const CocktailBuilder: React.FC<ProductPurchaseProps> = ({
                                                                  ccData, setCCData
                                                                }) => {

  const [openNutrientsForIngredient, setOpenNutrientsForIngredient] = useState<string | null>(null);

  const toggleNutrientsWidget = (letter: string) => {
    setOpenNutrientsForIngredient((prev) => (prev === letter ? null : letter));
  };

  const handleFormulaUpdate = (ingredientLetter: string, actionType: string) => {
    let updatedFormula;
    if(actionType === "add"){
      updatedFormula = addIngredientToFormula(ccData.currentFormula, ingredientLetter);
    } else {
      updatedFormula = subtractIngredientToFormula(ccData.currentFormula, ingredientLetter);
    }
    const updatedCCData = {
      ...ccData,
      currentFormula: updatedFormula,
      prodIngredients: ccData.prodIngredients.map(item => ({
        ...item,
        dosesSelected: getDosePerIngredient(updatedFormula, item.letter)
      }))
    }
    setCCData(updatedCCData);
  };

  const isMaxedOutDoses = (letter: string) => {
    const MAX_DOSES = 10;
    const dosesSelected = ccData.prodIngredients.reduce((sum, i) => sum + (i.dosesSelected ?? 0), 0);
    if(letter === GREENS_INGREDIENT_LETTER){
      return dosesSelected >= MAX_DOSES - INGREDIENT_GREENS_SPECIAL_DOSAGE;
    } else {
      return dosesSelected >= MAX_DOSES;
    }
  }

  const selectedCocktail = ccData.savedCocktailTemplates?.find((c) => c.id === ccData.selectedTemplate);

  return (
    <div className={"cc-builder"}>
      <div className={"cc-builder__title"}>Select Ingredients to Build Your Custom Cocktail</div>
      {ccData.selectedTemplate?.length > 0 && ccData.savedCocktailTemplates && (
        <div className={"cc-builder__cc-selection"}>Chosen Cocktail: <span className={"cc-builder__cc-selection cc-builder__cc-selection--blue"}>{selectedCocktail?.name}</span></div>
      )}
      <div>current formula: {ccData.currentFormula}</div>
      <div className={"cc-builder__prod-wrapper"}>
        {ccData.prodIngredients.map((prod) => (
          <CocktailBuilderProdIngredient prodIngredient={prod} onAddDose={handleFormulaUpdate}
                                         onSubtractDose={handleFormulaUpdate} isMaxedOutDoses={isMaxedOutDoses(prod.letter)}
                                         isOpen={openNutrientsForIngredient === prod.letter} onNutrientsToggle={toggleNutrientsWidget} />
        ))}
      </div>
    </div>
  );
};
