export interface Product {
  id: string;
  name: string;
  productCategoryId: string;
  description: string | null;
  careInstructions: string | null;
  about: string | null;
  imageId: string;
  status: boolean;
  createdAt: Date;
  updatedAt: Date;
}
