import {
  Color,
  Price,
  Product,
  ProductCharacteristic,
  ProductImage,
  ProductItem,
} from '@core';
import { ProductVariationBff } from '@data';

export type ProductItemBff = Omit<
  ProductItem,
  'originalPrice' | 'salePrice' | 'colorId' | 'productId'
> & {
  price: Price;
  variations: ProductVariationBff[];
  characteristics: ProductCharacteristic[];
  images: ProductImage[];
  color: Color;
  product: Product;
};
