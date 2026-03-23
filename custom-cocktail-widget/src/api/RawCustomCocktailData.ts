export interface RawCustomCocktailData {
  name: string;
  maId: string;
  dosesAllowed: number;
  letter: string;
  ingredientNutrientList: [];
}

export interface RawNutrientData {
  name: string;
  ulPercent: string;
}
