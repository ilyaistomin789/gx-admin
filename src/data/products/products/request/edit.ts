import { Product, ProductCharacteristic } from '../../../../core';

export type EditProductBody = Omit<
  Product,
  'createdAt' | 'updatedAt' | 'id' | 'imageId'
> & {
  imageId: string | null;
  characteristics?: Pick<ProductCharacteristic, 'title' | 'value'>[];
};
