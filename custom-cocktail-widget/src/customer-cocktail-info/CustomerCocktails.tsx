import React from "react";
import { CustomCocktailTemplate } from "../custom-cocktail-builder/CustomCocktailData";

interface ICustomerCocktails {
  savedCocktails?: CustomCocktailTemplate[];
  selectedTemplate: string;
}

export const CustomerCocktails: React.FC<ICustomerCocktails> = ({
                                                                  savedCocktails, selectedTemplate
                                                           }) => {
  const hasSavedCocktails = savedCocktails && savedCocktails.length > 0;
  const selectedCocktail = savedCocktails?.find((c) => c.id === selectedTemplate);

  return (
    <div className="cc-saved-cocktails">
      {selectedTemplate.length > 0 && savedCocktails && (
        <div>Selected Cocktail: {selectedCocktail?.name}</div>
      )}
      <div className="cc-product__pill-container">
        {hasSavedCocktails ? (
          savedCocktails.map((opt) => {
            const isSelected = opt.id === selectedTemplate;

            return (
              <button
                key={opt.id}
                type="button"
                className={`cc-product__pill ${isSelected ? "cc-product__pill--active" : ""}`}
              >
                {opt.name}
              </button>
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
