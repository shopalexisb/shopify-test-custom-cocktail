import { CustomCocktailData } from "../custom-cocktail-builder/CustomCocktailData";

export const getSelectedCocktail = (ccData: CustomCocktailData) => {
  return (
    ccData.savedCocktailTemplates?.find(
      (c) => c.id === ccData.selectedTemplate
    ) ?? null
  );
};
