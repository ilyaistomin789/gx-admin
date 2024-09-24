import { Product } from '../../../../core';

export type CreateProductBody = Omit<Product, 'createdAt' | 'updatedAt' | 'id'>;
