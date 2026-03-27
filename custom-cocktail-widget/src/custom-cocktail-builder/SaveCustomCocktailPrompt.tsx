import React, { useState } from "react";
import { updateSavedCustomCocktail } from "../api/CustomCocktail";

interface IAddToCart {
  pcid: string;
  formula: string;
  templateId: string;
  templateName?: string;
  onClose: () => void;
}

export const SaveCustomCocktailPrompt: React.FC<IAddToCart> = ({
  pcid, formula, templateId, templateName, onClose
}) => {
  const SAVE_SELECTION_TYPE_EXISTING = "existing";
  const SAVE_SELECTION_TYPE_NEW = "new";

  const [selectedOption, setSelectedOption] = useState<string>(SAVE_SELECTION_TYPE_EXISTING);//default to existing option

  function saveCocktail() {
    if(selectedOption === SAVE_SELECTION_TYPE_EXISTING && templateName){
      updateSavedCustomCocktail(pcid, formula, templateId, templateName).then(result => {
        console.log(JSON.stringify(result));
        console.log("saved");
      });
    }
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setSelectedOption(e.target.value);
  }

  return (
    <div className="cc-overlay-wrapper">
      <div className="cc-overlay-container">
        <h2>Save Custom Cocktail</h2>
        <div className="cc-overlay__options">
          <label
            key={SAVE_SELECTION_TYPE_EXISTING}
          >
            <input
              type="radio"
              name="update-cocktail-formula"
              value={SAVE_SELECTION_TYPE_EXISTING}
              checked={selectedOption === SAVE_SELECTION_TYPE_EXISTING}
              onChange={handleChange}
            />
            Update Existing Custom Cocktail
          </label>
          <label
            key={SAVE_SELECTION_TYPE_NEW}
          >
            <input
              type="radio"
              name="save-cocktail-formula"
              value={SAVE_SELECTION_TYPE_NEW}
              checked={selectedOption === SAVE_SELECTION_TYPE_NEW}
              onChange={handleChange}
            />
            Create New Custom Cocktail
          </label>
        </div>
        <div className={"cc-overlay__buttons"}>
          <button className={"cc-product__save-btn"} onClick={saveCocktail}>Save</button>
          <button className={"cc-product__save-btn cc-product__save-btn--secondary"} onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
};
