export interface CustomProduct {
  imageUrl: string;
  title: string;
  description: string;
  options: ProductOption[];
}

export interface ProductOption{
  prompt: string;
  value: string
  sku: string;
}
