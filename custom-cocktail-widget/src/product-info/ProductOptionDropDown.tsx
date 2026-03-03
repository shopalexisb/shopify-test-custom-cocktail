import React from "react";

interface IProductOption {
  label: string;
  variantId: number;
}

interface IDropDown {
  options: IProductOption[];
  selectedOption: number;
  onChange: (variantId: number) => void;
}

export const ProductOptionDropDown: React.FC<IDropDown> = ({
  options,
  selectedOption, onChange
  }) => {

  return (
    <select
      value={selectedOption}
      onChange={(e) => onChange(Number(e.target.value))}
    >
      {options.map((opt) => (
        <option key={opt.variantId} value={opt.variantId}>
          {opt.label}
        </option>
      ))}
    </select>
  );
};
