import { Nullable, Product, ProductCharacteristic } from '@core';

export type EditProductBody = Omit<
  Product,
  'createdAt' | 'updatedAt' | 'id' | 'imageId'
> & {
  imageId: Nullable<string>;
  characteristics?: Pick<ProductCharacteristic, 'title' | 'value'>[];
};
