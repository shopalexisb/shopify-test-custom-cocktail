import {ProductIngredient} from "./ProductIngredient";

export interface CustomCocktailData {
  currentFormula: string;
  prodIngredients: ProductIngredient[];
  savedCocktailTemplates?: CustomCocktailTemplate[];
  selectedTemplate: string;
}

export interface CustomCocktailTemplate {
  id: string;
  name: string;
}
