import React, {useEffect, useState} from "react";
import { Site } from "../Site";

interface ProductPurchaseProps {
  pcid: string;
  siteData: Site;
}

export const CocktailBuilder: React.FC<ProductPurchaseProps> = ({
                                                                  pcid, siteData
                                                                }) => {

  return (
    <div className={"cc-builder"}>
      <div className={"cc-builder__title"}>Select Ingredients to Build Your Custom Cocktail</div>
    </div>
  );
};
