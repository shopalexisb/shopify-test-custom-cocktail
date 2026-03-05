const PROD_VARIANT_CUSTOM_COCKTAIL_30 = "48475839922405";
const PROD_VARIANT_CUSTOM_COCKTAIL_90 = "48475917615333";

export const CUSTOM_COCKTAIL_OPTIONS = [
  { label: "30 Day Supply", variantId: PROD_VARIANT_CUSTOM_COCKTAIL_30, servingSize: 30 },
  { label: "90 Day Supply", variantId: PROD_VARIANT_CUSTOM_COCKTAIL_90, servingSize: 90 }
];

export function getOptionByVariantId(variantId: string) {
  return CUSTOM_COCKTAIL_OPTIONS.find(
    option => option.variantId === variantId
  );
}
