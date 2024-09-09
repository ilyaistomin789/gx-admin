export interface Order {
  id: string;
  totalPrice: string;
  salePrice: string;
  itemsCount: number;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  userPaymentMethodId: string;
  comment: string;
  addressId: string;
  deliveryMethodId: string;
  promoId: string;
  orderStatusId: string;
}
