import { ProductVariation } from '@core';

export type EditProductVariationBody = Omit<
  ProductVariation,
  'createdAt' | 'updatedAt' | 'id'
>;
