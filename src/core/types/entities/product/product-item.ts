export interface ProductItem {
  id: string;
  name: string;
  productId: string;
  colorId: string;
  originalPrice: number;
  salePrice: number;
  code: string;
  slug: string;
  sku: string | undefined;
  isCustomizable: boolean;
  status: boolean;
  createdAt: Date;
  updatedAt: Date;
}
