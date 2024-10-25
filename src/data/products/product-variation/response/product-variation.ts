import { PaginationResult, ProductVariation } from '@core';
import { DefaultResponse } from '@data/models';
import { ProductVariationBff } from '../bff';

export type ProductVariationResponse = DefaultResponse<ProductVariation>;
export type ProductVariationsResponse = DefaultResponse<ProductVariation[]>;
export type PaginatedProductVariationResponse = DefaultResponse<
  PaginationResult<ProductVariation>
>;
export type ProductVariationBffResponse = DefaultResponse<ProductVariationBff>;
export type ProductVariationsBffResponse = DefaultResponse<
  ProductVariationBff[]
>;
export type PaginatedProductVariationBffResponse = DefaultResponse<
  PaginationResult<ProductVariationBff>
>;
