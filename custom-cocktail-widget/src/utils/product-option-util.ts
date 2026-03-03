const PROD_VARIANT_CUSTOM_COCKTAIL_30 = 48475839922405;
const PROD_VARIANT_CUSTOM_COCKTAIL_90 = 48475917615333;

export const CUSTOM_COCKTAIL_OPTIONS = [
  { label: "30 Day Supply", variantId: PROD_VARIANT_CUSTOM_COCKTAIL_30 },
  { label: "90 Day Supply", variantId: PROD_VARIANT_CUSTOM_COCKTAIL_90 }
];

export const getOptionForServingSize = (serving: number): any => {
  if(serving === 90){
    return CUSTOM_COCKTAIL_OPTIONS[0];
  }
  return CUSTOM_COCKTAIL_OPTIONS[1];
};
