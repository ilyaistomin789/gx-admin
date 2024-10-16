import { Nullable } from '../../nullable';

export interface Product {
  id: string;
  name: string;
  productCategoryId: string;
  description: Nullable<string>;
  careInstructions: Nullable<string>;
  about: Nullable<string>;
  imageId: Nullable<string>;
  status: boolean;
  createdAt: Date;
  updatedAt: Date;
}
