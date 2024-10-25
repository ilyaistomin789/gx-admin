import { ProductItem } from '@core';

export type EditProductItemBody = Omit<
  ProductItem,
  'createdAt' | 'updatedAt' | 'id'
>;
