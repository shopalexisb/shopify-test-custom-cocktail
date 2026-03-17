import React from "react";
import { CustomCocktailTemplate } from "../custom-cocktail-builder/CustomCocktailData";

interface ICustomerCocktails {
  savedCocktails?: CustomCocktailTemplate[];
  selectedTemplate: string;
  onSelect: (templateId: string) => void;
}

export const CustomerCocktails: React.FC<ICustomerCocktails> = ({
                                                                  savedCocktails, selectedTemplate, onSelect
                                                           }) => {

  const hasSavedCocktails = savedCocktails && savedCocktails.length > 0;

  return (
    <div className="cc-saved-cocktails">
      {hasSavedCocktails && (
        <div>Choose a Saved Custom Cocktail:</div>
      )}
      <div className="cc-saved-cocktails__list">
        {hasSavedCocktails ? (
          savedCocktails.map((opt) => {
            const isSelected = opt.id === selectedTemplate;

            return (
              <label
                key={opt.id}
              >
                <input
                  type="radio"
                  name="saved-cocktail-selection"
                  value={opt.id}
                  checked={isSelected}
                  onChange={() => onSelect(opt.id)}
                />
                {opt.name}
              </label>
            );
          })
        ) : (
          <p className="cc-product__empty-state">
            No saved cocktails yet. Start mixing to save your favorites!
          </p>
        )}
      </div>
    </div>

  );
};
