export interface ProductCategory {
  id: string;
  name: string;
  slug: string;
  description: string;
  status: boolean;
  sizeCategoryId: string;
  parentCategoryId: string;
  createdAt: Date;
  updatedAt: Date;
}
