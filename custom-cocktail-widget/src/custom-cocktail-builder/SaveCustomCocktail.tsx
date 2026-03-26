import React, {useState} from "react";
import { SaveCustomCocktailPrompt } from "./SaveCustomCocktailPrompt";

interface IAddToCart {
  formula?: string;
  templateId?: string;
}

export const SaveCustomCocktail: React.FC<IAddToCart> = ({
  formula, templateId
}) => {

  const [showPrompt, setShowPrompt] = useState(false);

  function saveCocktail() {
    setShowPrompt(true);
  }

  return (
    <div>
      <button className={"cc-product__save-btn"} onClick={saveCocktail}>
        Save Custom Cocktail
      </button>
      {showPrompt && (
        <SaveCustomCocktailPrompt formula={formula} templateId={templateId}/>
      )}
    </div>

  );
};
