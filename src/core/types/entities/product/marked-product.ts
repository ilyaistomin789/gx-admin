export enum MarkedProductItemType {
  InFavorite = 'InFavorite',
}

export interface MarkedProductItem {
  id: string;
  userId: string;
  productItemId: string;
  type: MarkedProductItemType;
  createdAt: Date;
  updatedAt: Date;
}
