export interface CartItem {
  id: string;
  originalPrice: number;
  salePrice: number;
  customDesignConfigId: string;
  productVariationId: string;
  cartId: string;
  productItemId: string;
  createdAt: Date;
  updatedAt: Date;
}
