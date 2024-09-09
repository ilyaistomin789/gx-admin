export interface PromoCode {
  id: string;
  promoCode: string;
  expiredAt: Date;
  discount: number;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}
