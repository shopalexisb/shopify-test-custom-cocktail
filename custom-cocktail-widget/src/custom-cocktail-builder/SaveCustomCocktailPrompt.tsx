import React, {useState} from "react";

interface IAddToCart {
  formula?: string;
  templateId?: string;
}

export const SaveCustomCocktailPrompt: React.FC<IAddToCart> = ({
  formula, templateId
}) => {

  async function saveCocktail() {

  }

  function handleCancelButton() {
    console.log("cancel clicked");
  }

  return (
    <div className="cc-overlay-wrapper">
      <div className="cc-overlay-container">
        <h2>Save Custom Cocktail</h2>
        <div>
          <label
            key={templateId}
          >
            <input
              type="radio"
              name="update-cocktail-formula"
              value={templateId}
              checked={true}
            />
            Update Existing Custom Cocktail
          </label>
          <label
            key={0}
          >
            <input
              type="radio"
              name="save-cocktail-formula"
              value={0}
              checked={false}
            />
            Create New Custom Cocktail
          </label>
        </div>
        <button onClick={saveCocktail}>Save</button>
        <button onClick={handleCancelButton}>Cancel</button>
      </div>
    </div>
  );
};
