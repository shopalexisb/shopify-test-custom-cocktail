import React from "react";

interface IProductOption {
  label: string;
  variantId: number;
}

interface IPillOptions {
  options: IProductOption[];
  selectedOption: number;
  onChange: (variantId: number) => void;
}

export const ProductOptionPills: React.FC<IPillOptions> = ({
                                                             options,
                                                             selectedOption,
                                                             onChange,
                                                           }) => {
  return (
    <div className="cc-product__pill-container">
      {options.map((opt) => {
        const isSelected = opt.variantId === selectedOption;

        return (
          <button
            key={opt.variantId}
            type="button"
            onClick={() => onChange(opt.variantId)}
            className={`cc-product__pill ${isSelected ? "cc-product__pill--active" : ""}`}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
};
