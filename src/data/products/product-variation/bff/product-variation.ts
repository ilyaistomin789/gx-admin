import { ProductVariation, SizeOption } from '@core';

export type ProductVariationBff = Omit<ProductVariation, 'sizeOptionId'> & {
  sizeOption: Omit<SizeOption, 'sortOrder'>;
};
