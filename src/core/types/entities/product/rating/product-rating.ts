export interface ProductRating {
  id: string;
  comment: string;
  plus: string;
  minus: string;
  rating: number;
  productId: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}
