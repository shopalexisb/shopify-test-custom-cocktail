import React, { useState } from "react";
import { SaveCustomCocktailPrompt } from "./SaveCustomCocktailPrompt";

interface ISaveCC {
  pcid: string;
  formula: string;
  templateId: string;
  templateName?: string;
}

export const SaveCustomCocktail: React.FC<ISaveCC> = ({
  pcid, formula, templateId, templateName
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
        <SaveCustomCocktailPrompt pcid={pcid} formula={formula} templateId={templateId} templateName={templateName} onClose={() => setShowPrompt(false)}/>
      )}
    </div>

  );
};
