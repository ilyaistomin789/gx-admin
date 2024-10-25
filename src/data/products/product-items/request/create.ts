import { ProductItem } from '@core';

export type CreateProductItemBody = Omit<
  ProductItem,
  'createdAt' | 'updatedAt' | 'id'
>;
