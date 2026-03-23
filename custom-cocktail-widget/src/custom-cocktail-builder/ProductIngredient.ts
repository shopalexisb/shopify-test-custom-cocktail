export interface ProductIngredient {
  name: string;
  imageUrl: string;
  maxDoses: number;
  letter: string;
  maId: string;
  dosesSelected?: number;
  nutrients: Nutrient[];
}

export interface Nutrient {
  name: string;
  percentage: number;
}
