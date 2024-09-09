export interface Product {
  id: string;
  name: string;
  productCategoryId: string;
  description: string;
  careInstructions: string;
  about: string;
  imageId: string;
  status: boolean;
  createdAt: Date;
  updatedAt: Date;
}
