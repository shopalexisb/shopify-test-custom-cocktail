export type ServingSize = 30 | 90;

export interface CustomPrice {
  regularPrice: string;
  salePrice: string;
  isOnSale: boolean;
  cashback: string;
}

export type PricingMap = Record<ServingSize, CustomPrice>;
