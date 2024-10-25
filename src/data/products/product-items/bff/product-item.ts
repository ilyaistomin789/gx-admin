import {
  Color,
  Price,
  ProductCharacteristic,
  ProductImage,
  ProductItem,
} from '@core';
import { ProductVariationBff } from '@data';

export type ProductItemBff = Omit<
  ProductItem,
  'originalPrice' | 'salePrice'
> & {
  price: Price;
  variations: ProductVariationBff[];
  characteristics: ProductCharacteristic[];
  images: ProductImage[];
  color: Color;
};
