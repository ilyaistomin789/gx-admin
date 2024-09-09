export interface Role {
  id: string;
  name: string;
  policyIds: string[];
  createdAt: Date;
  updatedAt: Date;
}
