export const INGREDIENT_GREENS_SPECIAL_DOSAGE = 3; //greens can only have zero or 3 doses
export const GREENS_INGREDIENT_LETTER = "S";

export const getFormulaMapFromFormulaString = (formula: string): Record<string, number> => {
  return [...formula].reduce((acc, char) => {
    acc[char] = (acc[char] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
};

export const getFormulaStringFromFormulaMap = (
  formulaMap: Record<string, number>
): string => {
  return Object.entries(formulaMap)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([letter, count]) => letter.repeat(count))
    .join("");
};

export const addIngredientToFormula = (
  formula: string,
  ingredientLetter: string
): string => {
  let formulaMap = getFormulaMapFromFormulaString(formula);
  formulaMap = {
    ...formulaMap,
    [ingredientLetter]: (formulaMap[ingredientLetter] || 0) + getServingIncrementForIngredient(ingredientLetter)
  };
  formula = getFormulaStringFromFormulaMap(formulaMap);
  return formula;
};

export const subtractIngredientToFormula = (
  formula: string,
  ingredientLetter: string
): string => {
  let formulaMap = getFormulaMapFromFormulaString(formula);
  formulaMap = {
    ...formulaMap,
    [ingredientLetter]: (formulaMap[ingredientLetter] || 0) - getServingIncrementForIngredient(ingredientLetter)
  };
  formula = getFormulaStringFromFormulaMap(formulaMap);
  return formula;
};

const getServingIncrementForIngredient = (ingredientLetter: string): number => {
  return ingredientLetter === GREENS_INGREDIENT_LETTER ? INGREDIENT_GREENS_SPECIAL_DOSAGE : 1;
}
