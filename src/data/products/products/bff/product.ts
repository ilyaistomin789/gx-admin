import {
  Image,
  Nullable,
  Product,
  ProductCategory,
  ProductCharacteristic,
} from '../../../../core';

export type ProductBff = Omit<Product, 'imageId' | 'productCategoryId'> & {
  characteristics: ProductCharacteristic[];
  image: Nullable<Image>;
  category: ProductCategory;
};
