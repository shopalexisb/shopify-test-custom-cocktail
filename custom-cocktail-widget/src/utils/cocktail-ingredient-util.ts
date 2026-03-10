/**
 * Maps MA sku of the ingredient product to a prodContainerId
 */
const PROD_CONTAINER_MAP = new Map<string, string>([
  ["5197085", "1604659974"],
  ["2242", "604981551"],
  ["2241", "604981550"],
  ["2245", "561800360"],
  ["2217", "561800349"],
  ["2250", "561800361"],
  ["2216", "604981549"],
  ["2111", "561800346"],
  ["2223", "561800352"],
  ["13324", "561800345"],
  ["4840789", "792868342"],
  ["2218", "561800350"],
  ["5664714", "1301699648"],
  ["5819557", "1841504709"],
  ["2252", "568853449"],
  ["3519556", "559053476"],
  ["5818397", "1741625450"],
  ["5826591", "2010616112"]
]);

export const getImageUrlFromMAID = (maId: string): string => {
  const prodContainerId = PROD_CONTAINER_MAP.get(maId);
  if(prodContainerId) {
    return `https://img.mashop.com/Image/210000/214100/214196/products/${prodContainerId}.jpg`
  } else {
    return `https://img.mashop.com/Image/customcocktail/product_images/${maId}.jpg`
  }
};

export const getDosePerIngredient = (formula: string, letter: string): number => {
  let count = 0;

  for (const char of formula) {
    if (char === letter) {
      count++;
    }
  }

  return count;
};
