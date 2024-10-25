import { ProductVariation } from '@core';

export type CreateProductVariationBody = Omit<
  ProductVariation,
  'createdAt' | 'updatedAt' | 'id'
>;
