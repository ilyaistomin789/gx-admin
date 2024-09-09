export interface Placement {
  id: string;
  name: string;
  addressCode: number;
  phones: string[];
  telegram: string | null;
  createdAt: Date;
  updatedAt: Date;
}
