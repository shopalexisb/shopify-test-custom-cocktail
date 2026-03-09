import { PricingMap } from "../product-info/CustomPrice";

export const fetchCustomCocktailForCustomer = async (
  pcid: string
): Promise<any> => {
  try {
    if(pcid.length){
      const ccCustomerResponse = await fetch(`https://stagingapi2.shop.com/custom-cocktail-service/v1/custom-cocktails?siteType=SHP&siteCountry=USA&languageCode=en&preferredCustomerId=${pcid}&cocktailType=CC&api_key=759ef1fc9e4c4e8bbf900db5f4b7caba`);
      return ccCustomerResponse.json();
    }
  } catch (error) {
    console.error(`Error getting custom cocktail info for pcid: ${pcid}`, error);
  }
};

export const fetchCustomCocktailCost = async (
  pcid: string,
  formula: string
): Promise<PricingMap> => {
  try {
    const baseUrl = "https://stagingapi2.shop.com/custom-cocktail-service/v1/custom-cocktails/costs";
    const formulaMap: Record<string, number> = [...formula].reduce((acc, char) => {
      acc[char] = (acc[char] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const params = new URLSearchParams({
      siteType: "SHP",
      siteCountry: "USA",
      languageCode: "en",
      preferredCustomerId: pcid,
      cocktailType: "CC",
      merchantCountry: "USA"
    });

    for (const [id, dose] of Object.entries(formulaMap)) {
      params.append("isoProductIds", id);
      params.append("isoDoses", dose.toString());
    }

    const priceResponse = await fetch(`${baseUrl}?${params.toString()}&api_key=759ef1fc9e4c4e8bbf900db5f4b7caba`);
    const result = await priceResponse.json();
    const pricingMap = {} as PricingMap;
    pricingMap[30] = {
      regularPrice: result.fullCost.fullRetailCost30,
      salePrice: result.cost30.retailCost,
      cashback: result.cost30.cashbackAmount,
      isOnSale: result.fullCost.isSaleOn
    };
    pricingMap[90] = {
      regularPrice: result.fullCost.fullRetailCost,
      salePrice: result.cost.retailCost,
      cashback: result.cost.cashbackAmount,
      isOnSale: result.fullCost.isSaleOn
    };
    return pricingMap;
  } catch (error) {
    console.error(`Error getting custom cocktail cost: `, error);
    throw new Error("Custom cocktail cost not retrieved");
  }
};
