import { PricingMap } from "../product-info/CustomPrice";
import {CustomCocktailData, CustomCocktailTemplate} from "../custom-cocktail-builder/CustomCocktailData";
import { RawCustomCocktailData } from "./RawCustomCocktailData";
import { getDosePerIngredient, getImageUrlFromMAID } from "../utils/cocktail-ingredient-util";
import * as he from 'he';
import { getFormulaMapFromFormulaString } from "../utils/cocktail-formula-util";

export const fetchCustomCocktailForCustomer = async (
  pcid: string, ccTemplate: string
): Promise<CustomCocktailData> => {
  try {
    let ccData: CustomCocktailData = {
      currentFormula: "",
      prodIngredients: [],
      selectedTemplate: ccTemplate
    };
    const ccCustomerResponse = await fetch(`https://stagingapi2.shop.com/custom-cocktail-service/v1/custom-cocktails?siteType=SHP&siteCountry=USA&languageCode=en&preferredCustomerId=${pcid ?? ""}&cocktailType=CC&templateIdSelected=${ccTemplate}&api_key=759ef1fc9e4c4e8bbf900db5f4b7caba`);
    const returnData = await ccCustomerResponse.json();
    ccData.currentFormula = returnData.labelCode;
    ccData.prodIngredients = returnData.cocktail["product"].map((item: RawCustomCocktailData) => {
      return {
        name: he.decode(item.name),
        imageUrl: getImageUrlFromMAID(item.maId),
        maxDoses: item.dosesAllowed,
        letter: item.letter,
        maId: item.maId,
        dosesSelected: getDosePerIngredient(ccData.currentFormula, item.letter)
      };
    });
    if(returnData.cocktail.template){
      ccData.savedCocktailTemplates = returnData.cocktail.template.map((item: CustomCocktailTemplate) => ({
        id: item.id,
        name: item.name,
      }));
    }
    ccData.selectedTemplate = returnData.cocktail.templateIdSelected ?? "";
    return ccData;
  } catch (error) {
    console.error(`Error getting custom cocktail info for pcid: ${pcid}`, error);
    throw new Error("Custom cocktail info not retrieved");
  }
};

export const fetchCustomCocktailCost = async (
  pcid: string,
  formula: string
): Promise<PricingMap> => {
  try {
    const baseUrl = "https://stagingapi2.shop.com/custom-cocktail-service/v1/custom-cocktails/costs";

    const params = new URLSearchParams({
      siteType: "SHP",
      siteCountry: "USA",
      languageCode: "en",
      preferredCustomerId: pcid ?? "",
      cocktailType: "CC",
      merchantCountry: "USA"
    });

    for (const [id, dose] of Object.entries(getFormulaMapFromFormulaString(formula))) {
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
      isOnSale: Boolean(result.fullCost.isSaleOn)
    };
    pricingMap[90] = {
      regularPrice: result.fullCost.fullRetailCost,
      salePrice: result.cost.retailCost,
      cashback: result.cost.cashbackAmount,
      isOnSale: Boolean(result.fullCost.isSaleOn)
    };
    return pricingMap;
  } catch (error) {
    console.error(`Error getting custom cocktail cost: `, error);
    throw new Error("Custom cocktail cost not retrieved");
  }
};

export const saveNewCustomCocktail = async (
  pcid: string,
  formula: string,
  cocktailName: string
): Promise<any> => {
  return saveCustomCocktail(pcid, formula, cocktailName, "");
};

export const updateSavedCustomCocktail = async (
  pcid: string,
  formula: string,
  templateId: string
): Promise<any> => {
  return saveCustomCocktail(pcid, formula, "", templateId);
};



const saveCustomCocktail = async (
  pcid: string,
  formula: string,
  cocktailName: string,
  templateId: string
): Promise<any> => {
  try {
    const baseUrl = "https://stagingapi2.shop.com/custom-cocktail-service/v1/custom-cocktails/templates";

    const formulaMap = getFormulaMapFromFormulaString(formula);

    const postData = {
      siteType: "SHP",
      siteCountry: "USA",
      languageCode: "ENG",
      preferredCustomerId: pcid,
      isActive: "true",
      pageMode: "3",
      isoDoses: Object.values(formulaMap).map(String),
      isoProductIds: Object.keys(formulaMap),
      templateId: templateId,
      templateName: cocktailName
    }

    const response = await fetch(`${baseUrl}?api_key=759ef1fc9e4c4e8bbf900db5f4b7caba`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postData),
    });

    return response.json();
  } catch (error) {
    console.error(`Error saving custom cocktail: `, error);
    throw new Error("Custom cocktail not saved");
  }
};
