export interface Cart {
  id: string;
  totalPrice: number;
  salePrice: number;
  promoId: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}
