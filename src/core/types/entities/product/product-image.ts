import { Image } from '../image';

export type ProductImage = Omit<Image, 'id'> & {
  id: string;
  imageId: string;
  productItemId: string;
  createdAt: Date;
  updatedAt: Date;
};
