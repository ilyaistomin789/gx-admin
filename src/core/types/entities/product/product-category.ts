export interface ProductCategory {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  status: boolean;
  sizeCategoryId: string;
  parentCategoryId: string | null;
  createdAt: Date;
  updatedAt: Date;
}
